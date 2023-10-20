import axios, { getAccessToken } from "./customAxios";

// <=====Trigger header token=====> //
export const getTriggerToken = async () => {
  return await axios.get("trigger");
};

const tokenHeaders = () => {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

// <=====AUTH=====> //
export const postRegister = ({ email, username, password }) => {
  return axios.post(
    "auth/register",
    {
      email,
      username,
      password,
    },
    tokenHeaders()
  );
};

export const postLogin = ({ email, password }) => {
  return axios.post("auth/login", { email, password }, tokenHeaders());
};

export const getAllAccount = () => {
  return axios.get("auth/account", tokenHeaders());
};

export const postLogout = () => {
  return axios.post("auth/logout", tokenHeaders());
};

// <=====FOLDERS=====> //
export const createFolder = ({ name, description }) => {
  return axios.post("folders/create", { name, description }, tokenHeaders());
};

export const getFolderByCondition = ({
  folderId = null,
  isDeleted = false,
  isHidden = false,
  page = 1,
  limit = 100,
}) => {
  return axios.get(
    `folders?folderId=${folderId}&isDeleted=${isDeleted}&isHidden=${isHidden}&page=${page}&limit=${limit}`,
    tokenHeaders()
  );
};
