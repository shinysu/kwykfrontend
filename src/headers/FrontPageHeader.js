import React from 'react';
import '../static/css/header.css';
import knowbotSVG from '../static/images/knowbotpng.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import * as constant from '../components/Constants'
import { useHistory } from "react-router-dom";
import * as utils from '../utils/jsutils'

function Header(props){
  let session = "";
  let tagline ="";
  let fontSize = "1em"
  let username="";
  session = sessionStorage.getItem('session_name');
  if(session === 'undefined'){
    session = ''
  }
  if(sessionStorage.getItem('username')){
    username = sessionStorage.getItem('username');
  }
  if(props.topic){
    tagline = 'about '+utils.convertToCamelCase(props.topic)
    fontSize = "1em"
  }

  return(
    <div className="row headercontainer">
        <div className="col-12">
          <div className="row window-color">
            <div className="col-2 headerfont">
              <img src={knowbotSVG} className="knowbotlogo" alt="logo" />
            </div>
            <div className="col-md-10 col-10 headerfont">
              <div className="row title">
                Build Your Skills
              </div>
              <div className="row subtitle">
                Assess your Python Skills
              </div>
            </div>
          </div>
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
  function handleFeedback() {
      history.push({
        pathname:`/feedback`
      });
    }
  function handleAbout() {
    history.push({
      pathname:`/about`
    });
  }
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <i className="fas fa-ellipsis-v ellipsisbutton"
       style={{color:constant.blackColor,
                backgroundColor: constant.whiteColor,
                paddingTop: "2vh"}}>
    </i>
  </a>
));

  return (
  <Dropdown style={{backgroundColor: constant.whiteColor}}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size="sm" title="">
          <Dropdown.Item href="#" onClick={handleAbout} className="ellipsismenu">About Us</Dropdown.Item>
          <Dropdown.Item href="#" onClick={handleFeedback} className="ellipsismenu">FeedBack</Dropdown.Item>
          <Dropdown.Item href="#" onClick={handleLogout} className="ellipsismenu">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

  );

}
