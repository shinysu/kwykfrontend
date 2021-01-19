import React from 'react';
import '../static/css/header.css';
import clock from '../static/images/clock.png';


function TimerHeader(props){
  const time = props.time;
  const username = sessionStorage.getItem('username');
  return(
    <div className="row headercontainer timer-row">
      <div className="col-8">
        {username}
      </div>
      <div className="col-4">
        <img src={clock} className="clock-img" alt="logo" />
        {time[0]} : {time[1]}
      </div>
    </div>
  );
}

export default TimerHeader;
