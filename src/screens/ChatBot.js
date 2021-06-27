import React, {useState, useEffect, useRef} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Header from "../headers/KwykHeader";
import TimerHeader from "../headers/TimerHeader";
import useTimer from "../hooks/useTimer";
import ideapng from '../static/images/idea.png';
import sendlogo from '../static/images/send.png';
import '../static/css/chat.css';
import * as constant from '../components/Constants'
import usePost from "../hooks/usePost";
import TextareaAutosize from 'react-textarea-autosize';
import DisplayAlert from '../components/DisplayAlert';
import SessionHeader from "../headers/SessionHeader";
import useGetAttempted from "../hooks/useGetAttempted";
import ReactGA from 'react-ga4';

var time;
var currentWord = '';
var is_retry;
var totalCount = 0;

function ChatBot(){
  ReactGA.pageview(window.location.pathname + window.location.search);
  let history = useHistory();
  const location = useLocation();
  if(sessionStorage.getItem('useremail') == null){
    const destinationPath = location.pathname
    history.push({
      pathname:`/`,
      query: {destinationPath}
    });
    return null;
  }
  else{
    return <DisplayTest />
  }
}

export default ChatBot;


function DisplayTest() {
  let chatMessages = '';
  let prevWords = [];
  is_retry = false;
  if(sessionStorage.getItem('retry') === 'true'){
    is_retry = true;
    chatMessages=["retry"];
  }
  else{
    chatMessages=["welcome","first"];
  }
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const topic = sessionStorage.getItem('topic');
  const username = sessionStorage.getItem('username');
  const useremail = sessionStorage.getItem('useremail');
  useGetAttempted(useremail);
  if(sessionStorage.getItem('userResponses')){
    prevWords = JSON.parse(sessionStorage.getItem('userResponses'));
  }
  const attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  const skippedCount = parseInt(sessionStorage.getItem('skipped'));
  totalCount = attemptedCount + skippedCount

  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 non-header">
          <Header topic={topic} username={username}/>
          <ShowTimeHeader/>
          <DisplayChat minutes={minutes}
                     seconds={seconds}
                     chatMessages={chatMessages}
                     prevWords={prevWords}
                     totalCount={totalCount}
                     />
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}


function ShowTimeHeader(){
  const minutes = parseInt(sessionStorage.getItem('minutes'));
  const seconds = parseInt(sessionStorage.getItem('seconds'));
  time=useTimer(minutes, seconds);
  return '';
}


function DisplayChat(props){
  const [chatMessages, setChatMessages] = useState(props.chatMessages);
  const [userInput, setUserInput] = useState("");
  const actions = ["welcome","first","next","skip","skipall","hint","afterinput","retry"];
  function getUserInput(input){
    setUserInput(input);
  }
  function addChat(message){
    if(actions.includes(message)){
      setChatMessages([...chatMessages,message]);
    }
    else{
      setChatMessages([...chatMessages,message,"afterinput"]);
    }
  }
  const chatList = chatMessages.map((message,index) => {
    return <GetChatMessages message={message} key={index}
         prevWords={props.prevWords} userInput={userInput} addChat={addChat}/>
  }
 );
 const messagesEndRef = useRef(null);
 useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  },[chatList]);
 return(
    <div className="chatcolor">
      <div className="chatarea">
      <ul>
        {chatList}
        <li><div className="scroll-div" ref={messagesEndRef} /></li>
      </ul>
      </div>
        <DisplayForm addChat={addChat} getUserInput={getUserInput}/>
    </div>
  );
}


function GetChatMessages(props) {
  const message = props.message;
  if(message ==="welcome"){
    return <ShowWelcomeChat />;
  }else if(message ==="first" || message ==="next" || message ==="skip" || message ==="skipall" ||message ==="retry"){
    return <GetWord addChat={props.addChat} message={message} prevWords={props.prevWords}/>
  }
  else if(message ==="hint"){
    return <ShowHint addChat={props.addChat} />
  }
  else if(message ==="afterinput"){
    return <GetWord addChat={props.addChat} message={props.userInput} prevWords={props.prevWords}/>
  }
  else{
    return <DisplayUserInput input={message}/>
  }
}


function ShowWelcomeChat(props){
  const textArea = document.querySelector('textarea');
  const textRowCount = textArea ? textArea.value.split("\n").length : 0;
  const rows = textRowCount + 3;
  return(
    <li>
      <div className="row bot">
        <TextareaAutosize className="botmessage" rows={rows} value={constant.welcomeMessage} rowsMin={3} disabled/>
      </div>
    </li>
  );
}


