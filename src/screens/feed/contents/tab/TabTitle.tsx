import React, {useCallback, useState} from 'react'

import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {font} from 'shared/styles'
export type Props = {
  title: string
  index: number
  setSelectedTab: (index: number) => void
  isActive?: boolean
}

const TabTitle = (props: Props): JSX.Element => {
  const {title, setSelectedTab, index, isActive} = props

  const handleOnClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <TouchableOpacity onPress={handleOnClick} style={[styles.tab_container, isActive && styles.tab_container_clicked]}>
      <Text style={[styles.tab, isActive && styles.tab_clicked]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default TabTitle
const styles = StyleSheet.create({
  /**@view */

  container: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  tab_container: {
    marginHorizontal: 2,
    // paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  tab_container_clicked: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  tab: {
    ...font.NotoSansKR_Regular,
    fontSize: 14,
  },
  tab_clicked: {
    color: '#FFF',
    ...font.NotoSansKR_Medium,
  },
})
