import React from 'react';
import * as constant from '../components/Constants'
import useFetch from "../hooks/useFetch";
import '../static/css/contents.css';
import DisplayAlert from '../components/DisplayAlert';
import SelectionButtons from '../components/SelectionButtons';

function TopicSelectionScreen(props) {
  return(
    <div>
        <div className="topics-div">
          <DisplayTopics getSelectedTopic={props.getSelectedTopic} styling={"topics-area"}/>
        </div>
        <div className="subtopics-div">
          <DisplaySubTopics topic={props.topic} getSelectedSubTopic={props.getSelectedSubTopic}/>
        </div>
      </div>
  );
}

export default TopicSelectionScreen;

function DisplayMessage(props){
  return(
    <div className="info-text">
    <br />
      {props.message}
    </div>
  );
}

function DisplayTopics(props){
  const url = constant.kwykURL+"get/topics/custom";
  const message = "Please choose a topic ..."
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const topics = fetchResponse.data
  return (
    <div className="subtopics">
    <DisplayMessage message={message}/>
    <SelectionButtons topics={topics} getSelectedTopic={props.getSelectedTopic}
        styling={props.styling}/>
    </div>
  );
}


function DisplaySubTopics(props){
  if(props.topic){
    return(
      <div className="subtopics">
      <DisplayMessage message="Choose your subtopic"/>
      <GetSubTopics getSelectedSubTopic={props.getSelectedSubTopic} topic={props.topic}
                styling={"subtopics-area"}/>
      </div>
    );
  }
  else{
    return(
      <div>
      <DisplayMessage message=""/>
      <div className="subtopics-area"></div>
      </div>
    );
  }
}


function GetSubTopics(props){
  const url = constant.kwykURL+"get/"+props.topic+"/subtopics";

  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error}/>
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const subtopics = fetchResponse.data
  return <SelectionButtons topics={subtopics} getSelectedTopic={props.getSelectedSubTopic} styling={props.styling}/>;
}
