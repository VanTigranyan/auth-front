import axios from 'axios';

import { BASE_URL } from './api';

const token = 'Bearer ' + localStorage.getItem('auth-token');
axios.defaults.baseURL = BASE_URL;

const axiosInst = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': token
  }
})

axiosInst.defaults.headers.post['Content-Type'] = 'application/json';


export default axiosInst;
