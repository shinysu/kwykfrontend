import React, { useState } from "react";
import TopicSelectHeader from "./TopicSelectHeader";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Histogram from 'react-chart-histogram'
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
  let totalUsers = 0, totalWords = 0;
  let uniqueResponse =[];
  let leastResponse =[];
  let mostSkips =[];
  let commonResponse =[];
  let userResponseCount =[];
  let userResponseData;
  //let leastResponseUser =[];
  console.log("DisplayStats");
  if(props.selectedValue){
    const stats = getStats(props.userData,props.selectedValue);
    const answeredCount =stats["answeredCount"];
    const skipsCount = stats["skipsCount"];
    const uniqueResponseCount = stats["uniqueWordsCount"];
    const commonResponseCount = stats["commonResponseCount"];
    const userAnswerCount = stats["userAnswerCount"];
    console.log("userAnswerCount=",userAnswerCount);
    totalUsers = stats["totalUsers"];
    totalWords = stats["totalWords"];
    mostSkips = getSortedData(skipsCount,1); //second arg 1 to sort desc
    leastResponse = getSortedData(answeredCount,0);
    uniqueResponse = getSortedData(uniqueResponseCount,1);
    commonResponse = getSortedData(commonResponseCount,1);
    console.log(uniqueResponse);
    const userResponse = getResponseHist(userAnswerCount, totalWords);
    userResponseData = userResponse["userDivisionData"];
    userResponseCount = userResponse["userResponseCount"];
    console.log("userResponse=",userResponseData);
    console.log("userResponseCount=",userResponseCount);
  //  mostResponseUser = getSortedData(userAnswerCount, 1);
  //  leastResponseUser = getSortedData(userAnswerCount, 0);
  }

  const displayItems = [{message:'Key terms with most unique responses',data:uniqueResponse,maxVal:totalUsers},
                  {message:'Key terms with least responses',data:leastResponse,maxVal:totalUsers},
                  {message:'Key terms with most skips',data:mostSkips,maxVal:totalUsers},
                  {message:'Key terms with most common responses',data:commonResponse,maxVal:totalUsers},
                  {message:'Users responses',data:userResponseCount,maxVal:totalUsers,value:userResponseData}
                ]
  const statButtons = displayItems.map((item,index)=>{
    return <DisplayButton message={item.message} key={index} maxVal={item.maxVal}
    data={item.data} value={item.value}/>
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
        aria-controls="collapse-text"
        aria-expanded={open}
        variant="stats"
        className="btn-stats"
      >
        {props.message}
      </Button>
      <Collapse in={open} className="stats-data">
        <div className="lightgreen">
          <ShowProgressBar maxVal={props.maxVal} data={props.data} value={props.value}/>
        </div>
      </Collapse>
    </div>
  );
}

