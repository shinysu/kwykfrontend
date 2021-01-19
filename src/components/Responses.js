import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Tabs, Tab, Content } from "../utils/Tab";
import Header from "../headers/KwykHeader";
import '../static/css/header.css';
import '../static/css/stats.css';
import useFetch from "../hooks/useFetch";
import * as constant from '../utils/Constants';
import DisplayAlert from '../utils/DisplayAlert';

function Responses() {
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <Header />
            <ResponsesTab topic={topic} subtopic={subtopic} />
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

function ResponsesTab(props){
  const [active, setActive] = useState(0);
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
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
  const topicUserWords = JSON.parse(sessionStorage.getItem('userResponses'));
  return(
    <div className="tab-color">
      <Tabs tabcolor={constant.adminTabColor}>
        <Tab onClick={handleClick} active={active === 0} id={0} tabcolor={constant.adminTabColor}>
          RESPONSES
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1} tabcolor={constant.adminTabColor}>
          EXPLANATION
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <ShowResponses topic={props.topic} subtopic={props.subtopic} data={data} topicUserWords={topicUserWords}/>
        </Content>
        <Content active={active === 1}>
          <ShowExplanation topic={props.topic} subtopic={props.subtopic} data={data} topicUserWords={topicUserWords}/>
        </Content>
      </>
    </div>
  );
}
export default Responses;

function ShowResponses(props){
  const [selectedValue, setSelectedValue] = useState(convertToCamelCase(props.subtopic));
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const data = props.data;
  const topicWordsResponses = data["topic_answers"];
  const topicWords = topicWordsResponses["topic_words"];
  const topicTopWords = topicWordsResponses["top_words"];
  const topicUserWords = props.topicUserWords;
  topicWords.sort();
  const wordResponses = topicWords.map((word,index)=>{
    if(word in topicUserWords){
      return <DisplayWordResponses word={word} topicTopWords={topicTopWords} topicUserWords={topicUserWords} key={index}/>
    }
  });
  return(
    <div >
      <TopicHeader topics={props.subtopic} getSelectedValue={getSelectedValue} selectedValue={selectedValue}/>
      <div className= "responses-area">
      <ul>
        {wordResponses}
      </ul>
      </div>
      <div className="bottom-area"></div>
    </div>
  );
}

function TopicHeader(props){
  const username = sessionStorage.getItem('username');
  return(
    <div className="row headercontainer grey">
    <div className="col-5 user grey">
    {username}
    </div>
    <div className="col-7 grey">
    <span className="grey topic-label"> Topic:</span>
    <span className="grey topic-label"> {props.selectedValue} </span>
    </div>
    </div>
  );
}

function DisplayWordResponses(props){
  const userWords = props.topicUserWords[props.word];
  const topWords = props.topicTopWords[props.word];
  return(
    <div className="word-response">
    <label className="topicname">{props.word}</label>
    <div className="row padding-right white">
      <div className="col-sm-6 white">
        <label className="titlelabel">Your Responses </label><br />
        <DisplayWord words={userWords} />
      </div>
      <div className="col-sm-6 white padding-right">
        <label className="titlelabel"> Popular Responses </label><br />
        <DisplayWord words={topWords} />
      </div>
    </div>
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

function ShowExplanation(props) {
  const [selectedValue, setSelectedValue] = useState(convertToCamelCase(props.subtopic));
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const data = props.data;
  const topics = data["topics"];
  const topicWordsResponses = data["topic_answers"];
  const topicWords = topicWordsResponses["topic_words"];
  const topicExplanation = topicWordsResponses["explanation"];
  const topicUserWords = props.topicUserWords;
  topicWords.sort();
  const wordExplanations = topicWords.map((word,index)=>{
    if(word in topicUserWords){
      return <DisplayExplanation word={word} topicExplanation={topicExplanation} key={index}/>
    }
  });

  return(
    <div >
      <TopicHeader topics={topics} getSelectedValue={getSelectedValue} selectedValue={selectedValue}/>
      <div className="responses-area">
      <ul>
        {wordExplanations}
      </ul>
      </div>
      <div className="bottom-area"></div>
    </div>
  );
}

function DisplayExplanation(props) {
  const explanations = props.topicExplanation[props.word];
  return(
    <div className="explain-area">
    <label className="topicname">{props.word}</label>
    <div className="row explain-text">
      {explanations}
      </div>
    </div>

  );
}

function convertToCamelCase(name) {
  const words = name.split(" ");
  let convertedName = "";
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    convertedName = convertedName + " " +words[i]
  }
  return convertedName;
}
