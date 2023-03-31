import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import BingoBoard from "../../components/BingoBoard";
import BingoItemData from "../../assets/dataset/BingoItemData.json";
import generateBingoBoard from "../../utils/BingoUtil";

const BingoScreen = () => {
  const [boardSize, setBoardSize] = useState(3); // 초기값은 3
  const [bingoCount, setBingoCount] = useState(0); // 빙고 수
  const [board, setBoard] = useState([]); // 빙고판 상태

  const checkLineCompleted = (line) => {
    if (!line) return false;
    return line.every((item) => item.selected);
  };

  // useEffect(() => {
  //   const calculateBingoCount = () => {
  //     let count = 0;

  //     for (let i = 0; i < boardSize; i++) {
  //       if (checkLineCompleted(board[i])) {
  //         count++;
  //       }
  //     }

  //     for (let i = 0; i < boardSize; i++) {
  //       const line = board.map((row) => row[i]);
  //       if (checkLineCompleted(line)) {
  //         count++;
  //       }
  //     }

  //     if (
  //       board[0][0].selected &&
  //       board[1][1].selected &&
  //       board[2][2].selected
  //     ) {
  //       count++;
  //     }
  //     if (
  //       board[0][2].selected &&
  //       board[1][1].selected &&
  //       board[2][0].selected
  //     ) {
  //       count++;
  //     }

  //     setBingoCount(count);
  //   };

  //   calculateBingoCount();
  // }, [board, boardSize]);

  // useEffect(() => {
  //   if (!BingoItemData || BingoItemData.length === 0) return;

  //   const board = generateBingoBoard(boardSize, boardSize, BingoItemData || []);
  //   setBoard(board);
  // }, [boardSize, BingoItemData]);

  const handleToggle = (x, y) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[x][y].selected = !newBoard[x][y].selected;
      return newBoard;
    });
  };

  // BingoItemData의 길이에 따라 빙고판의 크기 결정
  const dataSize = BingoItemData.length;
  useEffect(() => {
    if (dataSize <= 9) {
      setBoardSize(3);
      setBoard(generateBingoBoard(3, 3, BingoItemData));
    } else if (dataSize <= 16) {
      setBoardSize(4);
      setBoard(generateBingoBoard(4, 4, BingoItemData));
    }
  }, [dataSize]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.bingoCount}>빙고 수: {bingoCount}</Text>
        <BingoBoard
          rows={boardSize}
          columns={boardSize}
          onToggle={handleToggle}
          items={BingoItemData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BingoScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingBottom: 100, // 하단 네비게이터 높이만큼 패딩을 추가
  },
});
