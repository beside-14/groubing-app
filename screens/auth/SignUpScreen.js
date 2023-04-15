import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Text,
  Button,
} from "react-native";
import { validateEmail, validatePassword, alert } from "../../utils/StringUtil";
import { signUp } from "../../utils/AuthUtil";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CautionIcon from "../../assets/icon/button/caution_icon.png";

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [headline, setHeadline] = useState("아이디(이메일)를 입력해주세요.");

  const [showEmail, setShowEmail] = useState(true);
  const [showEmailAuth, setShowEmailAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBirth, setShowBirth] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const [authCode, setAuthCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 180초 = 3분

  const [errorMessage, setErrorMessage] = useState("");
  const [microcopy, setMicrocopy] = useState(
    "올바른 이메일 형식이 아닙니다. 다시 입력해주세요."
  );

  async function handleSignUp() {
    const userInfo = { id, password };
    console.log("Signed up : ", userInfo);

    // if (id === "" || password === "" || confirmPassword == "") {
    //   setErrorMessage("Please fill out all fields");
    //   console.log(errorMessage);
    //   alert("Form Check", errorMessage);
    //   return;
    // }

    //비밀번호 형식 체크
    // if (validatePassword(password)) {
    //   setErrorMessage(
    //     "Password must be at least 8 characters, one number, one lowercase."
    //   );
    //   alert("Password validation", errorMessage);
    //   return;
    // }

    //확인용 비밀번호와 비밀번호의 일치 체크
    // if (password != confirmPassword) {
    //   setErrorMessage("Passwords do not match. Please check back.");
    //   alert("Confirm password", errorMessage);
    //   return;
    // }

    //이메일 유효성 체크
    // if (!validateEmail(email)) {
    //   setErrorMessage("Please check Email address format.");
    //   alert("Email validation", errorMessage);
    //   return;
    // }
    setErrorMessage("");

    if (errorMessage === "") {
      try {
        // login api 로직

        // const response = await signUp(userInfo);
        // console.log(response);
        // if (response == "success") {
        //   // 회원가입 성공
        //   navigation.navigate("Nickname");
        // } else {
        //   // 회원가입 실패
        // }

        //회원가입 성공 시 닉네임 설정 화면 이동
        navigation.navigate("Nickname");
      } catch (error) {
        console.log(error);
        Alert.alert("회원가입 실패", "서버와의 연결이 원활하지 않습니다.");
      }
    }
  }

  //이메일 인증 코드 3분 제한 관련
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleChange = (text) => {
    setAuthCode(text);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.title}>회원가입</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headline}>{headline}</Text>

        {/* 이메일 입력 컴포넌트 */}
        {showEmail && (
          <View style={styles.bodyContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="아이디(이메일)"
                onChangeText={(id) => setId(id)}
                value={id}
                style={styles.textInput}
              />
              <View style={styles.microcopyContainer}>
                <TouchableOpacity style={styles.cautionIcon}>
                  <Image source={CautionIcon} />
                </TouchableOpacity>
                <Text style={styles.microcopy}>{microcopy}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                setShowEmailAuth(true);
                setShowEmail(false);
              }}
            >
              <Text style={styles.nextBtnTxt}>다음</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 이메일 인증 컴포넌트 */}
        {showEmailAuth && (
          <View>
            <Text>아이디(이메일)</Text>
            <TextInput style={styles.input} value={id} disabled />
            <Button
              title="재발송"
              onPress={() => setShowEmailAuth()}
              disabled
              style={{ marginTop: 8 }}
            ></Button>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
              }}
            >
              <TextInput
                value={authCode}
                onChangeText={handleChange}
                maxLength={3}
                style={{ borderWidth: 1, padding: 10 }}
              />
              <Text>{formatTime(timeLeft)}</Text>
            </View>
            <Button
              title="다음"
              onPress={() => {
                setShowEmailAuth(false);
                setShowPassword(true);
              }}
              style={{ marginTop: 8 }}
            ></Button>
          </View>
        )}

        {/* 패스워드 입력 컴포넌트 */}
        {showPassword && (
          <View>
            <Text>비밀번호</Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(pwd) => setPassword(pwd)}
            />
            <Text>8~20자 이내 영문 대소문자, 숫자, 특수문자</Text>
            <Text>비밀번호 확인</Text>
            <TextInput
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(pwd) => setConfirmPassword(pwd)}
            />
            <Button
              title="다음"
              onPress={() => {
                setShowPassword(false);
                setShowBirth(true);
              }}
              style={{ marginTop: 8 }}
            ></Button>
          </View>
        )}

        {/* 생년월일 입력 컴포넌트 */}
        {showBirth && (
          <View>
            <Text>생년월일</Text>
            <TextInput
              placeholder="GrouBing@groubing.com"
              onChangeText={(id) => setId(id)}
              value={id}
            />
            <Text>입력하신 생년월일은 공개되지 않습니다.</Text>
            <Button
              title="다음"
              onPress={() => {
                setShowAgreement(true);
                setShowBirth(false);
              }}
              style={{ marginTop: 8 }}
            ></Button>
          </View>
        )}

        {/* 약관동의 컴포넌트 */}
        {showAgreement && (
          <View>
            <Text>약관 동의</Text>

            <Button
              title="가입하기"
              onPress={() => {
                handleSignUp();
              }}
              style={{ marginTop: 8 }}
            ></Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/icon/button/back_btn.png")}
        style={styles.headerBtn}
      />
    </TouchableOpacity>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    felx: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBtn: {
    width: 7,
    height: 14,
    marginHorizontal: 12,
  },
  title: {
    color: "#000000",
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 18,
  },
  container: {
    marginHorizontal: 12,
  },
  headline: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "NotoSansKR_500Medium",
    marginTop: 50,
  },
  bodyContainer: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInputContainer: {
    width: "100%",
  },
  textInput: {
    height: 60,
    width: "100%",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    fontFamily: "NotoSansKR_400Regular",
    color: "#A6A6A6",
    fontSize: 18,
  },
  microcopyContainer: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  cautionIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 8,
  },
  microcopy: {
    fontFamily: "NotoSansKR_400Regular",
    color: "#FF3C3C",
    fontSize: 16,
  },
  nextBtn: {
    height: 48,
    backgroundColor: "#000000",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  nextBtnTxt: {
    fontSize: 18,
    fontFamily: "NotoSansKR_500Medium",
    color: "#FFFFFF",
  },
  signupBtn: {
    alignItems: "center",
    backgroundColor: "ivory",
    borderWidth: 0.5,
    margin: 5,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },

  confirmBtn: {
    alignItems: "center",
    backgroundColor: "ivory",
    borderWidth: 0.5,
    margin: 5,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
});
