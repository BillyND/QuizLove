import axios from "./customAxios";

// Auth
export const postRegister = ({ email, username, password }) => {
  return axios.post("auth/register", {
    email,
    username,
    password,
  });
};

export const postLogin = (email, password) => {
  return axios.post("auth/login", { email, password });
};

export const getAllAccount = () => {
  return axios.get("auth/account");
};

export const postLogout = () => {
  return axios.post("auth/logout");
};
