import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/feedback.css';
import '../static/css/about.css';
import * as constant from '../components/Constants'
function About() {
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
          <Header />
          <ShowAboutUs />
        </div>
      <div className="col-lg-2"></div>
    </div>
  </div>
  );
}
export default About;

function ShowAboutUs() {
  return(
    <div className="fbarea">
      <div className="fblabel"></div>
      <div className="fblabel wrap">{constant.aboutUs1}</div>
      <div className="fblabel wrap">{constant.aboutUs2}</div>
    </div>
  );
}
