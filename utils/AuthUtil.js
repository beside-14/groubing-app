import axios from "axios";

const defaultUrl = "http://172.29.19.76:8080";
const loginApiUrl = "/api/members/login";

//로그인 API
export const login = async (loginData) => {
  try {
    const param = {
      email: loginData.id,
      password: loginData.pw,
    };
    const response = await axios.post(defaultUrl + loginApiUrl, param);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//이메일 인증
export const emailAuth = async (email) => {
  try {
    const param = {
      email: email,
    };
    const response = await axios.post(defaultUrl, param);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userInfo) => {
  const response = await axios.post("api url", userInfo);
  return response.data;
};
