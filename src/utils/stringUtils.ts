export const removeWhitespace = (text: string) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};

export const validateEmail = (email: string) => {
  const strimEmail = removeWhitespace(email);
  const regex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regex.test(email);
};

export const validatePassword = (pwd: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
  return regex.test(pwd);
};

// export const alert = (title: string, msg: string) => {
//   Alert.alert(title, msg, [
//     {
//       text: "OK",
//       onPress: () => console.log("OK Pressed"),
//     },
//   ]);
// };
