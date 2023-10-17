import axios from "axios";
const baseURL = "https://quiz-love-be.vercel.app/";
// const baseURL = "http://127.0.0.1:8080/";
const NO_RETRY_HEADER = "x-no-retry";

let instance = axios.create({
  baseURL: baseURL + "v1/api/",
});

// Handle refresh Token
const handleRefreshToken = async () => {
  const refreshLocal = localStorage.getItem("refreshToken");
  const res = await instance.post("/v1/api/auth/refresh", { refreshLocal });
  if (res && res.data) {
    return res.data;
  } else return;
};

const accessToken = JSON.parse(localStorage?.getItem("infoUser"))?.accessToken;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Apply accessToken in LS to header
    instance.defaults.headers.common = {
      Authorization: `Bearer ${accessToken}`,
    };
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
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return instance.request(error.config);
      } else return;
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/v1/api/auth/refresh"
    ) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
