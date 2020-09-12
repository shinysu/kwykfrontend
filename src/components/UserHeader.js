import React from "react";
import '../static/css/chat.css';

function UserHeader() {
  const username = sessionStorage.getItem('username');
  return(
    <div className="row timer-row green">
        <div className="col-sm-9 green userheader">
          {username}
        </div>
    </div>
  );
}

export default UserHeader;
