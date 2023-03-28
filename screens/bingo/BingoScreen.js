import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const data = [
  { id: "1", value: "1" },
  { id: "2", value: "2" },
  { id: "3", value: "3" },
  { id: "4", value: "4" },
  { id: "5", value: "5" },
  { id: "6", value: "6" },
  { id: "7", value: "7" },
  { id: "8", value: "8" },
  { id: "9", value: "9" },
];

const BingoScreen = () => {

  const renderItem = ({ item }) => {
    return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{item.value}</Text>
    </TouchableOpacity> 
    );
    };

  return (
    <SafeAreaView>
      <Text>BingoScreen</Text>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

export default BingoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
