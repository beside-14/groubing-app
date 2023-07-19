import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
// import BingoItem from "./BingoItem";
import {generateBingoBoard} from '../../../utils/BingoUtil'
import BingoItem from './BingoItem'

const BingoBoard = ({board, size, items}) => {
  // console.log('가공전>>', items)
  // const board = generateBingoBoard(3, items)
  // console.log('size', size)
  // console.log('items', items)
  // console.log('board', board)
  // console.log('이전데이터!!', board)

  const newBoard1 = items.map(e => e.bingoItems)
  console.log('board', board)
  return (
    <View style={styles.container}>
      {newBoard1.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(({title, color, complete, id}, index) => (
            <BingoItem boardId={board} key={index} title={title} color={color} complete={complete} size={size} id={id} />
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
})

export default BingoBoard
