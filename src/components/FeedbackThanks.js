import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/error.css';

function FeedbackThanks() {
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
  sessionStorage.clear();
  function handleClick() {
    history.push({
      pathname:`/`
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
