import React from 'react'
import {View, StyleSheet} from 'react-native'

import BingoItem from './BingoItem'

const BingoBoard = ({board, size, items}) => {
  const newBoard1 = items.map(e => e.bingoItems)

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
