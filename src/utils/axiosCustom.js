import axios from 'axios';

const axiosCustom = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosCustom;
