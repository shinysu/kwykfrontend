import React from 'react';
import '../static/css/header.css';
import knowbotSVG from '../static/images/knowbotSVG.svg';
import verticalellipsis from '../static/images/verticalellipsis.png';

function Header(){
  let session = "";
  session = sessionStorage.getItem('session_name');
  return(
    <div className="row white">
        <img src={knowbotSVG} className="knowbotlogo white" alt="logo" />
        <div className="col-sm-9  white headerfont">
        <div className="row kwykheader">KWYK - Know what you know !</div>
        <div className="row sessionname">{session}</div>
        </div>
        <button type="button" className="btn btn-default btn-sm ellipsisbutton" aria-label="Left Align">
                    <img src={verticalellipsis} className="ellipsislogo" alt="vertical ellipsis" />
        </button>

    </div>
  );
}

export default Header;
