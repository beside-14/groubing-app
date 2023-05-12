import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import NotiItem from "../../components/NotiItem";
import NotiItemActivityData from "../../assets/dataset/NotiItemActivityData.json";
import NotiItemFriendData from "../../assets/dataset/NotiItemFriendData.json";

const renderItem = ({ item }) => (
  <NotiItem
    profileUri={item.profileUri}
    nickname={item.nickname}
    notiType={item.notiType}
    notiText={item.notiText}
    notiTime={item.notiTime}
  />
);

const NotiListScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("activity");
  const [notiData, setNotiData] = useState(NotiItemActivityData);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    if (tab === "activity") {
      setNotiData(NotiItemActivityData);
    } else if (tab === "friend") {
      setNotiData(NotiItemFriendData);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>알림</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedTab === "activity" ? styles.selectedBtn : styles.basicBtn,
            ]}
            onPress={() => handleTabChange("activity")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedTab === "activity"
                  ? styles.selectedBtnTxt
                  : styles.basicBtnTxt,
              ]}
            >
              활동 알림
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedTab === "friend" ? styles.selectedBtn : styles.basicBtn,
            ]}
            onPress={() => handleTabChange("friend")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedTab === "friend"
                  ? styles.selectedBtnTxt
                  : styles.basicBtnTxt,
              ]}
            >
              친구 요청
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={notiData}
          keyExtractor={(item, index) => `noti_${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotiListScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  header: {
    height: "15%",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "NotoSansKR_700Bold",
    fontSize: 30,
    marginBottom: 40,
  },
  btnContainer: {
    flexDirection: "row",
  },
  selectedBtn: {
    display: "flex",
    marginHorizontal: 3,
    width: 88,
    height: 38,
    backgroundColor: "#000000",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBtnTxt: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "NotoSansKR_500Medium",
  },
  basicBtn: {
    display: "flex",
    marginHorizontal: 3,
    width: 88,
    height: 38,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  basicBtnTxt: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "NotoSansKR_500Medium",
  },
  bodyContainer: { flex: 1, marginBottom: 30 },
  flatListContent: {
    paddingBottom: 20,
  },
});
