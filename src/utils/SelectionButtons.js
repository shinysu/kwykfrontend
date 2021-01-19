import React, {useState} from 'react';
import * as constant from '../utils/Constants'
import useFetch from "../hooks/useFetch";
import '../static/css/contents.css';
import DisplayAlert from '../utils/DisplayAlert'

function SelectionButtons(props){
  const [clickedButton, setClickedButton] = useState("");
  const topics = props.topics;
  let height = "30vh";
  function getClickedButton(name){
    props.getSelectedTopic(name);
    setClickedButton(name);
  }
  if (props.styling == "topics-area"){
    if(clickedButton == ""){
      height = "50vh";
    }
    else {
      height = "22vh";
    }
  }

  const buttonList = topics.map((topic, index) =>
      <TopicButton name={topic} textColor={topic === clickedButton ? constant.whiteColor : constant.blackColor }
      buttonColor={topic === clickedButton ? constant.darkGrey : constant.greyColor}
      getClickedButton={getClickedButton} key={index}/>
  );
  return (<div className={`${props.styling}`} style={{height:height}}>{buttonList}</div>);
}

export default SelectionButtons;

function TopicButton(props){
  function handleClick(e){
    props.getClickedButton(e.target.value);
  }
  return (<button className="rounded-pill topic-btn" value={props.name}
            style={{color: props.textColor, backgroundColor: props.buttonColor}}
            onClick={handleClick}> {convertToCamelCase(props.name)}</button>);
}

function convertToCamelCase(name) {
  const words = name.split(" ");
  let convertedName = "";
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    convertedName = convertedName + " " +words[i]
  }
  return convertedName;
}
