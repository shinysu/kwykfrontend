import React, {useState, useRef} from 'react';
import * as constant from '../utils/Constants'
import useFetch from "../hooks/useFetch";
import '../static/css/contents.css';
import DisplayAlert from '../utils/DisplayAlert';
import { useHistory } from "react-router-dom";
import SelectionButtons from '../utils/SelectionButtons';
import Header from "../headers/KwykHeader";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function SessionSelectionScreen(props) {
  const urlSplit = window.location.href.split("/")
  const topic = urlSplit[urlSplit.length-2]
  const subtopic = urlSplit[urlSplit.length-1]

  return(
    <div className="container">
      <div className="row">
        <Header/>
        <div className="sessions">
          <div className="row topics-div">
            <DisplaySessions topic={topic} subtopic={subtopic}
            getSelectedSession={props.getSelectedSession} styling={"sessions-area"}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionSelectionScreen;

function DisplaySessions(props){
  const [session,setSession] = useState("");
  function getSelectedSession(data){
    setSession(data);
  }
  const url = constant.kwykURL+"get/sessions/custom";
  const message = "Please choose your session ..."
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const sessions_details = fetchResponse.data
  var sessions = []
  for(var k in sessions_details){
    sessions.push(sessions_details[k]['session_name']);
  }
  return (
    <div className="subtopics">
     <div className="admin-session">
      <DisplayMessage message={message}/>
      <SelectionButtons topics={sessions} getSelectedTopic={getSelectedSession}
        styling={props.styling}/>
      <ShowTestLink topic={props.topic} subtopic={props.subtopic}  session={getSessionSlug(sessions_details,session)}/>
      </div>
      <DisplayButton topic={props.topic} subtopic={props.subtopic} sessionname={session}
          sessionslug={getSessionSlug(sessions_details,session)}
          />
    </div>
  );
}

function DisplayMessage(props){
  return(
    <div className="info-text">
    <br />
      {props.message}
    </div>
  );
}

function DisplayButton(props){
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
    let pathname = '';
    if (props.sessionslug !== ''){
      pathname='/insights/'+props.topic+'/'+props.subtopic+'/'+props.sessionslug
    }
    else{
      pathname='/insights/'+props.topic+'/'+props.subtopic
    }
    history.push({
      pathname:pathname
    });

      //history.push('/'+props.topic+'/'+props.subtopic);
  }
  return(
    <button className="stats-button" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>View Statistics</button>
  );
}


function ShowTestLink(props) {
  const [copySuccess, setCopySuccess] = useState('');
  const textRef = useRef(null);
  const basename = window.location.href.split("admin")[0];
  let url = '';
  if(props.session){
    url  = basename.split('#')[0]+'?session='+props.session+"/#"+'/chat/'+props.topic+'/'+props.subtopic
  }
  else{
    url  = basename+'chat/'+props.topic+'/'+props.subtopic
  }

  function handleClick(e) {
    setCopySuccess('Copied!');
  };

  return(
    <div className="row testlink">
      <div className = "col-2 testlink">
      <label className="linklabel"> Test Link:  </label>
      </div>
      <div className = "col-10 testlink">
      <input type="text" ref={textRef} name="email" className="linktext" value={url} placeholder={url}
       disabled="disabled" id="link"/>
       <CopyToClipboard text={url}>
           <button className="linkbutton" onClick={handleClick}>Copy</button>
       </CopyToClipboard>
       <span className="copytext">{copySuccess}</span>
      </div>
    </div>
  );
}

function getSessionSlug(sessions_details,session) {
  for(var k in sessions_details){
    if (sessions_details[k]['session_name'] === session){
      return sessions_details[k]['session_slug'];
    }
  }
  return "";
}
