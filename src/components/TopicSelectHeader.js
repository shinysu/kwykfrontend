import React,{ useState }  from "react";
import '../static/css/header.css';
import '../static/css/admin.css';

function TopicSelectHeader(props){
  console.log("TopicHeader");
  const [selectedValue, setSelectedValue] = useState(props.selectedValue);
  const topics=props.topics;
  function handleChange(e){
    setSelectedValue(e.target.value);
    props.getSelectedValue(e.target.value);
  }
  return(
    <div className="row green">
    <label className="green topic-label"> TOPIC: </label>
    <select className="topic-select" onChange={handleChange} defaultValue={'default'} value={selectedValue}>
      <option value="default">Choose a topic..</option>
      {topics.map((topic,index) => <option key={index} > {topic} </option>)}
    </select>
    </div>
  );
}

export default TopicSelectHeader;
