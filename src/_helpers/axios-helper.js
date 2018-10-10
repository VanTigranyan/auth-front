import axios from 'axios';

const token = 'Bearer ' + localStorage.getItem('auth-token');
axios.defaults.baseURL = 'http://localhost:80/users';

const axiosInst = axios.create({
  baseURL: 'http://localhost:80/users',
  headers: {
    'Authorization': token
  }
})

axiosInst.defaults.headers.post['Content-Type'] = 'application/json';


export default axiosInst;
