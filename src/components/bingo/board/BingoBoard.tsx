import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
// import BingoItem from "./BingoItem";
import {generateBingoBoard} from '../../../utils/BingoUtil'
import BingoItem from './BingoItem'

const BingoBoard = ({size, onToggle, items = []}) => {
  console.log('가공전>>', items)
  const board = generateBingoBoard(3, items)
  // console.log('size', size)
  // console.log('items', items)
  // console.log('board', board)

  console.log('가공후>>', board)
  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(({x, y, title, color, selected, id}, index) => (
            <BingoItem key={index} x={x} y={y} onToggle={() => onToggle(x, y)} title={title} color={color} selected={selected} size={size} id={id} />
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
