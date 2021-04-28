import React from "react";
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";


function ShowWordCloud(props) {
  if(props.data.length > 0){
    const words = props.data;
    const options = {
      content: {
        allowNumbers: false,
        maxWords: 50,
        stemmer: null,
        stopwordsInput: '',
        },
      fontSizes: [10, 60],
      rotations: 3,
      rotationAngles: [0, 0],
      padding: 3,
      backgroundColor:"#ffffff"
    }
    const resizeStyle = {
      background: "#ede2d5",
      width:'90%',
      height: '100%',
      marginLeft: '5%',
      marginRight: '5%'
    }
    return (
      <ReactWordcloud className="wordcloud" options={options} words={words} style={resizeStyle}/>
    );
  }
  else {
    return <div></div>
  }
}

export default ShowWordCloud;
