import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from "./components/kwykHeader";
import TimerHeader from "./components/timerHeader";
import Timer from "./components/timer";
import './static/css/stats.css';
import * as constant from './components/constants'
import usePost from "./components/postData";
import useFetch from "./components/getData"

function UserStats(props){
  console.log("DisplayTopic");
  let history = useHistory();
  if(sessionStorage.getItem('useremail') == null){
    history.push({
      pathname:`/`
    });
    return null;
  }
  else{
    return <StatsPage />
  }
}

function StatsPage(props){
  let history = useHistory()
  const minutes = history.location.state.minutes;
  const seconds = history.location.state.seconds;
  const topic = history.location.state.topic;
  const subtopic = history.location.state.subtopic;
  console.log("UserStats");
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <ShowTimeHeader minutes={minutes} seconds={seconds}/>
            <DisplayStats minutes={minutes} seconds={seconds} topic={topic}
            subtopic={subtopic} />
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
  const useremail = sessionStorage.getItem('useremail');
  const attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  const skippedCount = parseInt(sessionStorage.getItem('skipped'));
  console.log(useremail);
  return(
    <div className="stats-area">
      <DisplayScore minutes={props.minutes} seconds={props.seconds}
      skippedCount={skippedCount} attemptedCount={attemptedCount}/>
      <RetrySkips topic={props.topic} subtopic={props.subtopic} skippedCount={skippedCount}/>
      <ViewResponses topic={props.topic} subtopic={props.subtopic}/>
      <SwitchTopic />
      <FeedBack />
    </div>
  );
}

function RetrySkips(props){
  let history = useHistory();
  if(props.skippedCount == 0){
    function handleClick(){
      console.log("clicked");
      history.push({
        pathname:'/test/'+props.topic+'/'+props.subtopic,
        state:{
          topic: props.topic,
          subtopic: props.subtopic
        }
      });
    }
    return(
      <div className= "button-area">
      <button className="retry-button" value="retry" onClick={handleClick}>Retry Skipped Questions [TBD]</button>
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
    history.push('/topics')
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
    <button className="retry-button" value="retry" onClick={handleClick}>Get Feedback [TBD]</button>
    </div>
  );
}

function DisplayScore(props){
  return(
    <div className= "display-area">
      <br />
      <div className = "row ">
      <div className="col-sm-12 topic-text center">
        You have completed this topic!
      </div>
      </div>
      <div className = "row ">
        <div className="col-sm-6 topic-text right">
          #Attempted:
        </div>
        <div className="col-sm-6 topic-text left">
        {props.attemptedCount}
        </div>
      </div>
      <div className = "row ">
        <div className="col-sm-6 topic-text right">
        #Skipped:
        </div>
        <div className="col-sm-6 topic-text left">
        {props.skippedCount}
        </div>
      </div>
      <div className = "row ">
        <div className="col-sm-6 topic-text right">
        #Time Taken :
        </div>
        <div className="col-sm-6 topic-text left">
          {props.minutes} mins : {props.seconds} secs
        </div>
      </div>
    </div>
  );
}
