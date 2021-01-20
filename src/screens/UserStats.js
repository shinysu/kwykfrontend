import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import TimerHeader from "../headers/TimerHeader";
import '../static/css/stats.css';

function UserStats(){
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

function StatsPage(){
  const minutes = parseInt(sessionStorage.getItem('minutes'));
  const seconds = parseInt(sessionStorage.getItem('seconds'));
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 chatcolor">
            <Header />
            <ShowTimeHeader minutes={minutes} seconds={seconds}/>
            <DisplayStats minutes={minutes} seconds={seconds} topic={topic}
            subtopic={subtopic} />
        </div>
        <div className="col-lg-2"></div>
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
  const attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  const skippedCount = parseInt(sessionStorage.getItem('skipped'));
  return(
    <div className="stats-area">
      <DisplayScore minutes={props.minutes} seconds={props.seconds}
      skippedCount={skippedCount} attemptedCount={attemptedCount}/>
      <RetrySkips topic={props.topic} subtopic={props.subtopic} skippedCount={skippedCount}/>
      <ViewResponses topic={props.topic} subtopic={props.subtopic}/>
      <FeedBack />
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
