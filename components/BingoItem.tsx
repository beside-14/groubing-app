import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const BingoItem = ({ x, y, onToggle, title, size, selected }) => {
  const itemSize = width / size;
  const fontSize = size === 3 ? 13 : 12;

  const handleToggle = () => {
    onToggle(x, y);
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { width: itemSize, height: itemSize },
        selected ? styles.selected : styles.unselected,
      ]}
      onPress={handleToggle}
    >
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[
          styles.itemLabel,
          selected ? styles.selectedFont : styles.unselectedFont,
          { fontSize: fontSize },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
  },
  selected: {
    backgroundColor: "#3A8ADB",
  },
  unselected: {
    backgroundColor: "#F3F3F3",
  },
  selectedFont: {
    color: "#FFFFFF",
  },
  unselectedFont: {
    color: "#000000",
  },
  itemLabel: {
    fontWeight: "bold",
    fontFamily: "NotoSansKR_700Bold",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "left",
  },
});

export default BingoItem;
