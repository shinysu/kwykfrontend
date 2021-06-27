import React from 'react';
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/error.css';
import ReactGA from 'react-ga4';

function Error() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 chatcolor">
            <Header />
            <DisplayError />
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}
function DisplayError() {
  return(
    <div className='error'>
       <h4><div className='message'>Wrong topic or subtopic. Please check your URL!</div></h4>
    </div>
  );
}

export default Error;
