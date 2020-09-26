import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayTopic from '../components/DisplayTopic';
import ChatBot from '../components/ChatBot'
import UserStats from '../components/UserStats'
import Responses from '../components/Responses'
import Insights from '../components/Insights'
import Login from "../components/Login";
import Feedback from "../components/Feedback";
import PasswordReset from './PasswordReset';

function Routes(){
    const [topic, setTopic] = useState("");
    const [subtopic, setSubTopics] = useState("");
    function getSelectedTopic(selectedTopic){
      setTopic(selectedTopic);
    }

    function getSelectedSubTopic(selectedSubTopic){
      setSubTopics(selectedSubTopic);
    }
    return(
      <Router  basename={`${process.env.PUBLIC_URL}/`}>
      <Switch>
      <Route path="/topics" exact render={() => <DisplayTopic getSelectedTopic={getSelectedTopic} getSelectedSubTopic={getSelectedSubTopic}/>} />
      <Route path="/" exact render={() => <Login/>} />
      <Route path="/reset" exact render={() => <PasswordReset/>} />
      <Route path="/test/:topic/:subtopic" render={() => <ChatBot topic={topic} subtopic={subtopic}/>} />
      <Route path="/user_stats/:topic/:subtopic" render={() => <UserStats/>} />
      <Route path="/view_responses/:topic/:subtopic" render={() => <Responses/>} />
      <Route path="/feedback" render={() => <Feedback/>} />
      <Route path="/admin" exact render={() => <Insights/>} />

      </Switch>
      </Router>
    );
}

export default Routes;
