import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { useFonts, NotoSansKR_700Bold, NotoSansKR_500Medium } from "@expo-google-fonts/noto-sans-kr";
const BingoListScreen = () => {
  const [btnId, setBtnId] = useState(1);
  const [selected, setSelected] = useState(false);
  const onPress = (id) => {
    setBtnId(id);
    setSelected(!selected);
  }
  let [fontsLoaded] = useFonts({
    NotoSansKR_700Bold,
    NotoSansKR_500Medium,
  });
  if (!fontsLoaded) { return null;}
  return (
      <SafeAreaView style={{backgroundColor:'#FFFFFF', height:'100%'}}>
        <View style={styles.header}>        
          <Text style={styles.title}>빙고 목록</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
             <Text style={styles.btnText}>개인</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button}>
             <Text style={styles.btnText}>그룹</Text>
           </TouchableOpacity>
          </View>
      </View>
      <View style={styles.list}>
        <Text>list</Text>
        <Text>list</Text>
        <Text>list</Text>
        <Text>list</Text>
        <Text>list</Text>
        <Text>list</Text>
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header:{
    flex: 2
  },
  list:{
    flex: 4,
    marginLeft:20,

  },
  title: {
    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 26,
    width:100,
    height:33,
    marginTop:50,
    marginLeft: 20,
  },
  seletedBtn: {

  },
  btnContainer: {
    flexDirection:'row',
    margin:10,
  },
  button: {
    width: 60,
    height: 40,
    borderRadius: 99,
    alignItems:'flex-start',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:16,
    paddingRight:16,
    backgroundColor:'#3A8ADB',
    borderColor:'#0000000',
    marginRight:4,
    marginTop:40,
  },
  btnText: {
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 14,
    alignItems:'center',
    width:26,
    height:18,
    textAlign: 'center',
  }

})

export default BingoListScreen;

