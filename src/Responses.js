import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "./components/tab";
import Header from "./components/kwykHeader";
import './static/css/header.css';
import './static/css/stats.css';
import { useHistory } from "react-router-dom";
import useFetch from "./components/getData";
import * as constant from './components/constants'

function Responses() {
  let history = useHistory();
  const topic = history.location.state.topic;
  const subtopic = history.location.state.subtopic;
  console.log("subtopic here=",subtopic);

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
  const url = constant.kwykURL+"user_stats_custom/"+constant.username;
  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data

  return(
    <div className="tab-color">
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          RESPONSES
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          EXPLANATION
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <ShowResponses subtopic={props.subtopic} data={data}/>
        </Content>
        <Content active={active === 1}>
          <ShowExplanation subtopic={props.subtopic} data={data} />
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
  const topics = data["topics"];
  const topicWordsResponses = data["topic_answers"];
  const words = topicWordsResponses[selectedValue];

  console.log(data["topics"]);
  console.log(words);
  const topicWords = words["topic_words"];
  const topicTopWords = words["top_words"];
  const topicUserWords = words["user_data"];
  const wordResponses = topicWords.map((word,index)=>{
    return <DisplayWordResponses word={word} topicTopWords={topicTopWords} topicUserWords={topicUserWords} key={index}/>
  });
  return(
    <div >
      <TopicHeader topics={topics} getSelectedValue={getSelectedValue} selectedValue={selectedValue}/>
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
  return(
    <div className="row green">
    <label className="green topic-label"> TOPIC: </label>
    <select className="topic-select" onChange={handleChange} value={selectedValue}>
    {options.map((option,index) => <option key={index}> {option} </option>)}
    </select>
    </div>
  );
}

function DisplayWordResponses(props){
  const userWords = props.topicUserWords[props.word];
  const topWords = props.topicTopWords[props.word];
  return(
    <div className="word-response">
    <label className="topic-name">{props.word}</label>
    <div className="row padding-right lightgreen">
      <div className="col-sm-6 white">
        <label className="title-label">Your Responses </label><br />
        <DisplayWord words={userWords} />
      </div>
      <div className="col-sm-6 white padding-right">
        <label className="title-label"> Top 5 Responses </label><br />
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
        <div className="white">{words.map((word,index) => <div className="white">
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
  const words = topicWordsResponses[selectedValue];

  console.log(data["topics"]);
  console.log(words);
  const topicWords = words["topic_words"];
  const topicExplanation = words["explanation"];
  const wordExplanations = topicWords.map((word,index)=>{
    return <DisplayExplanation word={word} topicExplanation={topicExplanation} key={index}/>
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
    <label className="topic-name">{props.word}</label>
    <div className="row explain-text">
      {explanations}
      </div>
    </div>

  );
}
