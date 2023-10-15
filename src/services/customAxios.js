import axios from "axios";
const baseURL = "https://quiz-love-be.vercel.app/";
// const baseURL = "http://127.0.0.1:8080/";
const NO_RETRY_HEADER = "x-no-retry";

const instance = axios.create({
  baseURL: baseURL + "v1/api/",
});

// Apply access_token in LS to header
instance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

// Handle refresh Token
const handleRefreshToken = async () => {
  const refreshLocal = localStorage.getItem("refresh_token");
  const res = await instance.post("/v1/api/auth/refresh", { refreshLocal });
  if (res && res.data) {
    return res.data;
  } else return;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },

  // Error with LS refresh token
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      // Condition to avoid infinite retries
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const data = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (data && data.accessToken && data.refreshToken) {
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);
        return instance.request(error.config);
      } else return;
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/v1/api/auth/refresh"
    ) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
