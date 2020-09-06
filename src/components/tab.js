import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  background: ${props => props.tabcolor};
  font-family: "Lucida Console", Monaco, monospace;
  height: 3em;
  width:100%;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 50%;
  position: relative;
  background: ${props => props.tabcolor};

  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  color: ${props => (props.active ? "#7bc143" : "black")};
  height: ${props => (props.active ? "2.6em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    color: #7bc143;
  }
`;
export const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;
