import axios from "axios";

export const login = async (loginData) => {
  const response = await axios.post("api url", loginData);
  return response.data;
};

export const signUp = async (userInfo) => {
  const response = await axios.post("api url", userInfo);
  return response.data;
};
