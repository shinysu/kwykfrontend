import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "./components/tab";
import Header from "./components/kwykHeader";
import './static/css/header.css';
import './static/css/admin.css';
import { useHistory } from "react-router-dom";
import useFetch from "./components/getData";
import * as constant from './components/constants'
import usePost from "./components/postData";

function Insights() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 lightgreen">
            <Header />
            <StatisticsTab />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default Insights;

function StatisticsTab(props){
  const [active, setActive] = useState(0);
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  const url = constant.kwykURL+"/admin/user_data_custom/";
  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data
  console.log("data=",data);

  return(
    <div className="tab-color">
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          STATISTICS
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          INSIGHTS
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <ShowStatistics data={data}/>
        </Content>
        <Content active={active === 1}>
          <ShowInsights data={data}/>
        </Content>
      </>
    </div>
  );
}

function ShowStatistics(props){
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const topics = props.data["topics"];
  return(
    <div >
      <TopicHeader getSelectedValue={getSelectedValue} selectedValue={selectedValue} topics={topics}/>
    </div>
  );
}

function ShowInsights(props){
  console.log("ShowInsights");
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const topics = props.data["topics"];
  const userData = props.data["topic_answers"];
  console.log("userData=",userData);
  return(
    <div >
      <TopicHeader getSelectedValue={getSelectedValue} selectedValue={selectedValue} topics={topics}/>
      <DisplayUserData selectedValue={selectedValue} userData={userData}/>
    </div>
  );
}

function TopicHeader(props){
  console.log("TopicHeader");
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const topics=props.topics;
  function handleChange(e){
    setSelectedValue(e.target.value);
    props.getSelectedValue(e.target.value);
  }
  return(
    <div className="row green">
    <label className="green topic-label"> TOPIC: </label>
    <select className="topic-select" onChange={handleChange} value={selectedValue}>
      {topics.map((topic,index) => <option key={index} > {topic} </option>)}
    </select>
    </div>
  );
}

function DisplayUserData(props){
  let words, userData;
  let header,body;
  console.log("DisplayUserData");
  console.log(props.userData);
  const data = props.userData[props.selectedValue];
  console.log("data=",data);
  if(data){
    words=data["topic_words"];
    console.log("words=",words);
    userData = data["user_data"];
    console.log("userData=",userData);
    header = words.map((word,index)=>{
      return <th className="data" key={index}>{word}</th>
    });
    body = Object.keys(userData).map((user,index)=>{
      const userVal = userData[user];

      const userInput = words.map((word,index)=>{
        console.log("this=",userVal[word]);
        if(userVal[word]){
          return <td style={{backgroundColor:"#b2de83"}} key={index}></td>;
        }
        else {
          return <td style={{backgroundColor:"#c35c14"}} key={index}></td>;
        }

      });
      console.log("userInput=",userInput);
      return(
        <tr key={index}>
        <td>{user}</td>
        {userInput}
        </tr>
      );
    });
  }
  return(
    <div className="display-data">
      <table>
        <thead>
          <tr>
            <th style={{"minWidth":"200px"}}>Username</th>
            {header}
          </tr>
        </thead>
        <tbody>
        {body}
        </tbody>
      </table>
    </div>
  );
}
