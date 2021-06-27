import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Tabs, Tab, Content } from "../components/Tab";
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/header.css';
import '../static/css/stats.css';
import useFetch from "../hooks/useFetch";
import * as constant from '../components/Constants';
import DisplayAlert from '../components/DisplayAlert';
import ShowWordCloud from '../components/WordCloud'
import * as utils from '../utils/jsutils';
import TopicHeader from "../headers/TopicHeader";
import useGetAttempted from "../hooks/useGetAttempted";
import Collapse from 'react-bootstrap/Collapse';
import ReactGA from 'react-ga4';

function Responses() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  let history = useHistory();
  if(sessionStorage.getItem('topic') == null){
    history.push({
      pathname:`/404`
    });
    return null;
  }
  else {
    return <ShowResponsePage />
  }
}

function ShowResponsePage() {
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  const username = sessionStorage.getItem('username');
  const useremail = sessionStorage.getItem('useremail');
  useGetAttempted(useremail);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <Header username={username}/>
            <ShowResponses topic={topic} subtopic={subtopic}/>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

/*function ResponsesTab(props){
  const [active, setActive] = useState(0);
  let history = useHistory();
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if(index === 0){
      window.location.reload()
    }
    if (index !== active) {
      setActive(index);
    }
  };
  return(
    <div className="tab-color">
      <Tabs tabcolor={constant.adminTabColor}>
        <Tab onClick={handleClick} active={active === 0} id={0} tabcolor={constant.adminTabColor}>
          Popular Responses
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1} tabcolor={constant.adminTabColor}>
          Explanation
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <ShowResponses topic={props.topic} subtopic={props.subtopic}/>
        </Content>
        <Content active={active === 1}>
          <ShowExplanation topic={props.topic} subtopic={props.subtopic}/>
        </Content>
      </>
    </div>
  );
}*/
export default Responses;

function ShowResponses(props){
  const data = JSON.parse(sessionStorage.getItem('responsesData'));
  const topicUserWords = JSON.parse(sessionStorage.getItem('userResponses'));
  const topicWordsResponses = data["topic_answers"];
  const topicWords = topicWordsResponses["topic_words"];
  const topicTopWords = topicWordsResponses["top_words"];
  topicWords.sort();
  const wordResponses = topicWords.map((word,index)=>{
    if(topicUserWords.includes(word)){
      return <DisplayWordResponses word={word} topicTopWords={topicTopWords} topicUserWords={topicUserWords} key={index}/>
    }
  });
  return(
    <div >
      <TopicHeader topic={props.topic} subtopic={props.subtopic}/>
      <div className= "responses-area">
      <ul className="chatcolor">
        {wordResponses}
      </ul>
      </div>
      <div className="bottom-area"></div>
    </div>
  );
}


function DisplayWordResponses(props){
  const userWords = props.topicUserWords[props.word];
  const topWords = props.topicTopWords[props.word];
  const size = topWords.length > 20 ? 20 : topWords.length

  return(
    <div className="word-response">
    <label className="topicname">{props.word}</label>
    <ShowWordCloud data={topWords.slice(0, size)} />
    </div>
  );
}

function DisplayWord(props){
  let words = ""
  if(props.words){
    words = props.words.split(',');
  }
  return(
    <div>
    {words ?
        <div className="white">{words.map((word,index) => <div className="white" key={index}>
            <label className="word">{word}</label>
        </div>)}</div>
        : null}
    </div>
  );
}
