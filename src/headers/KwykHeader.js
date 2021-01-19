import React from 'react';
import '../static/css/header.css';
import knowbotSVG from '../static/images/knowbotSVG.svg';
import verticalellipsis from '../static/images/verticalellipsis.png';
import Dropdown from 'react-bootstrap/Dropdown'
import * as constant from '../utils/Constants'
import { useHistory } from "react-router-dom";

function Header(){
  let session = "";
  session = sessionStorage.getItem('session_name');
  if(session === 'undefined'){
    session = ''
  }
  let history = useHistory();
  function handleLogout() {
    sessionStorage.clear();
    history.push({
      pathname:`/`
    });
  }
  return(
    <div className="row headercontainer">
        <div className="col-10 headerfont">
        <img src={knowbotSVG} className="knowbotlogo" alt="logo" />
          <div className="row kwykheader">KWYK - Know what you know !</div>
          <div className="row sessionname">{session}</div>
        </div>
        <div className="col-2 headerfont">
        <Dropdown>
            <Dropdown.Toggle className="ellipsisbutton" id="dropdown-basic"
              style={{backgroundColor: constant.greyColor, color:constant.blackColor}}>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={handleLogout} className="ellipsismenu">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown></div>
      </div>
  );
}

export default Header;
