import React, {useState, useRef} from 'react';
import * as constant from '../components/Constants'
import useFetch from "../hooks/useFetch";
import '../static/css/contents.css';
import DisplayAlert from '../components/DisplayAlert';
import { useHistory } from "react-router-dom";
import SelectionButtons from '../components/SelectionButtons';
import Header from "../headers/KwykHeader";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactGA from 'react-ga4';

/*function SessionSelectionScreen() {
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
              styling={"sessions-area"}/>
          </div>
        </div>
      </div>
    </div>
  );
}*/



function DisplaySessions(props){
  ReactGA.pageview(window.location.pathname + window.location.search);
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
  if(props.subtopic){
    return (
      <div className="subtopics">
        <DisplayMessage message={message}/>
        <SelectionButtons topics={sessions} getSelectedTopic={getSelectedSession}
          styling={props.styling}/>
        <ShowTestLink topic={props.topic} subtopic={props.subtopic}
          session={getSessionSlug(sessions_details,session)}/>
        <DisplayButton topic={constant.pySkillsTopic} subtopic={props.subtopic}
          sessionname={session} sessionslug={getSessionSlug(sessions_details,session)}/>
      </div>
    );
  }
  else{
    return(
      <div className="subtopics">
        <DisplayMessage message=""/>
      </div>
    );
  }

}

export default DisplaySessions;

function DisplayMessage(props){
  return(
    <div className="info-text">
    <br />
      {props.message}
    </div>
  );
}


function ShowTestLink(props) {
  const [copySuccess, setCopySuccess] = useState('');
  const textRef = useRef(null);
  const basename = window.location.origin;
  console.log(basename);
  let url = '';
  if(props.session){
    url  = basename.split('#')[0]+'?session='+props.session+'/#/'+constant.pySkillsTopic+'/'+props.subtopic;
  }
  else{
    url  = basename +'/#/'+constant.pySkillsTopic+'/'+props.subtopic;
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

function DisplayButton(props){
  let history = useHistory();
  let buttonDisplay;
  if(props.subtopic){
    buttonDisplay ="block";
  }
  else{
    buttonDisplay ="none";
  }
  function handleClick(e){
    let pathname = '';
    if (props.sessionslug !== ''){
      pathname='/analytics/'+props.subtopic+'/'+props.sessionslug
    }
    else{
      pathname='/analytics/'+props.subtopic
    }
    history.push({
      pathname:pathname
    });

      //history.push('/'+props.topic+'/'+props.subtopic);
  }
  return(
    <div className='session-btn-div'>
      <button className="stats-button" value="start"
        onClick={handleClick} style={{display: buttonDisplay}}>View Statistics</button>
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
