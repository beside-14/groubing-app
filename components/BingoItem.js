import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const BingoItem = ({ x, y, onToggle, title, size, selected }) => {
  const [isSelected, setSelected] = useState(selected);

  const itemSize = width / size;
  const fontSize = width / (size * 5);

  const handleToggle = () => {
    setSelected(!isSelected);
    onToggle(x, y, !selected);
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { width: itemSize, height: itemSize, fontSize: fontSize },
        isSelected ? styles.selected : styles.unselected,
      ]}
      onPress={handleToggle}
    >
      <Text style={styles.itemLabel}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
  },
  selected: {
    backgroundColor: "#3A8ADB",
  },
  unselected: {
    backgroundColor: "#F3F3F3",
  },
  itemLabel: {
    fontWeight: "bold",
    fontFamily: "NotoSansKR_700Bold",
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default BingoItem;