function ShowProgressBar(props){
  const data = props.data;
  const maxVal = props.maxVal;
  const statsBar = data.map((statData,index)=>{
    console.log("statData=",statData);
  const percent = statData[1];
  const range = statData[0];
  let popover;
  if(props.value){
    const names = props.value[range];
    let users = names.join('\n')

     popover = (
      <Popover>
       <Popover.Title as="h6">Users</Popover.Title>
       <Popover.Content>
        {users}
       </Popover.Content>
      </Popover>
    );
  }
  else{
   popover = (
     <Popover> </Popover>
   );
 }
 return (
      <div className="row">
        <div className="col-sm-4 white">
        <label className="data-label"> {statData[0]} </label>
        </div>
        <div className="col-sm-8 white">
        <OverlayTrigger overlay={popover}>
        <ProgressBar className="progress" now={percent} label={`${percent} `} key={index} max={maxVal} min='0'/>
        </OverlayTrigger>
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

function getStats(data, topic){
  console.log("GetMostSkips");
  let skipsCount = {};
  let answeredCount = {};
  let totalSkips = 0;
  let wordResponses ={};
  let uniqueWordsCount = {};
  let commonResponseCount = {};
  let userAnswerCount = {};
  const topicData = data[topic];
  const words = topicData["topic_words"];
  const userWords = topicData["user_data"];
  const totalUsers = Object.keys(userWords).length;
  const totalWords = words.length;
  for(var i=0; i < words.length; i++){
      const word = words[i];
      skipsCount[word] = 0;
      answeredCount[word] = 0;
      wordResponses[word] = [];
  }

  for (i=0; i < words.length; i++){
      const word = words[i];
      for(const [key, value] of Object.entries(userWords)){
        const userEntries = value;
        if(!Object.keys(userEntries).includes(word)){
          skipsCount[word] += 1;
        }
        else{
          userAnswerCount[key] = (userAnswerCount[key]||0)+1;
          answeredCount[word] +=1;
          wordResponses[word]=wordResponses[word].concat(userEntries[word].split(","))
        }
      }
      wordResponses[word] = getWordFrequency(wordResponses[word]);
      const counts = getUniqueWordsCount(wordResponses[word]);
      uniqueWordsCount[word] = counts["uniqueCount"];
      commonResponseCount[word] = counts["mostCommonResponse"];
    }
    return {"answeredCount": answeredCount, "skipsCount": skipsCount, "uniqueWordsCount":uniqueWordsCount,
    "commonResponseCount":commonResponseCount, "totalUsers":totalUsers, "userAnswerCount":userAnswerCount,
    "totalWords":totalWords}
}

function getWordFrequency(wordArray) {
  var occurrences = wordArray.reduce(function(obj, index) {
  obj[index] = (obj[index] || 0) + 1;
  return obj;
  }, {});
  return occurrences;
}

function getSortedData(data,type){
  console.log("getMostSkips");
  console.log("skips=",data);
  let sortedData = [];
  let count = 5;
  for (var word in data) {
    sortedData.push([word, data[word]]);
  }
  sortedData.sort(function(a, b) {
    if(type === 0){
      return a[1] - b[1];
    }
    else{
      return b[1] - a[1];
    }
  });
  console.log("sortedSkips=",sortedData);
  for(var n=count; n < sortedData.length; n++){
    if(sortedData[n-1][1] == sortedData[n][1]){
      count++;
    }
    else {
      break;
    }
  }
  return sortedData.slice(0,count);
  }

function getUniqueWordsCount(data){
  let uniqueCount = 0;
  let mostCommonResponse = 1;
  for(const [key, value] of Object.entries(data)){
    if(value === 1){
      uniqueCount += 1;
    }
    else{
      if(value > mostCommonResponse){
        mostCommonResponse = value
      }
    }
  }
  return {"uniqueCount":uniqueCount, "mostCommonResponse":mostCommonResponse}
}

function getResponseHist(userData, totalWords) {
  console.log("getResponseHist");
  console.log(userData);
  const divisions = [0, 0.25, 0.5, 0.75, 1];
  let userDivisionData = {};
  let userResponseCount =[]
  //answerDivisions contains split up of word count
  const answerDivisions = divisions.map((value,index) =>{
    return `${Math.round(divisions[index] * totalWords)}`
  });
  //ansdivpercent = ["0 - 24", "25 - 49", "50 - 74", "75 - 99", "100"]
  const ansdivpercent = divisions.map((value,index) =>{
    if(parseInt(value) === 1){
      return `100%`;
    }
    else{
      return `${value * 100}-${divisions[index + 1]*100 -1}%`
    }
  });
  for(const [key, value] of Object.entries(userData)){
    if(value === totalWords){
      const centPercent = ansdivpercent[ansdivpercent.length - 1];
      if(centPercent in userDivisionData){
        userDivisionData[centPercent].push(key)
      }
      else{
        userDivisionData[centPercent] = [key]
      }
    }
    else{
      for(var i = 0; i < answerDivisions.length-1; i++){
        if((value >= answerDivisions[i]) && ((value < answerDivisions[i+1]))){
          const percent = ansdivpercent[i];
          if(percent in userDivisionData){
            userDivisionData[percent].push(key);
          }
          else{
            userDivisionData[percent] = [key];
          }
        }
      }
    }
  }
  console.log("ansdivpercent=",ansdivpercent);
  for(var i=0; i < ansdivpercent.length; i++){
    const range = ansdivpercent[i]
    userResponseCount.push([range, userDivisionData[range].length]);
  }
  return {"userDivisionData":userDivisionData, "userResponseCount":userResponseCount};
}
