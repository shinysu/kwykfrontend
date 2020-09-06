import React,{useState} from 'react';
import knowbotSVG from './static/images/knowbotSVG.svg';
import './static/css/login.css';
import { Tabs, Tab, Content } from "./components/tab";
import * as constant from './components/constants'
import usePost from "./components/postData";
import useFetch from "./components/getData"
import { useHistory, useLocation } from "react-router-dom";
var session = ""
function Login(){
  sessionStorage.clear()
  const location = useLocation();
  session = location.search.split('=')[1]
  return(
    <div className="container">
      <DisplayIcon />
      <DisplayTitle />
      <LoginTab />
    </div>
  );
}

export default Login;

function DisplayIcon() {
  return(
    <div className="row ">
        <div className="col-sm-2 "></div>
        <div className="col-sm-8 window-color">
          <img src={knowbotSVG} className="login-logo center" alt="logo" />
        </div>
        <div className="col-sm-2 "></div>
    </div>
  );
}

function DisplayTitle() {
  return(
    <div className="row ">
        <div className="col-sm-2 "></div>
        <div className="col-sm-8 window-color title">
            KWYK - Know what you know !
        </div>
        <div className="col-sm-2 "></div>
    </div>
  );
}

function LoginTab(props){
  const [active, setActive] = useState(0);
  const handleClick = e => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return(
    <div className="row ">
      <div className="col-sm-2 "></div>
        <div className="col-sm-8 window-color logintab">
    <div className="tab-color">
      <Tabs tabcolor={constant.loginTabColor}>
        <Tab onClick={handleClick} active={active === 0} id={0} tabcolor={constant.loginTabColor}>
          SignIn
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1} tabcolor={constant.loginTabColor}>
          SignUp
        </Tab>
      </Tabs>
      <>
        <Content active={active === 0}>
          <SignInForm />
        </Content>
        <Content active={active === 1}>
          <SignUpForm />
        </Content>
      </>
    </div>
    </div>
    <div className="col-sm-2 "></div>
</div>
  );
}

function SignInForm() {
  console.log("SignInForm");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage,setLoginMessage] = useState("");
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("going");
    const message = <ValidateUser email={email} password={password}/>
    setLoginMessage(message);
    console.log("loginMessage=",loginMessage);
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleClick() {
    history.push({
      pathname:`/reset`
    });
  }
  return(
    <form className="loginform" onSubmit={handleSubmit}>
      <input type="text" name="email" className="text" placeholder="email" onChange={handleEmail} required/><br/>
      <input type="password" name="password" className="text" placeholder="password"
        onChange={handlePassword} required/><br/>
      <a href='#' className="link" onClick={handleClick}><span className="reset">Forgot password?</span></a>
      <div style={{backgroundColor:"#ffffff"}} className="text" visible="false"></div>
      <label >{loginMessage}</label>
      <input type="submit" value="Sign In" className="signin"/>
    </form>
  );
}

function SignUpForm() {
  console.log("SignUpForm");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage,setLoginMessage] = useState("");
  function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();
    const message = <CreateNewUser username={userName} email={email} password={password}/>
    setLoginMessage(message);
  }
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  return(
    <form className="loginform" onSubmit={handleSubmit}>
      <input type="text" id="username" name="username" className="text"
        placeholder="username" onChange={handleUserName}/><br/>
      <input type="text" name="email" className="text" placeholder="email" onChange={handleEmail}/><br/>
      <input type="password" name="password" className="text" placeholder="password" onChange={handlePassword}/><br/>
      <label >{loginMessage}</label>
      <input type="submit" value="Sign Up" className="signin"/>
    </form>
  );
}

function ValidateUser(props) {
  console.log("ValidateUser");
  const url = constant.loginURL;
  let loginMessage = '';
  let sessionName = '';
  let history = useHistory();
  const dataText = { "email": props.email, "password": props.password, "session": session, "action": "signin"}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const response = fetchResponse.data;
  if(response['status'] === "password mismatch"){
    loginMessage = "Incorrect Password";
  }
  else if(response['status'] === "user not found"){
    loginMessage = "Email id is not registered!";
  }
  else{
    loginMessage = "Signed in Successfully!";
    console.log(response);
    sessionName = response['session_name'];
    const userName = response['username'];
    console.log(userName);
    setSessionStorage(userName, props.email, session, sessionName);
    console.log("sessionStorage=",sessionStorage);
    history.push({
      pathname:`/topics`,
      state:{
        username: userName,
        useremail: props.email
      }
    });
  }
  console.log("here=",loginMessage);
  return(`${loginMessage}`)
}

function CreateNewUser(props) {
  console.log("CreateNewUser");
  const url = constant.loginURL;
  let loginMessage ='';
  let sessionName = '';
  const dataText = { "username":props.username, "email": props.email, "password": props.password,
    "session": session, "action": "signup"}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null});
  let history = useHistory();
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const response = fetchResponse.data;
  if (response['status'] === 'inserted'){
    sessionName = response['session_name'];
    loginMessage = "Signed Up Successfully!";
    setSessionStorage(props.username, props.email, session, sessionName);
    history.push({
      pathname:`/topics`,
      state:{
        username: props.username,
        useremail: props.email
      }
    });
  }
  else if(response['status'] === 'duplicate'){
    loginMessage = "Email id is already registered"
  }
  return(`${loginMessage}`)
}

function setSessionStorage(username, useremail, session, session_name) {
  sessionStorage.setItem('username', username)
  sessionStorage.setItem('useremail', useremail)
  if(typeof(session) !== 'undefined'){
    sessionStorage.setItem('session', session);
    sessionStorage.setItem('session_name', session_name);
  }
}
