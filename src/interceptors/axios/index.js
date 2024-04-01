import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
      config.headers["Content-Type"] = "application/json";
      config.baseURL = process.env.REACT_APP_SERVER_URL;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    if (
      response.data.status === 200 &&
      response.data.result.access_token &&
      response.data.result.user
    ) {
      localStorage.setItem("user", JSON.stringify(response.data.result.user));
      localStorage.setItem(
        "token",
        `Bearer ${response.data.result.access_token}`
      );
    }
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data.status === 401 &&
      error.response.data.errors === "Token inválido!"
    ) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axios;
