import React from 'react'
import {View, StyleSheet} from 'react-native'

import BingoItem from './BingoItem'

const BingoBoard = ({size, items, isTemporary, readonly}) => {
  const newBoard1 = items.map(e => e.bingoItems)

  return (
    <View style={styles.container}>
      {newBoard1.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(({title, complete, id, imageUrl}, index) => (
            <BingoItem
              key={index}
              readonly={readonly}
              id={id}
              isTemporary={isTemporary}
              title={title}
              complete={complete}
              size={size}
              img={imageUrl}
            />
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
