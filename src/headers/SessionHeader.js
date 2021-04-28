import React from "react";
import '../static/css/chat.css';

function SessionHeader() {
  let username = '';
  let session = '';
  if(sessionStorage.getItem('session_name')){
    session = sessionStorage.getItem('session_name');
  }
  
  return(
    <div className="row headercontainer">
        <div className="col-12 userheader">
          {session}
        </div>
    </div>
  );
}

export default SessionHeader;
