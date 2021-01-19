import React from "react";
import '../static/css/chat.css';

function UserHeader() {
  const username = sessionStorage.getItem('username');
  return(
    <div className="row headercontainer timer-row">
        <div className="col-9">
          {username}
        </div>
    </div>
  );
}

export default UserHeader;
