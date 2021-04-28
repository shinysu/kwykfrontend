import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import TimerHeader from "../headers/TimerHeader";
import '../static/css/stats.css';
import useFetch from "../hooks/useFetch";
import * as constant from '../components/Constants';
import DisplayAlert from '../components/DisplayAlert';

function UserStats(){
  let history = useHistory();
  const useremail = sessionStorage.getItem('useremail');
  if(useremail == null){
    history.push({
      pathname:`/`
    });
    return null;
  }
  else{
    return <CheckStatsAndDisplay useremail={useremail}/>
  }
}

function CheckStatsAndDisplay(props) {
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  const url = constant.kwykURL+"user_attempts_custom/"+props.useremail+"/"+topic+"/"+subtopic;
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  let history = useHistory();
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data;
  const attemptedWords = data['attempted_words'];
  const attemptedCount = attemptedWords.length;
  const totalWords = data['topic_words'];
  const totalWordCount = totalWords.length;
  const skippedWordCount = totalWordCount - attemptedCount;
  sessionStorage.setItem('userResponses',JSON.stringify(attemptedWords));
  sessionStorage.setItem('skipped', skippedWordCount);
  sessionStorage.setItem('attempted', attemptedCount);
  if(skippedWordCount === 0){
    history.push({
        pathname:`/view_responses/${topic}/${subtopic}`
      });
    return null;
  }
  else if(attemptedCount === 0){
    sessionStorage.setItem('retry', true);
    history.push({
        pathname:`/chat/${topic}/${subtopic}`
      });
    return null;
  }
  else{
    return <StatsPage topic={topic} subtopic={subtopic}/>
  }
}

function StatsPage(props){
  const minutes = parseInt(sessionStorage.getItem('minutes'));
  const seconds = parseInt(sessionStorage.getItem('seconds'));
  const username = sessionStorage.getItem('username');
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 chatcolor">
            <Header username={username} />
            <ShowTimeHeader minutes={minutes} seconds={seconds}/>
            <DisplayStats minutes={minutes} seconds={seconds} topic={props.topic}
            subtopic={props.subtopic} />
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}

export default UserStats;

function ShowTimeHeader(props){
  return '';
}

function DisplayStats(props){
  const attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  const skippedCount = parseInt(sessionStorage.getItem('skipped'));
  return(
    <div className="stats-area">
      <DisplayScore minutes={props.minutes} seconds={props.seconds}
      skippedCount={skippedCount} attemptedCount={attemptedCount}/>
      <RetrySkips topic={props.topic} subtopic={props.subtopic} skippedCount={skippedCount}/>
      <ViewResponses topic={props.topic} subtopic={props.subtopic}/>
    </div>
  );
}

function RetrySkips(props){
  let history = useHistory();
  if(props.skippedCount !== 0){
    function handleClick(){
      sessionStorage.setItem('retry', true);
      history.push({
        pathname:'/chat/'+props.topic+'/'+props.subtopic
      });
    }
    return(
      <div className= "button-area">
      <button className="retry-button" value="retry" onClick={handleClick}>Retry Skipped Questions </button>
      </div>
    );
  }
  else{
    return(
      <div></div>
    );
  }
}

function ViewResponses(props){
  let history = useHistory();
  function handleClick(){
    history.push({
    pathname:`/view_responses/${props.topic}/${props.subtopic}`
    });
  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="response" onClick={handleClick}>See Responses & Explanation</button>
    </div>
  );
}

/*function SwitchTopic(){
  let history = useHistory();
  function handleClick(){
    history.push('/topics')
  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="retry" onClick={handleClick}>Switch Topic</button>
    </div>
  );
}
*/
function FeedBack(){
  let history = useHistory();
  function handleClick(){
      history.push('/feedback')

  }
  return(
    <div className= "button-area">
      <button className="retry-button" value="retry" onClick={handleClick}>Feedback</button>
    </div>
  );
}

function DisplayScore(props){
  return(
    <div className= "display-area">
      <br />
      <div className = "row">
        <div className="col-12 topic-text center">
        You have completed this topic!
        </div>
      </div>
      <div className = "row">
        <div className="col-2 darkgrey"></div>
        <div className="col-4 stat-text left">
        #Attempted
        </div>
        <div className="col-6 topic-text left">
        : {props.attemptedCount}
        </div>
      </div>
      <div className = "row ">
        <div className="col-2 darkgrey"></div>
        <div className="col-4 stat-text left">
        #Skipped
        </div>
        <div className="col-6 topic-text left">
        : {props.skippedCount}
        </div>
      </div>
      <div className = "row ">
        <div className="col-2 darkgrey"></div>
        <div className="col-4 stat-text left">
        #Time Taken
        </div>
        <div className="col-6 topic-text left">
          : {props.minutes} mins : {props.seconds} secs
        </div>
      </div>
    </div>
  );
}
