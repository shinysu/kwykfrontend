import React, {useState} from 'react';
import Header from "../headers/KwykHeader";
import UserHeader from "../headers/UserHeader";
import { useHistory, useLocation } from "react-router-dom";
import '../static/css/contents.css';
import TopicSelectionScreen from "./TopicSelectionScreen";

function DisplayTopic(props){
  let history = useHistory();
  const location = useLocation();
  if(sessionStorage.getItem('useremail') == null){
    const destinationPath = location.pathname
    history.push({
      pathname:`/`,
      query: {destinationPath}
    });
    return null;
  }
  else{
    const getSelectedTopic = props.getSelectedTopic;
    const getSelectedSubTopic = props.getSelectedSubTopic;
    return <TopicSelection getSelectedTopic={getSelectedTopic} getSelectedSubTopic={getSelectedSubTopic}/>
  }
}

function TopicSelection(props){
    const [topic,setTopic] = useState("");
    const [subtopic,setSubTopic] = useState("");
    function getSelectedTopic(data){
      setTopic(data);
    }
    function getSelectedSubTopic(data){
      setSubTopic(data);
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col-lg-2"></div>
            <div className="col-lg-8 non-header">
              <Header />
              <UserHeader />
              <TopicSelectionScreen
                  getSelectedTopic={getSelectedTopic}
                  topic={topic}
                  getSelectedSubTopic={getSelectedSubTopic}
                  />
              <DisplayStartButton topic={topic} subtopic={subtopic}
                        returnTopic={getSelectedTopic} returnSubtopic={getSelectedSubTopic}/>
            </div>
          <div className="col-lg-2"></div>
        </div>
      </div>

    );
}

export default DisplayTopic;

function DisplayStartButton(props){
  let history = useHistory();
  let buttonDisplay;
  //const [buttonDisplay, setButtonDisplay] = useState("none");
  if(props.subtopic){
    buttonDisplay ="block";
  }
  else{
    buttonDisplay ="none";
  }
  function handleClick(e){
      props.returnTopic(props.topic);
      props.returnSubtopic(props.subtopic);
      initializeSessionStorage(props.topic, props.subtopic)
      history.push({
        pathname:'/chat/'+props.topic+'/'+props.subtopic,
      });
      //history.push('/'+props.topic+'/'+props.subtopic);
  }
  return(
    <button className="start-button fixed-bottom" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>Start</button>

  );
}

function initializeSessionStorage(topic, subtopic) {
  sessionStorage.setItem('topic', topic);
  sessionStorage.setItem('subtopic', subtopic);
  sessionStorage.setItem('attempted', 0);
  sessionStorage.setItem('skipped', 0);
  sessionStorage.setItem('minutes', 0);
  sessionStorage.setItem('seconds', 0);
  sessionStorage.setItem('userResponses', JSON.stringify({}));
  sessionStorage.setItem('retry', false);
}
