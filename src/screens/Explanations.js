import React, { useState } from "react";
import TopicHeader from "../headers/TopicHeader";
import { Editor } from '@tinymce/tinymce-react';
import * as constant from '../components/Constants';
import useFetch from "../hooks/useFetch";
import DisplayAlert from '../components/DisplayAlert';
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import ReactGA from 'react-ga4';

function Explanation() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  let history = useHistory();
  if(sessionStorage.getItem('topic') == null){
    history.push({
      pathname:`/404`
    });
    return null;
  }
  else {
    return <ShowExplanationPage />
  }
}

export default Explanation;

function ShowExplanationPage() {
  const topic = sessionStorage.getItem('topic');
  const subtopic = sessionStorage.getItem('subtopic');
  const username = sessionStorage.getItem('username');
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
            <Header username={username}/>
            <ShowExplanation topic={topic} subtopic={subtopic}/>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

function ShowExplanation(props) {
  /*const data = props.data;
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
*/
  const url = constant.kwykURL+"explaination_custom"+"/"+props.topic+"/"+props.subtopic+"/";
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data
  return(
    <div >
      <TopicHeader topic={props.topic} subtopic={props.subtopic}/>
      <div className="explanation-area">
      <Editor
       initialValue={data}
       apiKey= {constant.TINYMCE_APIKEY}
       disabled={true}
       init={{
         plugins: ['noneditable','autoresize'],
         toolbar: false,
         menubar: false,
         inline: true,
         content_style: 'p { background-color: #ffffff; padding-left: 3px}' + 'ol { background-color: #ffffff; padding:3px; }'+
         'ul { background-color: #ffffff; padding:3px; }'+'.mce-content-body { background-color: #ffffff }'
      }} />
      </div>

    </div>
  );
}


function DisplayExplanation(props) {
  const explanations = props.topicExplanation[props.word];
  return(
    <div className="explain-area">
      <label className="topicname">
        {props.word}
      </label>
      <div className="row explain-text">
        {explanations}
      </div>
    </div>

  );
}
