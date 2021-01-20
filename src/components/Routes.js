import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import DisplayTopic from '../screens/DisplayTopic';
import ChatBot from '../screens/ChatBot'
import UserStats from '../screens/UserStats'
import Responses from '../screens/Responses'
import Insights from '../screens/Insights'
import Login from "../screens/Login";
import Feedback from "../screens/Feedback";
import PasswordReset from './PasswordReset';
import Page404 from './Page404';
import AdminScreen from "../screens/AdminScreen"
import SessionSelectionScreen from "../screens/SessionSelectionScreen"
import Error from './Error';

function Routes(){
    return(
      <Router  basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
      <Route path="/" exact render={() => <Login/>} />
      <Route path="/topics" exact render={() => <DisplayTopic/>} />
      <Route path="/reset" exact render={() => <PasswordReset/>} />
      <Route path="/chat/:topic/:subtopic" render={() => <ChatBot/>} />
      <Route path="/user_stats/:topic/:subtopic" render={() => <UserStats/>} />
      <Route path="/view_responses/:topic/:subtopic" render={() => <Responses/>} />
      <Route path="/feedback" render={() => <Feedback/>} />
      <Route path="/admin" exact render={() => <AdminScreen/>} />
      <Route path="/admin/:topic/:subtopic" exact render={() => <SessionSelectionScreen/>} />
      <Route path="/insights/:topic/:subtopic" render={() =>
                <Insights />} />
      <Route path="/error" render={() => <Error/>} />
      <Route render={() => <Page404/>} />
      </Switch>
      </Router>
    );
}

export default Routes;
