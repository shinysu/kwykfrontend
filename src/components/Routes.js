import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import DisplayTopic from '../screens/DisplayTopic';
import ChatBot from '../screens/ChatBot'
import UserStats from '../screens/UserStats'
import Responses from '../screens/Responses'
import Insights from '../screens/Insights'
import Login from "../screens/Login";
import UserLogin from "../screens/UserLogin";
import Feedback from "../screens/Feedback";
import About from "../screens/About";
import PasswordReset from './PasswordReset';
import Page404 from './Page404';
import AdminScreen from "../screens/AdminScreen"
import SessionSelectionScreen from "../screens/SessionSelectionScreen"
import Error from './Error';
import FeedbackThanks from './FeedbackThanks';
import Explanation from "../screens/Explanations";

function Routes(){
    return(
      <Router  basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
        <Route path="/" exact render={() => <Login/>} />
        <Route path="/:topic/:subtopic" exact render={() => <UserLogin/>} />
        <Route path="/topics" exact render={() => <DisplayTopic/>} />
        <Route path="/reset" exact render={() => <PasswordReset/>} />
        <Route path="/chat/:topic/:subtopic" render={() => <ChatBot/>} />
        <Route path="/user_stats/:topic/:subtopic" render={() => <UserStats/>} />
        <Route path="/view_responses/:topic/:subtopic" render={() => <Responses/>} />
        <Route path="/explanation/:topic/:subtopic" render={() => <Explanation/>} />
        <Route path="/feedback" render={() => <Feedback/>} />
        <Route path="/about" render={() => <About/>} />
        <Route path="/admin" exact render={() => <AdminScreen/>} />
        <Route path="/admin/:topic/:subtopic" exact render={() => <SessionSelectionScreen/>} />
        <Route path="/analytics/:subtopic" render={() =>
                  <Insights />} />
        <Route path="/error" render={() => <Error/>} />
        <Route path="/thanks" exact render={() => <FeedbackThanks/>} />
        <Route render={() => <Page404/>} />
      </Switch>
      </Router>
    );
}

export default Routes;
