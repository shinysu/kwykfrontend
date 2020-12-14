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
  let history = useHistory();
  function handleLogout() {
    sessionStorage.clear();
    history.push({
      pathname:`/`
    });
  }
  return(
    <div className="row white">
        <img src={knowbotSVG} className="knowbotlogo white" alt="logo" />
        <div className="col-sm-9  white headerfont">
        <div className="row kwykheader">KWYK - Know what you know !</div>
        <div className="row sessionname">{session}</div>
        </div>
        <Dropdown className="white">
          <Dropdown.Toggle className="ellipsisbutton" id="dropdown-basic"
          style={{backgroundColor: constant.whiteColor}}>
            <img src={verticalellipsis} className="ellipsislogo" alt="vertical ellipsis" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={handleLogout} className="ellipsismenu">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  );
}

export default Header;
