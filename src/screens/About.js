import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/feedback.css';
import '../static/css/about.css';
import * as constant from '../components/Constants';
import ReactGA from 'react-ga4';

function About() {
  ReactGA.pageview(window.location.pathname + window.location.search);
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
    <div className='fbarea'>
      <br />
      <p className='aboutlabel'>
        Build Skills is an initiative to help you build a new skill or improve an
        existing skill. You can build a skill using the following framework.
      </p>
      <ol className='aboutlabel'>
        <li>1. Assess your current knowledge</li>
        <li>2. Learn core concepts and a minimum set of details to build simple applications</li>
        <li>3. Practice building several applications</li>
      </ol>
      <p className='aboutlabel'>
        We will help you in each step of the process.
      </p>
      <p className='aboutlabel'>
      Assess your knowledge <br />
      This application allows you to pick a level (beginner, intermediate etc.) and answer a few open questions.
      </p>
      <p className='aboutlabel'>
      Each question is a term that specifies a concept and you are required to provide any associated terms you can think of.
      </p>
      <p className='aboutlabel'>
      At the end of the assessment, the app will show you your answers and along with answers of your peers.
      </p>
      <p className='aboutlabel'>
      You can skip questions anytime. You can also pick a concept and look at its description and sample uses.
      </p>
      <p className='aboutlabel'>
      Credits
      </p>
      <p className='aboutlabel'>
      Product Team
      </p>
      <p className='aboutlabel'>
      Ashish Cherian &nbsp;(<a href='https://twitter.com/ashish_che' target='_blank'>@ashish_che</a> &nbsp;&nbsp;&nbsp;<a
      href='https://www.linkedin.com/in/reach2ashish/' target='_blank'>Thomas (Ashish) Cherian</a>)  - Backend Development <br/>
      Dorai Thodla &nbsp;(<a href='https://twitter.com/dorait' target='_blank'>@dorait</a> &nbsp;&nbsp;&nbsp;<a
      href='https://www.linkedin.com/in/doraithodla/' target='_blank'>Dorai Thodla</a>) - Tech Lead<br/>
      Shiny Suresh &nbsp;(<a href='https://twitter.com/shiny_su' target='_blank'> @shiny_su</a> &nbsp;&nbsp;&nbsp;<a
      href='https://www.linkedin.com/in/shiny-s-u-966281aa/' target='_blank'>Shiny S U</a>) - Frontend Development
      </p>
      <p className='aboutlabel'>
      copyright iMorph 2021
      </p>
    </div>
  );
}
