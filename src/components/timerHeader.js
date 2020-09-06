import React from 'react';
import '../static/css/header.css';
import clock from '../static/images/clock.png';


function TimerHeader(props){
  console.log("TimerHeader");
  const time = props.time;
  const username = sessionStorage.getItem('username');
  return(
    <div className="row timer-row">
        <div className="col-sm-9 green user">
          {username}
        </div>
            <div className="col-sm-1 green clock-div">
                    <img src={clock} className="clock-img" alt="logo" />
            </div>
            <div className="col-sm-2 timer clock-time">
                    {time[0]} : {time[1]}
            </div>
    </div>
  );
}

export default TimerHeader;
