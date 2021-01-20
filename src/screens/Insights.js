import React, { useState } from "react";
import { Tabs, Tab, Content } from "../components/Tab";
import Header from "../headers/KwykHeader";
import '../static/css/header.css';
import '../static/css/admin.css';
import useFetch from "../hooks/useFetch";
import * as constant from '../components/Constants'
import Statistics from "./Statistics";
import DisplayAlert from '../components/DisplayAlert';
import { useHistory, useLocation } from "react-router-dom";
import AdminAccessDenied from '../components/AdminAccessDenied'

function Insights() {
  let history = useHistory();
  const location = useLocation();

  if((sessionStorage.getItem('useremail') != null) &&
      (sessionStorage.getItem('is_admin') === 'true')){
    return (
      <div className="container">
        <div className="row">
          <Header />
          <StatisticsTab />
        </div>
      </div>
    );
  }
  else{
    if(sessionStorage.getItem('is_admin') === 'false'){
      return <AdminAccessDenied />
    }
    const destinationPath = location.pathname
    history.push({
        pathname:`/`,
        query: {destinationPath}
      });
    return null;
  }
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
  let urlSplit = window.location.href.split("insights/")[1].split('/')
  urlSplit = urlSplit.filter(item => item);
  const topic = urlSplit[0];
  const subtopic = urlSplit[1];
  var url = '';
  if(urlSplit.length > 2){
    const session = urlSplit[2];
    url = constant.kwykURL+"admin/user_data_custom/"+topic+"/"+subtopic+"/"+session;
  }
  else{
    url = constant.kwykURL+"admin/user_data_custom/"+topic+"/"+subtopic;
  }

  //const url = constant.kwykURL+"admin/user_data_custom/";
  const fetchResponse = useFetch(url, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const data = fetchResponse.data;

  return(
    <div className="tab-color">
      <Tabs tabcolor={constant.adminTabColor}>
        <Tab onClick={handleClick} active={active === 0} id={0} tabcolor={constant.adminTabColor}>
          STATISTICS
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1} tabcolor={constant.adminTabColor}>
          INSIGHTS
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <Statistics data={data}/>
        </Content>
        <Content active={active === 1}>
          <ShowInsights data={data}/>
        </Content>
      </>
    </div>
  );
}

function ShowInsights(props){
  const [selectedView, setView] = useState("user");
  function getView(value){
    setView(value);
  }
  const userData = props.data;
  return(
    <div>
      <ViewSelection getView={getView} view={selectedView}/>
      <DisplayUserData userData={userData} selectedView={selectedView}/>
    </div>
  );
}

function DisplayUserData(props){
  let headerWords, limits;
  const data = props.userData;
  if(data){
    const headerData = getHeaderWords(data, props.selectedView);
    headerWords = headerData["headerWords"];
    limits = headerData["limits"];
  }
  return(
    <div className="display-data">
      <table className="container">
        <GetTableHeader selectedView={props.selectedView} headerWords={headerWords}/>
        <GetTableData data={data} selectedView={props.selectedView} limits={limits}/>
      </table>
    </div>
  );
}

function GetTableHeader(props){
  let titleWord;
   if(props.headerWords){
     if(props.selectedView === "user"){
       titleWord = "Username";
     }
     else{
       titleWord = "Key Terms";
     }
     const header = props.headerWords.map((word,index)=>{
       return <th className="data" key={index}>{word}</th>
     });
     return(
       <thead>
         <tr>
           <th style={{"minWidth":"200px"}}>{titleWord}</th>
           {header}
         </tr>
      </thead>
     );
   }
   else {
     return <thead><tr></tr></thead>
   }
}

function GetTableData(props){
  let words, userData;
  if(props.data){
     words=props.data["topic_words"];
     userData = props.data["user_data"];
  }
  if(props.selectedView === "user"){
    return <ViewByUsers words={words} userData={userData}/>
  }
  else{
    return <ViewByResponses words={words} userData={userData} limits={props.limits}/>
  }
}

