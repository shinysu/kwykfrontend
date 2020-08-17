import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from './components/history';
import DisplayTopic from './displayTopic';
import ChatBot from './chatBot'
import UserStats from './UserStats'


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
      <Router  >
      <Switch>
        <Route path="/" exact render={() => <DisplayTopic getSelectedTopic={getSelectedTopic} getSelectedSubTopic={getSelectedSubTopic}/>} />
        <Route path="/:topic/:subtopic" render={() => <ChatBot topic={topic} subtopic={subtopic}/>} />
        <Route path="/:use_stats" render={() => <UserStats/>} />
      </Switch>
      </Router>
    );
}

export default Routes;
