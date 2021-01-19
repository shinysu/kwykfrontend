import React,{useState} from 'react';
import knowbotSVG from '../static/images/knowbotSVG.svg';
import '../static/css/login.css';
import { Tabs, Tab, Content } from "../utils/Tab";
import * as constant from '../utils/Constants'
import usePost from "../hooks/usePost";
import { Link, useHistory, useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
var session = ""

function Login() {
  const location = useLocation()
  if(sessionStorage.getItem('useremail') != null){
    return <Redirect />;
  }
  else{
    return <DisplayLogin />
  }
}

function DisplayLogin(){
  //sessionStorage.clear()
  const location = useLocation();
  const sessionPath = window.location.href.split('?session=')[1]
  if(typeof(sessionPath) !== 'undefined'){
    session = sessionPath.split('/')[0]
  }
  return(
    <div className="container">
      <DisplayIcon />
      <DisplayTitle />
      <LoginTab />
      <DisplayAlert />
    </div>
  );
}

export default Login;

function DisplayIcon() {
  return(
    <div className="row ">
        <div className="col-md-2 "></div>
        <div className="col-md-8 window-color">
          <img src={knowbotSVG} className="login-logo center" alt="logo" />
        </div>
        <div className="col-md-2 "></div>
    </div>
  );
}

function DisplayTitle() {
  return(
    <div className="row ">
        <div className="col-md-2 "></div>
        <div className="col-md-8 window-color title">
            KWYK - Know what you know !
        </div>
        <div className="col-md-2 "></div>
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
      <div className="col-md-2 "></div>
        <div className="col-md-8 window-color logintab">
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
    <div className="col-md-2 "></div>
</div>
  );
}

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage,setLoginMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const message = <ValidateUser email={email} password={password}/>
    setLoginMessage(message);
    setEmail("")
    setPassword("")
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  return(
    <form className="loginform" onSubmit={handleSubmit}>
      <input type="text" name="email" className="text" placeholder="email"
      value={email} onChange={handleEmail} required/><br/>
      <input type="password" name="password" className="text" placeholder="password"
        value={password} onChange={handlePassword} required/><br/>
      <label className="text">{loginMessage}</label>
      <input type="submit" value="Sign In" className="signin"/>
      <Link to='/reset'>
      <div className='link reset'>Forgot password?</div>
      </Link>
    </form>
  );
}

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage,setLoginMessage] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const message = <CreateNewUser username={userName} email={email} password={password}/>
    setLoginMessage(message);
    setUserName("")
    setEmail("")
    setPassword("")
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
      <input type="text" id="username" name="username" className="text" value={userName}
        placeholder="username" onChange={handleUserName} required/><br/>
      <input type="text" name="email" className="text" placeholder="email"
      value={email} onChange={handleEmail} required/><br/>
      <input type="password" name="password" className="text" placeholder="password"
      value={password} onChange={handlePassword} required/><br/>
      <label className="text">{loginMessage}</label>
      <input type="submit" value="Sign Up" className="signin"/>
    </form>
  );
}

function ValidateUser(props) {
  const url = constant.loginURL;
  let loginMessage = '';
  let sessionName = '';
  const dataText = { "email": props.email, "password": props.password, "session": session, "action": "signin"}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const response = fetchResponse.data;

  if(response['status'] === "password mismatch"){
    loginMessage = "Incorrect Password";
    sessionStorage.setItem('loginmessage', loginMessage);
    window.location.reload();
  }
  else if(response['status'] === "user not found"){
    loginMessage = "Email id is not registered!";
    sessionStorage.setItem('loginmessage', loginMessage);
    window.location.reload();
  }
  else{
    loginMessage = "Signed in Successfully!";
    sessionName = response['session_name'];
    const userName = response['username'];
    const is_admin = response['is_admin'];
    setSessionStorage(userName, props.email, session, sessionName, is_admin);
    return <Redirect />
  }
  return(``);
}

function CreateNewUser(props) {
  const url = constant.loginURL;
  let loginMessage ='';
  let sessionName = '';
  const dataText = { "username":props.username, "email": props.email, "password": props.password,
    "session": session, "action": "signup"}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null, error: null});
  if (fetchResponse.error){
    return <DisplayAlert message={fetchResponse.error} />
  }
  else if ( fetchResponse.isLoading) {
    return 'Loading...';
  }
  const response = fetchResponse.data;
  if (response['status'] === 'inserted'){
    sessionName = response['session_name'];
    const is_admin = false;
    loginMessage = "Signed Up Successfully!";
    setSessionStorage(props.username, props.email, session, sessionName, is_admin);
    return <Redirect />
  }
  else if(response['status'] === 'duplicate'){
    loginMessage = "Email id is already registered"
    sessionStorage.setItem('loginmessage', loginMessage);
    window.location.reload();
  }
  return(``)
}

function setSessionStorage(username, useremail, session, session_name, is_admin) {
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('useremail', useremail);
  sessionStorage.setItem('is_admin', is_admin);
  if(session){
    sessionStorage.setItem('session', session);
    sessionStorage.setItem('session_name', session_name);
  }
  sessionStorage.removeItem('loginmessage');
}

function DisplayAlert() {
  if(sessionStorage.getItem('loginmessage') != null){
    let message = sessionStorage.getItem('loginmessage')
    return(
      <div className="row ">
        <div className="col-md-2 "></div>
        <div className="col-md-8 window-color">
        <Alert variant='danger' className='alert'>
          {message}
          </Alert>
        </div>
        <div className="col-md-2 "></div>
      </div>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}

function initializeSessionStorage(topic, subtopic) {
  sessionStorage.setItem('topic', topic);
  sessionStorage.setItem('subtopic', subtopic);
  sessionStorage.setItem('attempted', 0);
  sessionStorage.setItem('skipped', 0);
  sessionStorage.setItem('minutes', 0);
  sessionStorage.setItem('seconds', 0);
  sessionStorage.setItem('userResponses', JSON.stringify({}));
  sessionStorage.setItem('retry', false);
}

function getTopicFromURL(destination) {
  let topic, subtopic;
  const urlSplit = destination.split('/');
  if(urlSplit[urlSplit.length - 3] === 'chat'){
    topic = urlSplit[urlSplit.length - 2]
    subtopic = urlSplit[urlSplit.length - 1]
  }
  return {'topic':topic, 'subtopic': subtopic}
}

function getDestinationScreen(destination) {
  const urlSplit = destination.split('/');
  if(urlSplit[urlSplit.length - 1] === 'admin'){
    return 'admin';
  }
  else if(urlSplit[urlSplit.length - 3] === 'chat') {
    return 'chat';
  }
  return null;
}

function Redirect() {
  let history = useHistory();
  const location = useLocation()
  let destination;
  if(location.query){
    destination = location.query.destinationPath;
    const screenname = getDestinationScreen(destination);
    if (screenname == 'chat'){
      const topicDetail = getTopicFromURL(destination);
      const topic = topicDetail['topic'];
      const subtopic = topicDetail['subtopic'];
      initializeSessionStorage(topic, subtopic);
    }
  }
  else{
    destination = `/topics`;
  }
  history.push({
      pathname:destination
  });
  return null;
}
