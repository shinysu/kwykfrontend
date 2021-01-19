import React, {useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import DisplayTopic from '../components/DisplayTopic';
import ChatBot from '../components/ChatBot'
import UserStats from '../components/UserStats'
import Responses from '../components/Responses'
import Insights from '../components/Insights'
import Login from "../components/Login";
import Feedback from "../components/Feedback";
import PasswordReset from './PasswordReset';
import Page404 from './Page404';
import AdminScreen from "../components/AdminScreen"
import SessionSelectionScreen from "../components/SessionSelectionScreen"
import Error from './Error';

function Routes(){
    const [topic, setTopic] = useState("");
    const [subtopic, setSubTopics] = useState("");
    const [session, setSession] = useState("");
    function getSelectedTopic(selectedTopic){
      setTopic(selectedTopic);
    }

    function getSelectedSubTopic(selectedSubTopic){
      setSubTopics(selectedSubTopic);
    }

    function getSelectedSession(selectedSession){
      setSession(selectedSession);
    }
    return(
      <Router  basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
      <Route path="/" exact render={() => <Login/>} />
      <Route path="/topics" exact render={() => <DisplayTopic getSelectedTopic={getSelectedTopic}
                            getSelectedSubTopic={getSelectedSubTopic}/>} />
      <Route path="/reset" exact render={() => <PasswordReset/>} />
      <Route path="/chat/:topic/:subtopic" render={() => <ChatBot topic={topic} subtopic={subtopic}/>} />
      <Route path="/user_stats/:topic/:subtopic" render={() => <UserStats/>} />
      <Route path="/view_responses/:topic/:subtopic" render={() => <Responses/>} />
      <Route path="/feedback" render={() => <Feedback/>} />
      <Route path="/admin" exact render={() => <AdminScreen getSelectedTopic={getSelectedTopic}
                            getSelectedSubTopic={getSelectedSubTopic}/>} />
      <Route path="/admin/:topic/:subtopic" exact render={() => <SessionSelectionScreen
                            getSelectedSession={getSelectedSession}/>} />
      <Route path="/insights/:topic/:subtopic" render={() =>
                <Insights topic={topic} subtopic={subtopic} session={session}/>} />
      <Route path="/error" render={() => <Error/>} />
      <Route render={() => <Page404/>} />
      </Switch>
      </Router>
    );
}

export default Routes;
