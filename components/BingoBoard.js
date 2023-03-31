import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BingoItem from "./BingoItem";
import generateBingoBoard from "../utils/BingoUtil";

const BingoBoard = ({ rows, columns, onToggle, items = [] }) => {
  const board = generateBingoBoard(rows, columns, items);

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(({ x, y, title, color, selected }, index) => (
            <BingoItem
              key={index}
              x={x}
              y={y}
              onToggle={() => onToggle(x, y)}
              title={title}
              color={color}
              selected={selected}
              size={rows}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});

export default BingoBoard;
