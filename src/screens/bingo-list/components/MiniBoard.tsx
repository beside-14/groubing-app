import React from 'react'

import {View} from 'react-native'

export const MiniBoard = ({bingo, color}) => {
  const bingoarr = bingo.map(e => e?.bingoItems)

  const FOUR = bingo.length === 4
  return (
    <View>
      {bingoarr.map((e, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {e.map(({complete}, i) => (
            <View
              key={i}
              style={{
                width: FOUR ? 12 : 16,
                height: FOUR ? 12 : 16,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 4,
                backgroundColor: complete ? color : '#DDDDDD',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  )
}
