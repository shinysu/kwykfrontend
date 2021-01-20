import React from 'react';
import Header from "../headers/KwykHeader";
import UserHeader from "../headers/UserHeader";
import '../static/css/error.css';

function Error() {
  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 chatcolor">
            <Header />
            <UserHeader/>
            <DisplayError />
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}
function DisplayError() {
  return(
    <div className='error'>
       <h4><div className='message'>Wrong topic or subtopic. Please check your URL!</div></h4>
    </div>
  );
}

export default Error;
