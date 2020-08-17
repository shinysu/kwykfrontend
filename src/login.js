import React from 'react';
import knowbotSVG from './components/static/knowbotSVG.svg';
import './components/static/css/login.css';

function Login(){
  return(
    <div className="container ">
      <div className="row ">
          <div className="col-sm-2 "></div>
          <div className="col-sm-8 window-color">
            <img src={knowbotSVG} className="login-logo center" alt="logo" />
          </div>
          <div className="col-sm-2 "></div>
      </div>
      <div className="row ">
          <div className="col-sm-2 "></div>
          <div className="col-sm-8 window-color title">
              KWYK
          </div>
          <div className="col-sm-2 "></div>
      </div>
    </div>
  );
}

export default Login;
