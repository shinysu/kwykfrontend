import React from 'react';
import '../static/css/header.css';
import knowbotSVG from '../static/images/knowbotSVG.svg';
import Dropdown from 'react-bootstrap/Dropdown'
import * as constant from '../components/Constants'
import { useHistory } from "react-router-dom";
import * as utils from '../utils/jsutils'

function Header(props){
  let session = "";
  let tagline ="";
  let fontSize = "1.1em"
  session = sessionStorage.getItem('session_name');
  if(session === 'undefined'){
    session = ''
  }

  if(props.topic){
    tagline = 'about '+utils.convertToCamelCase(props.topic)
    fontSize = "1em"
  }
  return(
    <div className="row headercontainer">
        <div className="col-11 headerfont">
          <div className="row headerrow">
          <img src={knowbotSVG} className="knowbotlogo" alt="logo" />
          <div className="kwykheader" style={{fontSize: fontSize}}>
              Microknowledge - Little bits of knowledge {tagline}
          </div>
          <div className="sessionname">{session}</div>
          </div>
        </div>
        <div className="col-1 headerfont">
          <DisplayDropDown />
        </div>
      </div>
  );
}

export default Header;

function DisplayDropDown() {
  let history = useHistory();
  function handleLogout() {
    sessionStorage.clear();
    history.push({
      pathname:`/`
    });
  }
  return(
    <Dropdown>
      <Dropdown.Toggle className="ellipsisbutton" id="dropdown-basic"
        style={{backgroundColor: constant.greyColor, color:constant.blackColor}}>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleLogout} className="ellipsismenu">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