function GetWord(props){

  let history = useHistory();
  const url = constant.postURL;
  let text = getCommand(props.message);
  const useremail = sessionStorage.getItem('useremail');
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  const session = sessionStorage.getItem('session');
  const dataText = { "text": text, "username": useremail, "session":session, "referrer":window.location.href};
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null, error: null});

  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const word = fetchResponse.data.text;
  if(word === 'finish_topic'){
    sessionStorage.setItem('minutes', time[0]);
    sessionStorage.setItem('seconds', time[1]);
    history.push({
      pathname:`/user_stats/${topic}/${subtopic}`
    });
  }
  if (word === 'wrong_command'){
    history.push({
      pathname:`/error`
    });
  }
  currentWord = word;
  let prevWords =props.prevWords;
  if(prevWords.includes(word)){
    return <Test word={word} addChat={props.addChat} message={props.message}/>
  }
  else{
    let messageText;
    if (props.message==='first'){
      if (totalCount > 0){
        const wordText = totalCount===1 ? "term" : "terms";
        messageText = "You have already attempted/skipped "+ totalCount +" "+wordText+"\n Your next term is '"+word + "'";
      }
      else{
        messageText = "Your first term is '"+word + "'";
      }
    }
    else{
      messageText = "Your next term is '"+word + "'";
    }
    return (<BotReply message={messageText}  addChat={props.addChat} />);
  }
}

function Test(props) {
  useEffect(()=>{
    if (props.message==='first'){
      props.addChat("first");
    }
    else{
      props.addChat("next");
    }
  },[props.word])
  return <div></div>
}

function ShowHint(props){
  const url = constant.postURL;
  const text = '/explain';
  const useremail = sessionStorage.getItem('useremail');
  const session = sessionStorage.getItem('session');

  const dataText = { "text": text, "username": useremail, "session": session, "referrer":window.location.href}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const hint = fetchResponse.data.text;

  return( <BotReply message={hint} addChat={props.addChat} />);
}

function DisplayForm(props){
  const [userInput, setUserInput] = useState("");
  let attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  let skippedCount = parseInt(sessionStorage.getItem('skipped'));
  const totalWordCount = parseInt(sessionStorage.getItem('totalWordCount'));
  const buttonText = "Skip"
  function handleClick(){
    if(userInput.length > 0){
      props.getUserInput(userInput);
      props.addChat(userInput);
      setUserInput("");
      attemptedCount++;
      sessionStorage.setItem('attempted', attemptedCount);
      /*updateAttemptedCount();
      if(is_retry){
        updateSkippedCount('reduce');
      }*/
    }
  }
  function handleChange(e){
    setUserInput(e.target.value);
  }
  function handleHint(e){
    props.addChat("hint");
  }
  function handleKeyPress(e){
    if(e.charCode === 13){
        e.preventDefault();
        handleClick();
    }
  }
  function handleSkip(e){
      props.addChat("skip")
      skippedCount++;
      sessionStorage.setItem('skipped', skippedCount);
      /*if(!is_retry){
        updateSkippedCount('add');
      }*/
  }
  function handleSkipAll(){
      sessionStorage.setItem('skipall', true);
      props.addChat("skipall")
      //let totalAttempted = attemptedCount + skippedCount
      skippedCount = totalWordCount - attemptedCount
      sessionStorage.setItem('skipped', skippedCount);
      /*skippedCount++;
      sessionStorage.setItem('skipped', skippedCount);
      /*if(!is_retry){
        updateSkippedCount('add');
      }*/
  }
  function handleConfirmation(){
    const confirmBox = window.confirm(
      "Do you want to skip all the terms?"
    )
    if (confirmBox === true) {
      handleSkipAll()
    }
  }

  return(
    <div className="row input-area chatcolor">
      <button className="ideabutton" value="start" onClick={handleHint}>
        <img src={ideapng} className="idealogo" alt="logo" />
      </button>
      <button className="skipbutton" onClick={handleSkip}>{buttonText}</button>
      <button className="skipallbutton" onClick={handleConfirmation}>SkipAll</button>
      <TextareaAutosize className="input-text" value={userInput} onChange={handleChange}
        onKeyPress={handleKeyPress} required/>
      <button className="sendbutton" value="start" onClick={handleClick}>
        <img src={sendlogo} className="idealogo" alt="logo" />
      </button>
    </div>
  );
}

function DisplayUserInput(props){
  return(
    <UserReply message={props.input} />
  )
}

function BotReply(props){
  const textArea = document.querySelector('textarea');
  const textRowCount = textArea ? textArea.value.split("\n").length : 0;
  const rows = textRowCount + 3;
  return(
    <li>
      <div className="row bot">
        <TextareaAutosize className="botmessage" rows={rows} value={props.message}
        rowsMin={3} id="bottext" disabled/>
      </div>
    </li>
 );
}

function  UserReply(props){
  return(
  <li>
    <div className="row bot">
      <TextareaAutosize className="usermessage" value={props.message} rowsMin={3} disabled />
    </div>
  </li>);
}

/*function updateSkippedCount(action) {
  let skippedCount=parseInt(sessionStorage.getItem('skipped'));
  action ==='add' ? skippedCount++ : skippedCount-- ;
  sessionStorage.setItem('skipped', skippedCount);
}

function updateAttemptedCount() {
  let attemptedCount=parseInt(sessionStorage.getItem('attempted'));
  attemptedCount++;
  sessionStorage.setItem('attempted', attemptedCount);
}
*/
function getCommand(message){
  let text;
  switch(message){
    case 'skip':
      text = '/skip';
      break;
    case 'skipall':
      text = '/skipall';
      break;
    case 'first':
    case 'next':
      text = '/new';
      break;
    case 'retry':
      text = '/retry';
      break;
    default:
      text = message;
      break;
  }
  return text;
}
