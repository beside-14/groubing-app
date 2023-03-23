import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { validateEmail, validatePassword, alert } from "../../utils/StringUtil";
import { signUp } from "../../utils/AuthUtil";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <View>
        <Text variant="displayMedium"> 회원가입 </Text>
        <Text variant="headlineSmall"> {headline} </Text>
      </View>

      {/* 이메일 입력 컴포넌트 */}
      {showEmail && (
        <View>
          <Text variant="labelLarge">아이디(이메일)</Text>
          <TextInput
            placeholder="GrouBing@groubing.com"
            onChangeText={(id) => setId(id)}
            value={id}
          />
          <Button
            mode="Contained"
            onPress={() => {
              setShowEmailAuth(true);
              setShowEmail(false);
            }}
            buttonColor="black"
            textColor="white"
            style={{ marginTop: 8 }}
          >
            다음
          </Button>
        </View>
      )}

      {/* 이메일 인증 컴포넌트 */}
      {showEmailAuth && (
        <View>
          <Text variant="labelLarge">아이디(이메일)</Text>
          <TextInput style={styles.input} value={id} disabled />
          <Button
            mode="Contained"
            onPress={() => setShowEmailAuth()}
            buttonColor="white"
            textColor="black"
            disabled
            style={{ marginTop: 8 }}
          >
            재발송
          </Button>
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
              keyboardType="numeric"
              style={{ borderWidth: 1, padding: 10 }}
            />
            <Text>{formatTime(timeLeft)}</Text>
          </View>
          <Button
            mode="Contained"
            onPress={() => {
              setShowEmailAuth(false);
              setShowPassword(true);
            }}
            buttonColor="black"
            textColor="white"
            style={{ marginTop: 8 }}
          >
            다음
          </Button>
        </View>
      )}

      {/* 패스워드 입력 컴포넌트 */}
      {showPassword && (
        <View>
          <Text variant="labelLarge">비밀번호</Text>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(pwd) => setPassword(pwd)}
          />
          <Text variant="labelSmall">
            8~20자 이내 영문 대소문자, 숫자, 특수문자
          </Text>
          <Text variant="labelLarge">비밀번호 확인</Text>
          <TextInput
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(pwd) => setConfirmPassword(pwd)}
          />
          <Button
            mode="Contained"
            onPress={() => {
              setShowPassword(false);
              setShowBirth(true);
            }}
            buttonColor="black"
            textColor="white"
            style={{ marginTop: 8 }}
          >
            다음
          </Button>
        </View>
      )}

      {/* 생년월일 입력 컴포넌트 */}
      {showBirth && (
        <View>
          <Text variant="labelLarge">생년월일</Text>
          <TextInput
            placeholder="GrouBing@groubing.com"
            onChangeText={(id) => setId(id)}
            value={id}
          />
          <Text variant="labelSmall">
            입력하신 생년월일은 공개되지 않습니다.
          </Text>
          <Button
            mode="Contained"
            onPress={() => {
              setShowAgreement(true);
              setShowBirth(false);
            }}
            buttonColor="black"
            textColor="white"
            style={{ marginTop: 8 }}
          >
            다음
          </Button>
        </View>
      )}

      {/* 약관동의 컴포넌트 */}
      {showAgreement && (
        <View>
          <Text variant="labelLarge">약관 동의</Text>

          <Button
            mode="Contained"
            onPress={() => {
              handleSignUp();
            }}
            buttonColor="black"
            textColor="white"
            style={{ marginTop: 8 }}
          >
            가입하기
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/icon/button/back_btn.png")}
        style={{ width: 100, height: 100 }}
      />
    </TouchableOpacity>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    felx: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 100,
    fontSize: 38,
    fontWeight: "500",
    alignContent: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    flex: 4,
  },
  nameInput: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    flex: 1,
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
