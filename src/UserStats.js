import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from "./components/kwykHeader";
import TimerHeader from "./components/timerHeader";
import Timer from "./components/timer";
import knowbotSVG from './static/images/knowbotSVG.svg';
import './static/css/chat.css';
import './static/css/stats.css';
import * as constant from './components/constants'
import usePost from "./components/postData";
//import history from './components/history';


function UserStats(props){
  let history = useHistory()
  const minutes = history.location.state.minutes;
  const seconds = history.location.state.seconds;
  const topic = "python";
  const subtopic = "flask";
//  const topic = history.location.state.topic;
//  const subtopic = history.location.state.subtopic;
  console.log("UserStats");
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <ShowTimeHeader minutes={minutes} seconds={seconds}/>
            <DisplayStats minutes={minutes} seconds={seconds} topic={topic} subtopic={subtopic}/>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default UserStats;

function ShowTimeHeader(props){
  return (
    <TimerHeader time={[props.minutes,props.seconds]} />
  );
}

function DisplayStats(props){
  return(
    <div className="stats-area">
      <DisplayScore minutes={props.minutes} seconds={props.seconds} />
      <RetrySkips />
      <ViewResponses topic={props.topic} subtopic={props.subtopic}/>
      <SwitchTopic />
      <FeedBack />
    </div>
  );
}

function RetrySkips(){
  function handleClick(){

  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="retry" onClick={handleClick}>Retry Skipped Questions</button>
    </div>
  );
}

function ViewResponses(props){
  let history = useHistory();
  function handleClick(){
    history.push({
    pathname:`/view_responses/${props.topic}/${props.subtopic}`,
    //pathname:`/view_responses/python/flask`,
      state:{
        topic: props.topic,
        subtopic: props.subtopic,
        }
    });
  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="response" onClick={handleClick}>See Responses & Explanation</button>
    </div>
  );
}

function SwitchTopic(){
  let history = useHistory();
  function handleClick(){
    history.push('/')
  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="retry" onClick={handleClick}>Switch Topic</button>
    </div>
  );
}

function FeedBack(){
  function handleClick(){

  }
  return(
    <div className= "button-area">
    <button className="retry-button" value="retry" onClick={handleClick}>Get Feedback</button>
    </div>
  );
}

function DisplayScore(props){
  const url = constant.postURL;
  const text = '/score';
  const fetchResponse = usePost(url, text, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const counts = JSON.parse(fetchResponse.data)
  return(
    <div className= "display-area">
      <br />
      <div className = "row text center">
        You have completed this topic!
      </div>
      <div className = "row ">
        <div className="col-sm-6 text right">
          #Attempted: {counts[0]}
        </div>
        <div className="col-sm-6 text left">
        {props.attempted}
        </div>
      </div>
      <div className = "row ">
        <div className="col-sm-6 text right">
        #Skipped: {counts[1]}
        </div>
        <div className="col-sm-6 text left">
        {props.skipped}
        </div>
      </div>
      <div className = "row ">
        <div className="col-sm-6 text right">
        #Time Taken :
        </div>
        <div className="col-sm-6 text left">
          {props.minutes} mins : {props.seconds} secs
        </div>
      </div>
    </div>
  );
}
