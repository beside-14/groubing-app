// import { login } from "../../utils/AuthUtil";
import React, { useState } from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
// import KakaoIcon from "../../assets/icon/button/kakao_icon.png";
// import GoogleIcon from "../../assets/icon/button/google_icon.png";
// import AppleIcon from "../../assets/icon/button/apple_icon.png";

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
        //console.error(error.response.data); // 오류 메시지 출력
        const errorMessage = error?.response?.data?.message; // 오류 메시지 추출
        setMicrocopy(errorMessage); // 사용자에게 오류 메시지 보여주기
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor="#3A8ADB" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.mainText}>GROUBING</Text>
          <Text style={styles.subText}>우리 모두 그루버해요!</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>아이디(이메일)</Text>
              <TextInput
                onChangeText={(id) => setId(id)}
                value={id}
                style={styles.textInput}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>비밀번호</Text>
              <TextInput
                textContentType="password"
                onChangeText={(pw) => setPw(pw)}
                value={pw}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => handleLogin()}
            >
              <Text style={styles.loginBtnTxt}>로그인</Text>
            </TouchableOpacity>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.subBtn}
                onPress={() => navigation.navigate("FindId")}
              >
                <Text style={styles.subBtnTxt}>아이디 찾기</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                style={styles.subBtn}
                onPress={() => navigation.navigate("FindPw")}
              >
                <Text style={styles.subBtnTxt}>비밀번호 찾기</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity
                style={styles.subBtn}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.subBtnTxt}>회원가입</Text>
              </TouchableOpacity>
            </View>
            {microcopy ? (
              <Text style={{ color: "red", marginTop: 8 }}>{microcopy}</Text>
            ) : null}
          </View>

          <Text style={styles.snsText}>SNS 계정으로 로그인하기</Text>

          {/* <View style={styles.snsBtnContainer}>
            <TouchableOpacity style={styles.snsBtn}>
              <Image source={GoogleIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snsBtn}>
              <Image source={AppleIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snsBtn}>
              <Image source={KakaoIcon} />
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#3A8ADB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  mainText: {
    fontFamily: "Montserrat_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 50,
    letterSpacing: 1.6,
    textAlign: "center",
    color: "#FFFFFF",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 110,
  },
  subText: {
    fontFamily: "NotoSansKR_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: 0.04,
    color: "#FFFFFF",
    opacity: 0.75,
    marginTop: 8,
  },
  formContainer: {
    marginTop: 110,
    width: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginBottom: 10,
  },
  label: {
    marginRight: 8,
    fontFamily: "NotoSansKR_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
    flex: 0,
    flexGrow: 0,
    width: 90,
    paddingLeft: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    width: "100%",
    alignSelf: "stretch",
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginBtnTxt: {
    color: "#3A8ADB",
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 16,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  subBtn: {},
  subBtnTxt: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontFamily: "NotoSansKR_400Regular",
    fontStyle: "normal",
    color: "rgba(255, 255, 255, 0.75)",
    flex: 0,
    flexGrow: 0,
  },
  line: {
    width: 1,
    height: 13,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 8,
    opacity: 0.3,
    flex: 0,
    flexGrow: 0,
    marginHorizontal: 12,
  },
  snsText: {
    fontFamily: "NotoSansKR_400Regular",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 120,
  },
  snsBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  snsBtn: {
    marginHorizontal: 6,
  },
});
