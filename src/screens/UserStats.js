import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import TimerHeader from "../headers/TimerHeader";
import '../static/css/stats.css';
import * as constant from '../components/Constants';
import DisplayAlert from '../components/DisplayAlert';
import useGetAttempted from "../hooks/useGetAttempted";
import useFetch from "../hooks/useFetch";
import ReactGA from 'react-ga4';

function UserStats(){
  ReactGA.pageview(window.location.pathname + window.location.search);
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
  const useremail = sessionStorage.getItem('useremail');
  useGetAttempted(useremail);
  const attemptedCount = parseInt(sessionStorage.getItem('attempted'));
  const skippedWordCount = parseInt(sessionStorage.getItem('skipped'));
  const totalWordCount = parseInt(sessionStorage.getItem('totalWordCount'));
  let history = useHistory();
  /*if(skippedWordCount === 0){
    history.push({
        pathname:`/view_responses/${topic}/${subtopic}`
      });
    return null;
  }
  else */
  //if(attemptedCount === 0 && (sessionStorage.getItem('skipall') === 'false')){
  if(attemptedCount === 0 && (skippedWordCount !== totalWordCount)){
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
  const useremail = sessionStorage.getItem('useremail');
  const url = constant.kwykURL+"user_stats_custom/"+useremail+"/"+props.topic+"/"+props.subtopic;
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
      return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
      return 'Loading...';
  }
  const data = fetchResponse.data

  return(
    <div className="stats-area">
      <DisplayScore minutes={props.minutes} seconds={props.seconds}
      skippedCount={skippedCount} attemptedCount={attemptedCount}/>
      <RetrySkips topic={props.topic} subtopic={props.subtopic} skippedCount={skippedCount}/>
      <ViewResponses topic={props.topic} subtopic={props.subtopic} data={data} attemptedCount={attemptedCount}/>
      <ViewExplanation topic={props.topic} subtopic={props.subtopic} skippedCount={skippedCount} attemptedCount={attemptedCount}/>
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
    sessionStorage.setItem('responsesData', JSON.stringify(props.data))

    let history = useHistory();
    if(props.attemptedCount > 0){
      function handleClick(){
        history.push({
        pathname:`/view_responses/${props.topic}/${props.subtopic}`
        });
      }
    return(
      <div className= "button-area">
      <button className="retry-button" value="response" onClick={handleClick}>See Popular Responses</button>
      </div>
    );
  }
  else{
    return(
      <div></div>
    );
  }
}

function ViewExplanation(props){
    let history = useHistory();
    function handleClick(){
        history.push({
        pathname:`/explanation/${props.topic}/${props.subtopic}`
        });
      }
    return(
      <div className= "button-area">
      <button className="retry-button" value="response" onClick={handleClick}>See Explanation</button>
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
