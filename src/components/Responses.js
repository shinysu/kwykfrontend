import React, { useState } from "react";
import { Tabs, Tab, Content } from "../utils/Tab";
import Header from "../headers/KwykHeader";
import '../static/css/header.css';
import '../static/css/stats.css';
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import * as constant from '../utils/Constants'

function Responses() {
  let history = useHistory();
  const topic = history.location.state.topic;
  const subtopic = history.location.state.subtopic;

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 lightgreen">
            <Header />
            <ResponsesTab topic={topic} subtopic={subtopic} />
        </div>
        <div className="col-sm-2"></div>
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
  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
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
  const [selectedValue, setSelectedValue] = useState(props.subtopic);
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const data = props.data;
  const topicWordsResponses = data["topic_answers"];
  const words = topicWordsResponses;
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
      <div className="responses-area">
      <ul>
        {wordResponses}
      </ul>
      </div>
      <div className="bottom-area"></div>
    </div>
  );
}

function TopicHeader(props){
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const options = props.topics
  function handleChange(e){
    setSelectedValue(e.target.value);
    props.getSelectedValue(e.target.value);
  }
  const username = sessionStorage.getItem('username');
  return(
    <div className="row green">
    <div className="col-sm-5 user green">
    {username}
    </div>
    <div className="col-sm-7 green">
    <label className="green topic-label"> TOPIC: </label>
    <select className="topic-select" onChange={handleChange} value={selectedValue}>
    <option > {props.selectedValue} </option>)}
    </select>
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
    <div className="row padding-right lightgreen">
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
  const [selectedValue, setSelectedValue] = useState(props.subtopic);
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
