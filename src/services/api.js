import { infoUserSubs } from "../components/Header/Header";
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
  return axios.post("folders/", { name, description }, tokenHeaders());
};

export const getFolderByCondition = ({
  folderId = "",
  isDeleted = false,
  isHidden = false,
  page = 1,
  limit = 100,
  emailAuthor = infoUserSubs?.state?.email,
}) => {
  return axios.get(
    `folders?folderId=${folderId}&isDeleted=${isDeleted}&isHidden=${isHidden}&page=${page}&limit=${limit}&emailAuthor=${emailAuthor}`,
    tokenHeaders()
  );
};

// <=====COURSES=====> //
export const updateDraftCourse = (draftCourse) => {
  return axios.post("courses/draft", draftCourse, tokenHeaders());
};

export const getDraftCourse = () => {
  return axios.get("courses/draft", tokenHeaders());
};

export const createCourse = (data) => {
  return axios.post("courses/", data, tokenHeaders());
};
