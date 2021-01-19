import React, {useState} from 'react';
import Header from "../headers/KwykHeader";
import '../static/css/contents.css';
import TopicSelectionScreen from "./TopicSelectionScreen";
import { useHistory, useLocation } from "react-router-dom";
import AdminAccessDenied from '../utils/AdminAccessDenied';

function AdminScreen(props) {
  console.log("AdminScreen");
  let history = useHistory();
  const location = useLocation();

  if((sessionStorage.getItem('useremail') != null) && (sessionStorage.getItem('is_admin') == 'true')){
        const getSelectedTopic = props.getSelectedTopic;
        const getSelectedSubTopic = props.getSelectedSubTopic;
        return <TopicSelection getSelectedTopic={getSelectedTopic}
                getSelectedSubTopic={getSelectedSubTopic}/>
  }
  else{
    if(sessionStorage.getItem('is_admin') == 'false'){
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
          <Header/>
          <TopicSelectionScreen
              getSelectedTopic={getSelectedTopic}
              topic={topic}
              getSelectedSubTopic={getSelectedSubTopic}
              />
          <DisplayButton topic={topic} subtopic={subtopic}
              returnTopic={getSelectedTopic}
              returnSubtopic={getSelectedSubTopic}
              />
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
      props.returnTopic(props.topic);
      props.returnSubtopic(props.subtopic);
      history.push({
        pathname:'/admin/'+props.topic+'/'+props.subtopic
      });
      //history.push('/'+props.topic+'/'+props.subtopic);
  }
  return(
    <button className="start-button fixed-bottom" value="start"
      onClick={handleClick} style={{display: buttonDisplay}}>Next</button>
  );
}
