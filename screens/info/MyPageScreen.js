import { StyleSheet, Text, SafeAreaView, TouchableHighlight } from "react-native";
import React from "react";
import ActionSheet from "react-native-actionsheet";
import { useRef } from "react";

const MyPageScreen = () => {
  let actionSheet = useRef();

  const options = [
    "앨범에서 사진 선택",
    "카메라 촬영",
    "기본 이미지로 변경",
    "취소",
  ];
  const title = "프로필 사진 설정";

  const destructiveBtnIdx = 2;
  const cancelBtnIdx = 3;

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  return (
    <SafeAreaView>
      <Text>MyPageScreen</Text>
      <TouchableHighlight
        onPress={showActionSheet}>
        <Text>Profile</Text>
      </TouchableHighlight>
      <ActionSheet
        ref={actionSheet}
        title={title}
        options={options}
        cancelButtonIndex={cancelBtnIdx}
        destructiveButtonIndex={destructiveBtnIdx}
        onPress={(buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              alert(options[buttonIndex]);
              //expo ImagePicker
              break;
            case 1:
              //expo camera
              alert(options[buttonIndex]);
              break;
            case destructiveBtnIdx:
              //delete and set Default icon image
              alert(options[buttonIndex]);
              break;
            case cancelBtnIdx:
              //canceled
          }
        }}
/>
    </SafeAreaView>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({});
