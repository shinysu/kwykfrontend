import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from "./components/kwykHeader";
import TimerHeader from "./components/timerHeader";
import useTimer from "./components/timer";
import knowbotSVG from './static/images/knowbotSVG.svg';
import avatar from './static/images/avatar.png';
import ideapng from './static/images/idea.png';
import sendlogo from './static/images/send.png';
import './static/css/chat.css';
import * as constant from './components/constants'
import usePost from "./components/postData";
//import history from './components/history';
var time;

function ChatBot(props){
  console.log("ChatBot");
  let history = useHistory();
  const topic = history.location.state.topic;
  const subtopic = history.location.state.subtopic;

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  function getTime(minutes,seconds){
    setMinutes(minutes);
    setSeconds(seconds);
  }
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <ShowTimeHeader/>
            <DisplayChat topic={topic} subtopic={subtopic} minutes={minutes} seconds={seconds}/>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default ChatBot;

function ShowTimeHeader(props){
  //time = <Timer getTime={props.getTime}/>
  time=useTimer();
  return (
    <TimerHeader time={time}/>
  );
}

function DisplayChat(props){
  console.log("DisplayChat");
  const [chatMessages, setChatMessages] = useState(["welcome","first"]);
  const [userInput, setUserInput] = useState("");
  const actions = ["welcome","first","next","skip","hint","afterinput"]

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
    //console.log("words=",words);
    console.log("chatMessages=",chatMessages);
    if(message ==="welcome"){
      return <ShowWelcomeChat key={index} />;
    }else if(message ==="first" || message ==="next" || message ==="skip"){
      return <GetWord key={index} addChat={addChat} message={message} topic={props.topic} subtopic={props.subtopic} />
    }
    else if(message ==="hint"){
      return <ShowHint addChat={addChat} key={index}/>
    }
    else if(message ==="afterinput"){
      return <GetWord key={index} addChat={addChat} message={userInput} topic={props.topic} subtopic={props.subtopic} />
    }
    else{
      return <DisplayUserInput key={index} input={message}/>
    }
  }
 );
 return(
    <div>
      <div className="chatarea">
      <ul>
        {chatList}
      </ul>
      </div>
        <DisplayForm addChat={addChat} getUserInput={getUserInput}/>
    </div>
  );
}


function ShowWelcomeChat(props){
  console.log("ShowWelcomeChat");
  return(
    <li>
    <div className="row bot">
        <img src={knowbotSVG} className="knowbot" alt="logo" />
        <textarea className="botmessage" value={constant.welcomeMessage} disabled></textarea>
  </div>
  </li>
);
}


function GetWord(props){
  console.log("GetWord");
  let history = useHistory();
  //const topic = history.location.state.topic;
//  const subtopic = history.location.state.subtopic;
  console.log("topic here=",props.topic);
  console.log("subtopic here=",props.subtopic);
  const url = constant.postURL;
  let text;
  //const text = props.message ==='skip' ? '/skip' : '/new'
  switch(props.message){
    case 'skip':
      text = '/skip'; break;
    case 'first':
    case 'next':
      text = '/new'; break;
    default:
      text = props.message; break;
  }
console.log("text here=",text);
  const fetchResponse = usePost(url, text, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const word = fetchResponse.data
  if(word === 'finish_topic'){
    history.push({
      pathname:`/user_stats/${props.topic}/${props.subtopic}`,
      state:{
        topic: props.topic,
        subtopic: props.subtopic,
        minutes: time[0],
        seconds: time[1]
      }
    });
  }
  const messageNoun = props.message==='first' ? 'first' : 'next';
  const messageText = "Your " + messageNoun + " word is '"+word + "'";
  console.log(word);
  return (<BotReply message={messageText} dsableSkipButton={false} addChat={props.addChat}/>);
}


function ShowHint(props){
  console.log("ShowHint");
  const url = constant.postURL;
  const text = '/explain';
  const fetchResponse = usePost(url, text, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const hint = fetchResponse.data;

  console.log(hint);
  return( <BotReply message={hint} addChat={props.addChat} dsableSkipButton={false}/>
  );
}

function DisplayForm(props){
  console.log("DisplayForm");
  const [userInput, setUserInput] = useState("");
  function handleClick(e){
    if(userInput){
      props.getUserInput(userInput);
      props.addChat(userInput);
      setUserInput("");
    }
  }
  function handleChange(e){
    setUserInput(e.target.value);
  }
  function handleHint(e){
    props.addChat("hint")
  }
  return(
    <div className="row input-area">
      <button className="ideabutton fixed-bottom" value="start" onClick={handleHint}>
        <img src={ideapng} className="idealogo" alt="logo" />
      </button>
      <textarea className="input-text" value={userInput} onChange={handleChange} required></textarea>
      <button className="ideabutton fixed-bottom" value="start" onClick={handleClick}>
        <img src={sendlogo} className="idealogo" alt="logo" />
      </button>
    </div>
  );
}

function DisplayUserInput(props){
  console.log("DisplayUserInput");
  console.log(props.input);

  return(
    <UserReply message={props.input} />
  )
}

function BotReply(props){
  const [buttonText, setButtonText] = useState("Skip");
  function handleClick(e){
    e.target.setAttribute("disabled", "disabled");
    setButtonText("");
    props.addChat("skip")
  }
  return(
    <li>
    <div className="row bot">
        <img src={knowbotSVG} className="knowbot" alt="logo" />
        <textarea className="botmessage" value={props.message} disabled>
        </textarea>
        <button className="skipbutton fixed-bottom" value="start" disabled={props.dsableSkipButton}
          onClick={handleClick}>{buttonText}</button>
    </div></li>
  );
}

function  UserReply(props){
  return(
  <li>
    <div className="row bot">
      <textarea className="usermessage" value={props.message} disabled>
      </textarea>
      <button className="skipbutton fixed-bottom" value="start" >
        <img src={avatar} className="avatar" alt="logo" />
      </button>
    </div>
  </li>);
}
