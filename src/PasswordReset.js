import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Header from "./components/kwykHeader";
import * as constant from './components/constants'
import usePost from "./components/postData";
function PasswordReset() {
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8 chatcolor">
            <Header />
            <br />
            <ResetArea />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default PasswordReset;

function ResetArea() {
  console.log("ResetArea");
  const [email, setEmail] = useState("");
  const [btnValue, setBtnValue] = useState("Reset Password");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdMessage,setPwdMessage] = useState("");
  let history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    let message = '';
    if(newPassword === confirmPassword){
      message = <ChangePwd email={email} password={newPassword}/>
      setPwdMessage(message);
      setBtnValue("Home")
    }
    else {
      message = "Password Mismatch";
      setPwdMessage(message);
    }
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleOldPassword(e) {
    setNewPassword(e.target.value);
  }
  function handleNewPassword(e) {
    setConfirmPassword(e.target.value);
  }
  function handleClick(e) {
    if(e.target.value == 'Home'){
      history.push({
          pathname:`/`,
      });
    }
  }
  return(
    <div className="pwdreset">
    <form className="loginform" onSubmit={handleSubmit}>
      <label className="pwdtext"> Change your password here...</label>
      <input type="text" name="email" className="text" placeholder="email id" onChange={handleEmail} required/><br/>
      <input type="password" name="password" className="text" placeholder="new password"
        onChange={handleOldPassword} required/><br/>
      <input type="password" name="password" className="text" placeholder="confirm password"
          onChange={handleNewPassword} required/><br/>
      <label className="pwdmessage">{pwdMessage}</label>
      <input type="submit" value={btnValue} className="pwdbtn" onClick={handleClick}/>
      </form>
    </div>
  );
}

function ChangePwd(props) {
  const url = constant.pwdResetURL;
  let message = '';
  let btnValue = '';
  let history = useHistory();
  const dataText = { "email": props.email, "password": props.password}
  const fetchResponse = usePost(url, dataText, {isLoading: true, data: null});
  if (!fetchResponse.data || fetchResponse.isLoading) {
    return 'Loading...';
  }
  const response = fetchResponse.data;
  if (response['status'] === 'success'){
        message = constant.pwdResetSuccessMsg;
  }
  else{
     message = constant.pwdResetFailedMsg;
  }
  return(`${message}`);
}

function getMessages() {
  return "hello";
}
