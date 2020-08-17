import React from 'react';
import '../static/css/header.css';
import knowbotSVG from '../static/images/knowbotSVG.svg';
import verticalellipsis from '../static/images/verticalellipsis.png';

function Header(){
  return(
    <div className="row">
        <div className="col-sm-2 white">
            <img src={knowbotSVG} className="knowbotlogo" alt="logo" />
        </div>
        <div className="col-sm-9  white headerfont">KWYK </div>
        <div className="col-sm-1 white">
            <button type="button" className="btn btn-default btn-sm ellipsisbutton" aria-label="Left Align">
                    <img src={verticalellipsis} className="ellipsislogo" alt="vertical ellipsis" />
            </button>
        </div>
    </div>
  );
}

export default Header;
