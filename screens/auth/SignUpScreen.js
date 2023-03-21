import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView } from "react-native";
import { validateEmail, validatePassword, alert } from "../../utils/StringUtil";
import { signUp } from "../../utils/AuthUtil";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameState, setNmState] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeNameHandler = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmName = (e) => {
    setNmState(e.target.value);
    //중복체크
  };

  async function handleSignUp() {
    const userInfo = { username, email, password };
    console.log("Signed up : ", userInfo);

    if (
      nameState === false ||
      email === "" ||
      password === "" ||
      confirmPassword == ""
    ) {
      setErrorMessage("Please fill out all fields");
      console.log(errorMessage);
      alert("Form Check", errorMessage);
      return;
    }

    //비밀번호 형식 체크
    if (validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, one number, one lowercase."
      );
      alert("Password validation", errorMessage);
      return;
    }

    //확인용 비밀번호와 비밀번호의 일치 체크
    if (password != confirmPassword) {
      setErrorMessage("Passwords do not match. Please check back.");
      alert("Confirm password", errorMessage);
      return;
    }

    //이메일 유효성 체크
    if (!validateEmail(email)) {
      setErrorMessage("Please check Email address format.");
      alert("Email validation", errorMessage);
      return;
    }
    setErrorMessage("");

    if (errorMessage === "" && nameState === true) {
      try {
        // login api 로직

        // const response = await signUp(userInfo);
        // console.log(response);
        // if (response == "success") {
        //   // 회원가입 성공
        //   navigation.navigate("Login");
        // } else {
        //   // 회원가입 실패
        // }

        //회원가입 성공 시 Login 화면 이동
        navigation.navigate("Login");
      } catch (error) {
        console.log(error);
        Alert.alert("회원가입 실패", "서버와의 연결이 원활하지 않습니다.");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.header}> 회원가입 </Text>
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.nameInput}
            placeholder="User Name"
            placeholderTextColor="#83817A"
            value={username}
            onChangeText={onChangeNameHandler}
          />
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirmName}
          >
            <Text>확인</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#83817A"
          keyboardType="email-address"
          value={email}
          onChangeText={(mail) => setEmail(mail)}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#83817A"
            value={password}
            secureTextEntry={true}
            onChangeText={(pwd) => setPassword(pwd)}
          />
          <Text>Combine numbers, lowercase and be at least 8 characters</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#83817A"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(pwd) => setConfirmPassword(pwd)}
          />
        </View>
        <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

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
