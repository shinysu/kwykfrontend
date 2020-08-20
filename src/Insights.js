import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "./components/tab";
import Header from "./components/kwykHeader";
import './static/css/header.css';
import './static/css/admin.css';
import { useHistory } from "react-router-dom";
import useFetch from "./components/getData";
import * as constant from './components/constants'

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
          <ShowStatistics />
        </Content>
        <Content active={active === 1}>
          <ShowInsights />
        </Content>
      </>
    </div>
  );
}

function ShowStatistics(){
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  return(
    <div >
      <TopicHeader getSelectedValue={getSelectedValue} selectedValue={selectedValue}/>
    </div>
  );
}

function ShowInsights(){
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const url = constant.kwykURL+"/admin/user_data_custom/"+selectedValue;
  const fetchResponse = useFetch(url, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data
  return(
    <div >
      <TopicHeader getSelectedValue={getSelectedValue} selectedValue={selectedValue}/>
    </div>
  );
}

function TopicHeader(props){
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  //const options = props.topics
  function handleChange(e){
    setSelectedValue(e.target.value);
    props.getSelectedValue(e.target.value);
  }
  return(
    <div className="row green">
    <label className="green topic-label"> TOPIC: </label>
    <select className="topic-select" onChange={handleChange} value={selectedValue}>
    </select>
    </div>
  );
}
