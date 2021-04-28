import React from 'react';
import * as constant from '../components/Constants'
import useFetch from "../hooks/useFetch";
import '../static/css/contents.css';
import DisplayAlert from '../components/DisplayAlert';
import SelectionButtons from '../components/SelectionButtons';
import DisplaySessions from "./SessionSelectionScreen";

function TopicSelectionScreen(props) {
  return(
    <div>
        <div className="topics-div">
          <DisplaySubTopics getSelectedSubTopic={props.getSelectedSubTopic}
            styling={"topics-area"}
          />
        </div>
        <div className="subtopics-div">
          <DisplaySessions subtopic={props.subtopic}
          styling={"subtopics-area"}/>
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

function DisplaySubTopics(props){
  return(
      <div className="subtopics">
      <DisplayMessage message="Please choose a topic ..."/>
      <GetSubTopics getSelectedSubTopic={props.getSelectedSubTopic}
                styling={props.styling}/>
      </div>
  );
}

function GetSubTopics(props){
  const url = constant.kwykURL+"get/"+constant.pySkillsTopic+"/subtopics";

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

/*function DisplayTopics(props){
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
*/

/*function DisplaySubTopics(props){
  //if(props.topic){
    return(
      <div className="subtopics">
      <DisplayMessage message="Please choose a topic ..."/>
      <GetSubTopics getSelectedSubTopic={props.getSelectedSubTopic}
                styling={props.styling}/>
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
}*/
