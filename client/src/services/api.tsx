import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/"
});

api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error)
  }
);

export default api;
