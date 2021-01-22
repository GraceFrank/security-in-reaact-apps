import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: { Accept: "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = `Bearer ${user["token"]}`;
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location = "/";
    } else return Promise.reject(error);
  }
);

export default axiosInstance;
