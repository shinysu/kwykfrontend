import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/feedback.css';
import * as constant from '../components/Constants';
import ReactGA from 'react-ga4';

function Feedback() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <Header />
          <ShowTemplate />
        </div>
      <div className="col-lg-2"></div>
    </div>
  </div>
  );
}
export default Feedback;

function ShowTemplate() {
  const [userInput, setUserInput] = useState("");
  const username = sessionStorage.getItem('username');
  let history = useHistory();
  function handleChange(e){
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const serviceID = 'default_service';
    const templateId = 'template_09oi0b1';
    sendFeedback(serviceID,templateId, {message: userInput, from_name:username, reply_to: "<kwyktest01@gmail.com>, <dorait@gmail.com>, <ashish@imorph.com>, <shiny.suresh@gmail.com>"});
    setUserInput("");
    //sessionStorage.clear();
    history.push({
      pathname:`/thanks`
    });
  }
  return(
    <div >
    <form className = "fbarea" onSubmit={handleSubmit}>
    <div className="fblabel">{constant.feedbackMessage}</div>
    <div className="fblabel blank"> Feedback / Issue / Query</div>
    <textarea className="fbtext" value={userInput} placeholder="Type your response here..." onChange={handleChange}></textarea>
    <input type="submit" value="Submit" className="fbsubmitbtn "/>
    </form>
    </div>
  );
}

function sendFeedback (serviceID,templateId, variables) {
 window.emailjs.send(
   serviceID, templateId,
   variables
   ).then(res => {
     console.log('Email successfully sent!')
   })
   // Handle errors here however you like, or use a React error boundary
   .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
 }
