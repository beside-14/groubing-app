import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export const BingoGoalText = ({bingoPercent, bingoCount, maxBingoCount}: BingoGoalText) => {
  if (bingoPercent >= 100) {
    return (
      <View style={styles.bingoGoal}>
        <Text style={styles.bingoGoalText}>목표를 달성했어요!</Text>
        <Text style={styles.bingoCountText}>
          <Text style={styles.bingoCountTextColor}>{bingoCount}</Text>/<Text style={styles.bingoCountTextPadding}>{maxBingoCount}</Text>빙고
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.bingoGoal}>
        <Text style={styles.bingoGoalText}>
          목표까지 <Text style={styles.bingoPercent}>{bingoPercent.toFixed(0)}%</Text> 남았어요!
        </Text>
        <Text style={styles.bingoCountText}>
          <Text style={styles.bingoCountTextColor}>{bingoCount}</Text>/<Text style={styles.bingoCountTextPadding}>{maxBingoCount}</Text>빙고
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bingoGoal: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  bingoPercent: {
    flex: 1,
    fontFamily: 'NotoSansKR_700Bold',
    alignItems: 'flex-start',
    paddingLeft: 4,
    paddingRight: 4,
    color: '#3A8ADB',
    fontSize: 18,
    fontWeight: '600',
  },
  bingoGoalText: {
    flex: 1,
    fontFamily: 'NotoSansKR_700Bold',
    alignItems: 'flex-start',

    fontSize: 13,
    color: '#000000',
  },
  bingoCountText: {
    flex: 1,
    alignItems: 'flex-end',
    textAlign: 'right',

    fontFamily: 'NotoSansKR_700Bold',
    fontSize: 13,
    color: '#666666',
    marginRight: 1,
  },
  bingoCountTextColor: {
    color: '#3A8ADB',
    fontSize: 18,
  },
})
