import React from "react";
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from "re-resizable";


function ShowWordCloud(props) {
  if(props.data.length > 0){
    const words = props.data;
    const options = {
      content: {
        allowNumbers: false,
        maxWords: 20,
        stemmer: null,
        stopwordsInput: '',
        },
      fontSizes: [20, 70],
      rotations: 3,
      rotationAngles: [0, 0],
      padding: 3,
      backgroundColor:"#ffffff"
    }
    const resizeStyle = {
      background: "#ede2d5",
      width:'70%',
      height: '100%',
      marginLeft: '15%',
      marginRight: '15%',
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
