import { login } from "../../utils/AuthUtil";
import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [microcopy, setMicrocopy] = useState("");

  async function handleLogin() {
    setMicrocopy("");

    if (id.trim() === "") {
      setMicrocopy("아이디가 입력되지 않았습니다.");
    } else if (pw.trim() === "") {
      setMicrocopy("비밀번호가 입력되지 않았습니다.");
      // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      //   setMicrocopy("이메일 형식이 올바르지 않습니다.");
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
        //   setId("");
        //   setPw("");
        //   navigation.navigate("Home");
        // } else {
        //   setMicrocopy(
        //     "아이디 또는 비밀번호가 일치하지 않습니다. 입력하신 내용을 다시 확인해 주세요."
        //   );
        //   setId("");
        //   setPw("");
        // }

        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        setMicrocopy("서버와의 연결이 원활하지 않습니다.");
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="labelLarge">ID</Text>
        <TextInput onChangeText={(id) => setId(id)} value={id} />
        <Text variant="labelLarge">비밀번호</Text>
        <TextInput
          textContentType="password"
          onChangeText={(pw) => setPw(pw)}
          value={pw}
          secureTextEntry={true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("FindId")}
            style={{ flex: 1, marginRight: 8 }}
          >
            아이디 찾기
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("FindPw")}
            style={{ flex: 1, marginRight: 8 }}
          >
            비밀번호 찾기
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("SignUp")}
            style={{ flex: 1, marginRight: 8 }}
          >
            회원가입
          </Button>
        </View>
        {microcopy ? (
          <Text variant="labelLarge" style={{ color: "red", marginTop: 8 }}>
            {microcopy}
          </Text>
        ) : null}
        <Button
          mode="Contained"
          onPress={() => handleLogin()}
          buttonColor="black"
          textColor="white"
          style={{ marginTop: 8 }}
        >
          로그인
        </Button>
        <Button
          mode="Contained"
          icon="image"
          buttonColor="gray"
          textColor="white"
          style={{ marginTop: 40 }}
        >
          Kakao
        </Button>
        <Button
          mode="Contained"
          icon="image"
          buttonColor="gray"
          textColor="white"
          style={{ marginTop: 8 }}
        >
          Naver
        </Button>
        <Button
          mode="Contained"
          icon="image"
          buttonColor="gray"
          textColor="white"
          style={{ marginTop: 8 }}
        >
          Apple
        </Button>
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
});
