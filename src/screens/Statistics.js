import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";
import '../static/css/admin.css';


function Statistics(props){
  return(
    <div >
      <DisplayStats data={props.data}/>
    </div>
  );
}

export default Statistics;

function DisplayStats(props) {
  let totalUsers = 0, totalWords = 0;
  let leastResponse =[];
  let mostSkips =[];
  let commonResponseCount =[];
  let userResponseCount =[];
  let userResponseData;
  //let leastResponseUser =[];
  const stats = getStats(props.data);
  const answeredCount =stats["answeredCount"];
  const skipsCount = stats["skipsCount"];
  commonResponseCount = stats["commonResponseCount"];
  const userAnswerCount = stats["userAnswerCount"];
  totalUsers = stats["totalUsers"];
  totalWords = stats["totalWords"];
  mostSkips = getSortedData(skipsCount,1); //second arg 1 to sort desc
  leastResponse = getSortedData(answeredCount,0);
  const userResponse = getResponseHist(userAnswerCount, totalWords);
  userResponseData = userResponse["userDivisionData"];
  userResponseCount = userResponse["userResponseCount"];
  const displayItems = [
                  {message:'Common user responses',data:commonResponseCount, maxVal:totalWords,
                  type:'cloud'},
                  {message:'Key terms with least responses',data:leastResponse,maxVal:totalUsers,
                    type:'progress'},
                  {message:'Key terms with most skips',data:mostSkips,maxVal:totalUsers,
                type:'progress'},
                  {message:'Key terms attempted by users',data:userResponseCount,maxVal:totalUsers,
                  value:userResponseData,type:'progress'}
                ]
  const statButtons = displayItems.map((item,index)=>{
    return <DisplayButton message={item.message} key={index} maxVal={item.maxVal}
    data={item.data} value={item.value} type={item.type}/>
  });
  return(
    <div className="display-stats">
    {statButtons}
    </div>
  );
}

function DisplayButton(props){
  const [open, setOpen] = useState(false);
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
        <div className="chatcolor">
          <DisplatData maxVal={props.maxVal} data={props.data} value={props.value} type={props.type}/>
        </div>
      </Collapse>
    </div>
  );
}

function DisplatData(props) {
  if(props.type === 'progress'){
    return <ShowProgressBar maxVal={props.maxVal} data={props.data} value={props.value}/>
  }
  else{
    return <ShowWordCloud maxVal={props.maxVal} data={props.data} />
  }
}

function ShowWordCloud(props) {
  if(props.data.length > 0){
  const words = props.data;
  const options = {
    fontSizes: [5, 60],
    rotations: 3,
    rotationAngles: [0, 0],
    padding: 3,
  }
  const resizeStyle = {
    background: "#e4dcd4",
    width:'100%',
    height: '100%',
  }
  return (
    <Resizable className="chatcolor"
     defaultSize={{
      width: '100%',
      height: '40vh',
    }}
     style={resizeStyle}
      >
    <ReactWordcloud className="wordcloud" options={options} words={words} style={resizeStyle}/>
    </Resizable>
  );
}
else {
return <div></div>
}
}

function ShowProgressBar(props){
  const data = props.data;
  const maxVal = props.maxVal;
  const statsBar = data.map((statData,index)=>{
    const percent = statData[1];
    const range = statData[0];
    let popover;
    if(props.value){
      const names = props.value[range];
      let users = names.join('\n');
      popover = (
        <Popover>
          <Popover.Title >Users</Popover.Title>
          <Popover.Content>
          { users}
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

function getStats(data){
  let skipsCount = {};
  let answeredCount = {};
  let wordResponses =[];
  let userAnswerCount = {};
  const topicData = data;
  const words = topicData["topic_words"];
  const userWords = topicData["user_data"];
  const totalUsers = Object.keys(userWords).length;
  const totalWords = words.length;
  for(var i=0; i < words.length; i++){
      const word = words[i];
      skipsCount[word] = 0;
      answeredCount[word] = 0;
      //wordResponses[word] = [];
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
          wordResponses=wordResponses.concat(userEntries[word].split(","))
        //  wordResponses[word]=wordResponses[word].concat(userEntries[word].split(","))
        }
      }
      /*wordResponses[word] = getWordFrequency(wordResponses[word]);
      const counts = getUniqueWordsCount(wordResponses[word]);
      uniqueWordsCount[word] = counts["uniqueCount"];
      commonResponseCount[word] = counts["mostCommonResponse"];*/
    }
    wordResponses = getWordFrequency(wordResponses);
    //const counts = getUniqueWordsCount(wordResponses[word]);
    return {"answeredCount": answeredCount, "skipsCount": skipsCount, "commonResponseCount":wordResponses,
    "totalUsers":totalUsers, "userAnswerCount":userAnswerCount,
    "totalWords":totalWords}
}

function getWordFrequency(wordArray) {
  var occurrences = wordArray.reduce(function(obj, index) {
  obj[index] = (obj[index] || 0) + 1;
  return obj;
  }, {});
  let words = [];
  for(const [key, value] of Object.entries(occurrences)){
    words.push({text:key,value:value})
  }
  return words;
}

function getSortedData(data,type,count=5){
  let sortedData = [];
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
  for(var n=count; n < sortedData.length; n++){
    if(sortedData[n-1][1] === sortedData[n][1]){
      count++;
    }
    else {
      break;
    }
  }
  return sortedData.slice(0,count);
  }

/*function getUniqueWordsCount(data){
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
}*/

function getResponseHist(userData, totalWords) {
  const divisions = [0, 0.25, 0.5, 0.75, 1];
  let userDivisionData = {};
  let userResponseCount =[]
  //answerDivisions contains split up of word count
  const answerDivisions = divisions.map((value,index) =>{
    return `${Math.round(divisions[index] * totalWords)}`
  });
  //ansdivpercent = ["0 - 24", "25 - 49", "50 - 74", "75 - 99", "100"]
  const ansdivpercent = divisions.map((value,index) =>{
    let valRange;
    if(parseInt(value) === 1){
      valRange = `100%`;
    }
    else{
      valRange = `${value * 100}-${divisions[index + 1]*100 -1}%`
    }
    userDivisionData[valRange] =[];
    return valRange;
  });
  for(const [key, value] of Object.entries(userData)){
    if(value === totalWords){
      const centPercent = ansdivpercent[ansdivpercent.length - 1];
      userDivisionData[centPercent].push(key)

    }
    else{
      for(let i = 0; i < answerDivisions.length-1; i++){
        if((value >= answerDivisions[i]) && ((value < answerDivisions[i+1]))){
          const percent = ansdivpercent[i];
          userDivisionData[percent].push(key);

        }
      }
    }
  }
  let count = 0;
  for(let i=0; i < ansdivpercent.length; i++){
    const range = ansdivpercent[i];
    if(userDivisionData[range]){
      count=userDivisionData[range].length;
    }
    userResponseCount.push([range, count]);
  }
  return {"userDivisionData":userDivisionData, "userResponseCount":userResponseCount};
}
