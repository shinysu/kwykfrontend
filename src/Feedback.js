import React,{useState} from "react";
import Header from "./components/kwykHeader";
import UserHeader from "./components/UserHeader";
import './static/css/feedback.css';
import * as constant from './components/constants'
function Feedback() {
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 lightgreen">
          <Header />
          <UserHeader />
          <ShowTemplate />
        </div>
      <div className="col-sm-2"></div>
    </div>
  </div>
  );
}
export default Feedback;

function ShowTemplate() {
  const [userInput, setUserInput] = useState("");
  const username = sessionStorage.getItem('username');
  function handleChange(e){
    setUserInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    const serviceID = 'default_service';
    const templateId = 'template_09oi0b1';
    sendFeedback(serviceID,templateId, {message: userInput, from_name:username, reply_to: constant.fbToEmail})
  }
  return(
    <div className = "fbarea">
    <form className="white" onSubmit={handleSubmit}>
    <div className="fblabel">{constant.feedbackMessage}</div>
    <div className="fblabel blank"> Feedback / Issue / Query</div>
    <textarea className="fbtext" placeholder="Type your response here..." onChange={handleChange}></textarea>
    <input type="submit" value="Submit" className="fbsubmitbtn"/>
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
