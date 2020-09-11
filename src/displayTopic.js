import React, {useState} from 'react';
import Header from "./components/kwykHeader";
import { useHistory } from "react-router-dom";
import * as constant from './components/constants'
//import history from './components/history';
import useFetch from "./components/getData";
import './static/css/contents.css';

function DisplayTopic(props){
  console.log("DisplayTopic");
  let history = useHistory();
  if(sessionStorage.getItem('useremail') == null){
    history.push({
      pathname:`/`
    });
    return null;
  }
  else{
    return <TopicSelection />
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
    const username = sessionStorage.getItem('username');
    const message = "Let's pick your topic..."
    return(
      <div className="container">
        <div className="row">
          <div className="col-sm-2"></div>
            <div className="col-sm-8 white">
              <Header />
              <UserHeader />
              <DisplayMessage message={message} username={username}/>
              <DisplayTopics getSelectedTopic={getSelectedTopic} styling={"topics-area"}/>
              <DisplaySubTopics topic={topic} getSelectedSubTopic={getSelectedSubTopic}/>
              <DisplayStartButton topic={topic} subtopic={subtopic}
                    returnTopic={props.getSelectedTopic} returnSubtopic={props.getSelectedSubTopic}/>
            </div>
          <div className="col-sm-2"></div>
        </div>
      </div>

    );
}

export default DisplayTopic;

function DisplayMessage(props){
  return(
    <div className="info-text">
    <br />
      {props.message}
    </div>
  );
}

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
      console.log("topic=",props.topic);
      console.log("subtopic=",props.subtopic);
      props.returnTopic(props.topic);
      props.returnSubtopic(props.subtopic);
      sessionStorage.setItem('attempted', 0);
      sessionStorage.setItem('skipped', 0);
      sessionStorage.setItem('userResponses', JSON.stringify({}));
      history.push({
        pathname:'/test/'+props.topic+'/'+props.subtopic,
        state:{
          topic: props.topic,
          subtopic: props.subtopic
        }
      });
      //history.push('/'+props.topic+'/'+props.subtopic);
  }
  return(
    <div className="white">
      <button className="start-button fixed-bottom" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>Start</button>
    </div>
  );
}

function DisplayTopics(props){
  const url = constant.kwykURL+"get/topics/custom";
  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const topics = fetchResponse.data
  console.log(topics);
  return <ShowTopicsButtons topics={topics} getSelectedTopic={props.getSelectedTopic} styling={props.styling}/>;
}


function DisplaySubTopics(props){
  if(props.topic){
    return(
      <div>
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
  const url = constant.kwykURL+"/get/"+props.topic+"/subtopics";

  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const subtopics = fetchResponse.data
  return <ShowTopicsButtons topics={subtopics} getSelectedTopic={props.getSelectedSubTopic} styling={props.styling}/>;
}


function ShowTopicsButtons(props){

  const [clickedButton, setClickedButton] = useState("");
  const topics = props.topics;
  function getClickedButton(name){
    props.getSelectedTopic(name);
    setClickedButton(name);
  }
  const buttonList = topics.map((topic, index) =>
      <TopicButton name={topic} textColor={topic === clickedButton ? constant.whiteColor : constant.greenColor }
      buttonColor={topic === clickedButton ? constant.greenColor : constant.greyColor} getClickedButton={getClickedButton} key={index}/>
  );
  return (<div className={`${props.styling}`}>{buttonList}</div>);
}


function TopicButton(props){
  function handleClick(e){
    props.getClickedButton(e.target.value);
  }
  return (<button className="rounded-pill topic-btn" value={props.name}
            style={{color: props.textColor, backgroundColor: props.buttonColor}}
            onClick={handleClick}> {props.name}</button>);
}

function UserHeader() {
  const username = sessionStorage.getItem('username');
  return(
    <div className="row timer-row green">
        <div className="col-sm-9 green user">
          {username}
        </div>
    </div>
  );
}
