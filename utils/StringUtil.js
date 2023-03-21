import { Alert } from "react-native";

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};

export const validateEmail = (email) => {
  const strimEmail = removeWhitespace(email);
  const regex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
};

export const validatePassword = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
  return regex.test(pwd);
};

export const alert = (title, msg) => {
  Alert.alert(title, msg, [
    {
      text: "OK",
      Onpress: () => console.log("OK Pressed"),
    },
  ]);
};
