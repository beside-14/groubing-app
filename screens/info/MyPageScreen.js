import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfileImg from "../../assets/icon/image/profile.png";
import EditIcon from "../../assets/icon/image/edit.png";

const { width } = Dimensions.get("window");
const itemSize = width / 3;

const MyPageScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("윤수짱");

  const [showList, setShowList] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const data = [
    {
      iconPath: require("../../assets/icon/image/ic_friends.png"),
      listText: "친구 관리",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
    {
      iconPath: require("../../assets/icon/image/ic_alert.png"),
      listText: "알림",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
    {
      iconPath: require("../../assets/icon/image/ic_terms.png"),
      listText: "약관 및 정책",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
    {
      iconPath: require("../../assets/icon/image/ic_inquiry.png"),
      listText: "서비스 문의",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
    {
      iconPath: require("../../assets/icon/image/ic_version.png"),
      listText: "버전 정보",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
    {
      iconPath: require("../../assets/icon/image/ic_setting.png"),
      listText: "설정",
      handle: () => {
        // 핸들러 함수 내용
      },
    },
  ];

  const renderListItem = ({ item }) => {
    return (
      <ListItem
        iconPath={item.iconPath}
        listText={item.listText}
        handle={item.handle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {showList && (
        <View style={styles.bodyContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.mainTitle}>마이페이지</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.myInfoContainer}>
              <View style={styles.infoImgContainer}>
                {/* <Image source={{ uri: profileUri }} style={styles.profile} /> */}
                <Image source={ProfileImg} style={styles.infoImg} />
              </View>
              <Text style={styles.infoNickname}>{nickname}</Text>
              <TouchableOpacity
                style={styles.infoBtnContainer}
                onPress={() => {
                  setShowList(false);
                  setShowProfile(true);
                  setTitle("프로필 관리");
                }}
              >
                <Text style={styles.infoBtn}>프로필 관리</Text>
                <Image
                  source={require("../../assets/icon/button/next_btn.png")}
                  style={styles.listNextBtn}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <FlatList
                data={data}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3} // 3개의 열로 그리드 형태로 표시
                columnWrapperStyle={styles.listGrid}
              />
            </View>
          </View>
        </View>
      )}

      {/* 프로필 관리 화면 */}
      {showProfile && (
        <View style={styles.bodyContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => {
                setShowProfile(false);
                setShowList(true);
                setTitle("");
              }}
            >
              <Image
                source={require("../../assets/icon/button/back_btn.png")}
                style={styles.headerBtn}
              />
              <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileManageContainer}>
            <View style={styles.profileContainer}>
              <View style={styles.profileImgContainer}>
                {/* <Image source={{ uri: profileUri }} style={styles.profile} /> */}
                <Image source={ProfileImg} style={styles.profile} />
              </View>
              <TouchableOpacity style={styles.editIconContainer}>
                <Image source={EditIcon} style={styles.editIcon} />
              </TouchableOpacity>
              <Text style={styles.nickname}>{nickname}</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const ListItem = ({ iconPath, listText, handle }) => {
  return (
    <TouchableOpacity
      style={[styles.listItemContainer, { width: itemSize, height: 90 }]}
      onPress={handle}
    >
      <View style={styles.listItemContent}>
        <Image source={iconPath} style={styles.listIcon} />
        <Text style={styles.listItemText}>{listText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    height: "7%",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBtn: {
    width: 7,
    height: 14,
    marginRight: 12,
  },
  title: {
    color: "#000000",
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 20,
  },
  mainTitle: {
    fontFamily: "NotoSansKR_700Bold",
    fontSize: 30,
  },
  bodyContainer: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 30,
  },
  myInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  infoImgContainer: {
    width: 72,
    height: 72,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    justifyContent: "flex-start",
  },
  infoImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoNickname: {
    flex: 1,
    color: "#000000",
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 25,
  },
  infoBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  infoBtn: {
    fontSize: 16,
    fontFamily: "NotoSansKR_400Regular",
    color: "#000000",
  },
  listNextBtn: {
    width: 16,
    height: 16,
  },
  btnContainer: {
    marginTop: 15,
  },
  listGrid: {
    justifyContent: "space-between",
  },
  listItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  listItemContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listIcon: {
    width: 24,
    height: 24,
  },
  listItemText: {
    fontSize: 16,
    fontFamily: "NotoSansKR_400Regular",
    color: "#000000",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: { width: "100%", height: "100%", resizeMode: "cover" },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    left: 20,
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden", // 수정된 부분
  },
  editIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nickname: {
    color: "#000000",
    fontFamily: "NotoSansKR_500Medium",
    fontSize: 20,
    marginTop: 10,
  },
  profileManageContainer: {},
});
