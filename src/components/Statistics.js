import React, { useState } from "react";
import TopicSelectHeader from "./TopicSelectHeader";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../static/css/admin.css';


function Statistics(props){
  console.log("Statistics");
  const [selectedValue, setSelectedValue] = useState("");
  function getSelectedValue(value){
    setSelectedValue(value);
  }
  const topics = props.data["topics"];
  const userData = props.data["topic_answers"];
  console.log("useRData=",userData);
  return(
    <div >
      <TopicSelectHeader getSelectedValue={getSelectedValue} selectedValue={selectedValue} topics={topics}/>
      <DisplayStats userData={userData} selectedValue={selectedValue}/>
    </div>
  );
}

export default Statistics;

function DisplayStats(props) {
  let totalUsers = 0;
  let uniqueResponse =[];
  let leastResponse =[];
  let mostSkips =[];
  let commonResponse =[];
  let mostResponseUser =[];
  let leastResponseUser =[];
  console.log("DisplayStats");
  if(props.selectedValue){
    const stats = getStats(props.userData,props.selectedValue);
    const answeredCount =stats["answeredCount"];
    const skipsCount = stats["skipsCount"];
    totalUsers = stats["totalUsers"];
    mostSkips = getMostSkips(skipsCount,1); //second arg 1 to sort desc
    leastResponse = getMostSkips(answeredCount,0);
  }

  const displayItems = [{message:'Key terms with most unique responses',data:uniqueResponse},
                  {message:'Key terms with least responses',data:leastResponse},
                  {message:'Key terms with most skips',data:mostSkips},
                  {message:'Key terms with most common responses',data:commonResponse},
                  {message:'Users with most responses',data:mostResponseUser},
                  {message:'Users with least responses',data:leastResponseUser}
                ]
  const statButtons = displayItems.map((item,index)=>{
    return <DisplayButton message={item.message} key={index} totalUsers={totalUsers} data={item.data}/>
  });
  return(
    <div className="display-stats">
    {statButtons}
    </div>
  );
}

function DisplayButton(props){
  console.log("DisplayButton");
  const [open, setOpen] = useState(false);
  //console.log(props.data);
  return(
    <div className="display-btn">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="stats"
        className="btn-stats"
      >
        {props.message}
      </Button>
      <Collapse in={open} className="stats-data">
        <div className="lightgreen">
          <ShowProgressBar totalUsers={props.totalUsers} data={props.data}/>
        </div>
      </Collapse>
    </div>
  );
}

function getStats(data, topic){
  console.log("GetMostSkips");
  console.log("data=",data);
  console.log("topic=",topic);
  let skipsCount = {};
  let answeredCount = {};
  let totalSkips = 0;
  const topicData = data[topic];
  const words = topicData["topic_words"];
  const userWords = topicData["user_data"];
  const totalUsers = Object.keys(userWords).length;
  console.log("totalUsers=",totalUsers);
  for(var i=0; i < words.length; i++){
      const word = words[i];
      skipsCount[word] = 0;
      answeredCount[word] = 0;
  }
    console.log("1. skipsCount=",skipsCount);
  for (i=0; i < words.length; i++){
      const word = words[i];
      for(const [key, value] of Object.entries(userWords)){
        const userEntries = value;
        if(!Object.keys(userEntries).includes(word)){
          skipsCount[word] += 1;
          totalSkips += 1;
        }
        else{
          answeredCount[word] +=1;
        }
      }
    }
    console.log("here");
    console.log("2 skipsCount=",skipsCount);
    return {"answeredCount": answeredCount, "skipsCount": skipsCount, "totalUsers":totalUsers}
}

function getMostSkips(skips,type){
  console.log("getMostSkips");
  var sortedSkips = [];
  for (var word in skips) {
    sortedSkips.push([word, skips[word]]);
  }

  sortedSkips.sort(function(a, b) {
    if(type === 0){
      return a[1] - b[1];
    }
    else{
      return b[1] - a[1];
    }
  });
  console.log("sortedSkips=",sortedSkips);
  return sortedSkips.slice(0,5);
  }

function ShowProgressBar(props){
  const data = props.data;
  const totalUsers = props.totalUsers;
  const statsBar = data.map((statData,index)=>{
    const percent = statData[1];
    //const percent = Math.round((statData[1]/totalUsers)*100);
    return (
      <div className="row">
        <div className="col-sm-4 white">
        <label className="data-label"> {statData[0]} </label>
        </div>
        <div className="col-sm-8 white">
        <ProgressBar className="progress" now={percent} label={`${percent} `} key={index} max={totalUsers} min='0'/>
        </div>
      </div>
    );
  });

  return(
    <div className="statsBar">
      {statsBar}
    </div>
  );
}
