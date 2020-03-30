import React from "react";
import axios from 'axios';
import "./index.css";
import {login} from '../../api/auth';
const client_id =  '83c9543d85c56057657533b11640f5e3'
const url = "https://api.codechef.com/oauth/authorize?response_type=code&client_id="+client_id+"&state=xyz&redirect_uri=https://sunburn21.github.io//auth";
const loginone = ()=>{
  window.location.href=url; 
  return false;
}

const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">ContestChef</h1>
      <p>Companion to your CodeChef</p>
      {/* <button className="box-layout__button" onClick={startLogin}> */}
      {/* <a href="yourLink"  target="popup"  onclick="window.open('yourLink','popup','width=600,height=600,scrollbars=no,resizable=no'); return false;"></a> */}
      <button className="box-layout__button" onClick={loginone} >
        Login with Codechef.
      </button>
    </div>
  </div>
);

export default LoginPage;