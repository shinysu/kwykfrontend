import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../headers/KwykHeader";
import SessionHeader from "../headers/SessionHeader";
import '../static/css/error.css';

function Page404() {
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <Display404 />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}
function Display404() {
  return(
    <div className='error'>
       <h2><div className='message'>Error: 404 - Page not found</div></h2>
       <Link to='/'>
       <div className='link'>Home</div>
       </Link>
    </div>
  );
}

export default Page404;
