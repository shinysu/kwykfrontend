import React, {useState} from 'react';
import Header from "../headers/KwykHeader";
import '../static/css/contents.css';
import TopicSelectionScreen from "./TopicSelectionScreen";
import { useHistory, useLocation } from "react-router-dom";
import AdminAccessDenied from '../components/AdminAccessDenied';
import * as constant from '../components/Constants';
import ReactGA from 'react-ga4';

function AdminScreen() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  let history = useHistory();
  const location = useLocation();

  if((sessionStorage.getItem('useremail') != null) && (sessionStorage.getItem('is_admin') === 'true')){
        return <TopicSelection />
  }
  else{
    if(sessionStorage.getItem('is_admin') === 'false'){
      return <AdminAccessDenied />
    }
    const destinationPath = location.pathname
    history.push({
        pathname:`/`,
        query: {destinationPath}
      });
    return null;
  }
}
export default AdminScreen;

function TopicSelection(){
    const [session,setSession] = useState("");
    const [subtopic,setSubTopic] = useState("");

    function getSelectedSubTopic(data){
      setSubTopic(data);
    }
    function getSelectedSession(data){
      setSession(data);
    }
    return(
      <div className="container">
        <div className="row">
          <Header/>
          <div className="topics-subtopics">
            <TopicSelectionScreen
              getSelectedSession={getSelectedSession}
              topic={constant.pySkillsTopic}
              subtopic={subtopic}
              getSelectedSubTopic={getSelectedSubTopic}
              />

          </div>
        </div>
      </div>
    );
}

/*function DisplayButton(props){
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
      history.push({
        pathname:'/admin/'+props.topic+'/'+props.subtopic
      });
  }
  return(
    <button className="next-button" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>Next >> </button>
  );
}*/
