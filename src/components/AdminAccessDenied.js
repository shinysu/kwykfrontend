import React from 'react';
import Header from "../headers/KwykHeader";
function AdminAccessDenied() {
  return(
    <div className="container">
      <div className="row">
        <Header/>
        <DisplayError />
      </div>
    </div>
  );
}

export default AdminAccessDenied;

function DisplayError() {
  return(
    <div className='adminerror'>
       <h4><div className='adminmessage'>Admin Access Denied</div></h4>
    </div>
  );
}
