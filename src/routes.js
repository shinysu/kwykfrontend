import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayTopic from './displayTopic';
import ChatBot from './chatBot'
import UserStats from './UserStats'
import Responses from './Responses'
import Insights from './Insights'
import Login from "./login";
import Feedback from "./Feedback";
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
      <Route path="/feedback" exact render={() => <Feedback/>} />
      <Route path="/admin" exact render={() => <Insights/>} />

      </Switch>
      </Router>
    );
}

export default Routes;
