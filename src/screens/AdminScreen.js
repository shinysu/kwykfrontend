import React, {useState} from 'react';
import Header from "../headers/KwykHeader";
import '../static/css/contents.css';
import TopicSelectionScreen from "./TopicSelectionScreen";
import { useHistory, useLocation } from "react-router-dom";
import AdminAccessDenied from '../components/AdminAccessDenied';

function AdminScreen() {
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
          <Header/>
          <TopicSelectionScreen
              getSelectedTopic={getSelectedTopic}
              topic={topic}
              getSelectedSubTopic={getSelectedSubTopic}
              />
          <DisplayButton topic={topic} subtopic={subtopic}/>
        </div>
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
      history.push({
        pathname:'/admin/'+props.topic+'/'+props.subtopic
      });
  }
  return(
    <button className="start-button fixed-bottom" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>Next</button>
  );
}
