import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import AcceptIcon from "../assets/icon/button/accept_icon.png";
import RefuseIcon from "../assets/icon/button/refuse_icon.png";
import ProfileImg from "../assets/icon/image/profile.png";

const NotiItem = ({ profileUri, nickname, notiType, notiText, notiTime }) => {
  const [friendRequest, setFriendRequest] = useState(false);
  const [bingoSearch, setBingoSearch] = useState(false);

  useEffect(() => {
    if (notiType === "friend") {
      setFriendRequest(true);
      setBingoSearch(false);
    } else if (notiType === "bingo") {
      setFriendRequest(false);
      setBingoSearch(true);
    } else {
      setFriendRequest(false);
      setBingoSearch(false);
    }
  }, [notiType]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.profileContainer}>
        {/* <Image source={{ uri: profileUri }} style={styles.profile} /> */}
        <Image source={ProfileImg} style={styles.profile} />
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.notiText}>
          <Text style={styles.nickname} onPress={() => {}}>
            {nickname}
          </Text>
          {notiText}
        </Text>
        <Text style={styles.notiTime}>{notiTime}</Text>
        {friendRequest && (
          <View style={styles.requestBtnContainer}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => {}}>
              <Image source={AcceptIcon} style={styles.icon} />
              <Text style={styles.acceptBtnTxt}>수락</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refuseBtn} onPress={() => {}}>
              <Image source={RefuseIcon} style={styles.icon} />
              <Text style={styles.refuseBtnTxt}>거절</Text>
            </TouchableOpacity>
          </View>
        )}
        {bingoSearch && (
          <TouchableOpacity style={styles.bingoSearchBtn} onPress={() => {}}>
            <Text style={styles.bingoSearchBtnTxt}>빙고 둘러보기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
    borderBottomColor: "#EAEAEA",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profile: { width: "100%", height: "100%", resizeMode: "cover" },
  TextContainer: { flexShrink: 1, marginRight: 20 },
  notiText: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "NotoSansKR_400Regular",
    color: "#000000",
    alignSelf: "stretch",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "NotoSansKR_500Medium",
    color: "#000000",
    alignSelf: "stretch",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  notiTime: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "NotoSansKR_400Regular",
    color: "#A6A6A6",
    alignSelf: "stretch",
  },
  requestBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  acceptBtn: { flexDirection: "row", alignItems: "center", marginRight: 15 },
  acceptBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "NotoSansKR_500Medium",
    color: "#3A8ADB",
  },
  refuseBtn: { flexDirection: "row", alignItems: "center" },
  refuseBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "NotoSansKR_500Medium",
    color: "#000000",
  },
  icon: { width: 14, height: 14, marginRight: 3 },
  bingoSearchBtn: { marginTop: 7 },
  bingoSearchBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "NotoSansKR_500Medium",
    color: "#3A8ADB",
  },
});

export default NotiItem;
