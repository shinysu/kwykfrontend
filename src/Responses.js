import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab, Content } from "./components/tab";

function Responses() {
  const [active, setActive] = useState(0);
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div className="App">
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Content1
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          Content2
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <h1>Content 1</h1>
        </Content>
        <Content active={active === 1}>
          <h1>Content 2</h1>
        </Content>
      </>
    </div>
  );
}

export default Responses;
