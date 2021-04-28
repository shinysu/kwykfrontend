import React, {useState} from 'react';
import * as constant from '../components/Constants'
import '../static/css/contents.css';
import * as utils from '../utils/jsutils'

function SelectionButtons(props){
  const [clickedButton, setClickedButton] = useState("");
  const topics = props.topics;
  let height = "30vh";
  function getClickedButton(name){
    props.getSelectedTopic(name);
    setClickedButton(name);
  }
  if (props.styling === "topics-area"){
    if(clickedButton === ""){
      height = "40vh";
    }
    else {
      height = "12vh";
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
            onClick={handleClick}> {utils.convertToCamelCase(props.name)}</button>);
}
