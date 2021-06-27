import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/error.css';
import ReactGA from 'react-ga4';

function FeedbackThanks() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <ThankYouMessage />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}
function ThankYouMessage() {
  const history = useHistory();
  function handleClick() {
    const topic = sessionStorage.getItem('topic');
    const subtopic = sessionStorage.getItem('subtopic');
    sessionStorage.clear();
    history.push({
      pathname:`/${topic}/${subtopic}`
    });
  }
  return(
    <div className='thanks fbarea'>
       <div className='fbtlabel'>Thank you for your feedback !</div>
       <button className="fbsubmitbtn" onClick={handleClick}>Home</button>
    </div>
  );
}

export default FeedbackThanks;
