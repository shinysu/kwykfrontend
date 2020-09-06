import { useState, useEffect } from "react";
import '../static/css/header.css';

const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    useEffect(() => {
      const time = setInterval(setTime, 1000);
        return () => {
          clearInterval(time);
          //props.getTime(minutes,seconds);
        }
    },[seconds]);

    function setTime(){
      setSeconds(seconds + 1);
      if(seconds === 59){
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }

    return(
        [minutes,seconds]
    );
}

export default useTimer;
