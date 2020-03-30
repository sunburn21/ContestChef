import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.codechef.com',
  timeout: 5000,
  headers: {}
});

export default instance;