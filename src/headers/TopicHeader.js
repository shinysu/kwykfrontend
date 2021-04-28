import React from 'react';
import * as utils from '../utils/jsutils';


function TopicHeader(props){
  const username = sessionStorage.getItem('username');
  return(
    <div className="row headercontainer grey">
      <div className="col-12 grey">
        <span className="topic-label"> Topic:</span>
        <span className="topic-label"> {utils.convertToCamelCase(props.subtopic)}</span>
      </div>
    </div>
  );
}

export default TopicHeader;
