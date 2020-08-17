import React from 'react';
import '../static/css/header.css';
import clock from '../static/images/clock.png';


function TimerHeader(props){
  console.log("TimerHeader");
  const time = props.time;
  return(
    <div className="row timer-row">
        <div className="col-sm-9 green"></div>
            <div className="col-sm-1 green">
                    <img src={clock} className="clock-img" alt="logo" />
            </div>
            <div className="col-sm-2 timer">
                    {time[0]} : {time[1]}
            </div>
    </div>
  );
}

export default TimerHeader;
