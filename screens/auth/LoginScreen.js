import { login } from "../../utils/AuthUtil";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  async function handleLogin() {
    if (id.trim() === "") {
      Alert.alert("아이디 입력 확인", "아이디가 입력되지 않았습니다.");
    } else if (pw.trim() === "") {
      Alert.alert("비밀번호 입력 확인", "비밀번호가 입력되지 않았습니다.");
    } else {
      const loginData = {
        id: id,
        pw: pw,
      };

      try {
        // login api 로직

        // const response = await login(loginData);
        // console.log(response);
        // if (response.data !== null && response.data !== "") {
        //   Alert.alert("로그인 성공");
        // } else {
        //   Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인하세요.");
        //   setId("");
        //   setPw("");
        // }

        //로그인 성공 시 Home 화면 이동
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        Alert.alert("로그인 실패", "서버와의 연결이 원활하지 않습니다.");
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          onChangeText={(id) => setId(id)}
          value={id}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="비밀번호"
          onChangeText={(pw) => setPw(pw)}
          value={pw}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.buttonlogin}
          onPress={() => handleLogin()}
        >
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonlogin}
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginTop: 30,
    padding: 30,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "white",
  },
  buttonKakaoStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    margin: 5,
    justifyContent: "center",
  },
  buttonlogin: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "ivory",
    borderWidth: 0.5,
    margin: 5,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
});