function ViewSelection(props){
  const [view, setView] = useState(props.view);
  function handleChange(e){
    setView(e.target.value);
    props.getView(e.target.value);
  }
  return(
    <div className="row view-div">
    <select className="view-select" onChange={handleChange} defaultValue={'user'} value={view}>
      <option value="user">View By Users</option>
      <option value="responses"> View By Responses </option>)
    </select>
    </div>
  );
}

function getHeaderWords(data, view) {
  const userWords = data["user_data"];
  const totalUsers = Object.keys(userWords).length;
  const divisions = [0, 0.25, 0.5, 0.75, 1];
  const userDivisions = divisions.map((value,index) =>{
    return `${Math.round(divisions[index] * totalUsers)}`
  });
  let headerWords=[];
  let limits = [];
  if(view === "user"){
    headerWords = data["topic_words"];
  }
  else{
    const limitsData = getLimits(totalUsers, userDivisions);
    headerWords = limitsData['headerWords'];
    limits = limitsData['limits'];
  }
  return {"headerWords":headerWords, "limits":limits};
}

function ViewByUsers(props){
    const userData = props.userData;
    const words = props.words;
    if(userData){
      const data = Object.keys(userData).map((user,index)=>{
      const userVal = userData[user];
      const userInput = words.map((word,index)=>{
        if(userVal[word]){
          return <td style={{backgroundColor:"#b2de83"}} key={index}></td>;
        }
        else {
          return <td style={{backgroundColor:"#c35c14"}} key={index}></td>;
        }
      });
      return(
        <tr key={index}>
          <th className="rowheader">{user}</th>
          {userInput}
        </tr>
      );
    });
    return <tbody>{data}</tbody>
  }
  else{
    return <tbody></tbody>
  }
}

function ViewByResponses(props) {
  const userData = props.userData;
  const words = props.words;
  let wordUserCount = {};
  if(userData){
    const data = words.map((word,index)=>{
        wordUserCount[word] = getWordResponseCount(word, userData);
    });
  }
  const tableData = Object.keys(wordUserCount).map((word, index)=>{
    const wordCount = wordUserCount[word];
    const wordRow = props.limits.map((limit, index)=>{
      let wordColor = "#ffffff";
      if((wordCount >= limit[0]) && (wordCount <= limit[1])){
        wordColor  = constant.tableColors[index];
      }
      return <td style={{backgroundColor:wordColor}} key={index}></td>
    });

    return (
      <tr key={index}>
        <th className='rowheader'>{word}</th>
        {wordRow}
      </tr>
    );
  });
  return <tbody>{tableData}</tbody>

}

function getWordResponseCount(word, userData){
  let count = 0;
  for(const [key, value] of Object.entries(userData)){
    const userEntries = value;
    if(Object.keys(userEntries).includes(word)){
        count++;
    }
  }
  return count;
}

function getLimits(totalUsers, userDivisions){
  let headerWords=[];
  let limits = [];
  if(totalUsers < 5){
    for(var i=0; i<=totalUsers; i++ ){
      limits.push([i,i]);
      headerWords.push(i);
    }
  }
  else{
    headerWords.push(0);
    limits.push([0,0])
    for(let index = 1; index < userDivisions.length; index++){
      let begin = parseInt(userDivisions[index-1]) + 1;
      let end = parseInt(userDivisions[index]);
      if(end === totalUsers){
        end = end-1;
      }
      if(end < begin){
        break;
      }
      if(begin === end){
        headerWords.push(end);
        limits.push([end, end]);
      }
      else{
        headerWords.push(`${begin} - ${end}` );
        limits.push([begin, end]);
      }

    }
    headerWords.push(totalUsers);
    limits.push([totalUsers, totalUsers]);
  }
  return {"headerWords":headerWords, "limits":limits};
}
