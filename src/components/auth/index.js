import store from 'store2';
import React, { Component } from 'react';
import {login} from '../../api/auth';
import moment from 'moment';
const getParameterByName = (name, url)=> {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const client_secret = "50cdc33cc501f6ef3a149c56ad92ffeb";
const redirect_uri  = "https://sunburn21.github.io/auth";
const client_id = '83c9543d85c56057657533b11640f5e3';
class Auth extends Component {
  componentDidMount = async () => {
    const authcode = await getParameterByName('code');   
      const result = await login({authcode,client_secret,client_id,redirect_uri});
        if(result.success){
          await store.set('authToken', result.response.data.result.data.access_token);
          await store.set('refauthToken', result.response.data.result.data.refresh_token); 
          await store.set('tokentime',moment());
          console.log(result.response.data.result.data);         
          await this.props.data.authUser();
        }
          if(!this.props.data.state.user) this.props.history.push('/login');
          this.props.history.push('/');    
  };

  render() {
    return null;
  }
}

export default (data) => (props) =>
  <Auth data={data} {...props} />;
