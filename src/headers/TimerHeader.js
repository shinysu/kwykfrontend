import React from 'react';
import '../static/css/header.css';
import clock from '../static/images/clock.png';


function TimerHeader(props){
  const time = props.time;
  const username = sessionStorage.getItem('username');
  return(
    <div className="row timer-row">
        {username}
        <img src={clock} className="clock-img" alt="logo" />
        {time[0]} : {time[1]}
    </div>
  );
}

export default TimerHeader;
