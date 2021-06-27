import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/error.css';
import ReactGA from 'react-ga4';

function Page404() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <Display404 />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}
function Display404() {
  return(
    <div className='error'>
       <h2><div className='message'>Error: 404 - Page not found</div></h2>
    </div>
  );
}

export default Page404;
