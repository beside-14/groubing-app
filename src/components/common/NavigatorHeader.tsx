import React from 'react'
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import {useRoutes} from 'hooks/useRoutes'
import {Images} from 'assets'
import {hipslap} from 'screens/board/BingoScreen'

type NavigatorHeaderProps = {
  title?: string
}

const NavigatorHeader: React.FC<NavigatorHeaderProps> = ({title}) => {
  const {back} = useRoutes()

  return (
    <TouchableOpacity hitSlop={hipslap} onPress={back} style={styles.wrapper}>
      <Image source={Images.back_btn} style={styles.headerBtn} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default NavigatorHeader

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerBtn: {
    width: 24,
    height: 24,
    marginRight: 2,
  },
  title: {
    color: '#000000',
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 18,
    fontWeight: '500',
  },
})
