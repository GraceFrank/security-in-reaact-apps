import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://gdoc.herokuapp.com/api/",
  headers: { Accept: "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user["x-auth-token"];
    if (token) {
      config.headers["x-auth-token"] = token;
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
