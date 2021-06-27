import React from 'react';
import knowbotpng from '../static/images/knowbotpng.png';
import '../static/css/login.css';
import * as constant from '../components/Constants';
import { useHistory } from "react-router-dom";
import Header from "../headers/FrontPageHeader";
import '../static/css/about.css';
import ReactGA from 'react-ga4';

function UserLogin() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  let pathArray = window.location.href.split( '/' );
  pathArray = pathArray.filter(function(entry) { return entry.trim() != ''; });
  const subtopic = pathArray[pathArray.length - 1].replace("%20", " ");
  const topic = pathArray[pathArray.length - 2].replace("%20", " ");
  setSessionTopic(topic, subtopic);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 whitecolor">
          <Header />
          <AboutPage />
          <ShowLoginButton />
        </div>
      <div className="col-lg-2"></div>
    </div>
  </div>
  );
}

function setSessionTopic(topic, subtopic) {
  sessionStorage.setItem('topic', topic);
  sessionStorage.setItem('subtopic', subtopic);

}

export default UserLogin;

function AboutPage() {
  return(
    <div className='aboutpage'>
      <br />
      <p className='aboutparah'>
        Build Skills is an initiative to help you build a new skill or improve an
        existing skill. You can build a skill using the following framework.
      </p>
      <ol className='aboutparah'>
        <li className='whitecolor'>1. Assess your current knowledge</li>
        <li className='whitecolor'>2. Learn core concepts and a minimum set of details to build simple applications</li>
        <li className='whitecolor'>3. Practice building several applications</li>
      </ol>
      <p className='aboutparah'>
        We will help you in each step of the process.
      </p>
      <p className='aboutparah'>
      Assess your knowledge <br />
      This application allows you to pick a level (beginner, intermediate etc.) and answer a few open questions.
      </p>
      <p className='aboutparah'>
      Each question is a term that specifies a concept and you are required to provide any associated terms you can think of.
      </p>
      <p className='aboutparah'>
      At the end of the assessment, the app will show you your answers and along with answers of your peers.
      </p>
      <p className='aboutparah'>
      You can skip questions anytime. You can also pick a concept and look at its description and sample uses.
      </p>
    </div>

  );
}

function ShowLoginButton() {
  let history = useHistory();
  function handleClick() {
    history.push({
        pathname:'/'
    });
  }
  return(
    <div className='loginbuttonarea'>
      <button value="Submit" onClick={handleClick} className="aboutlogin">Login/Register</button>
    </div>
  );
}
