import React from 'react'
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import {useRoutes} from 'hooks/useRoutes'
import {Images} from 'assets'

type NavigatorHeaderProps = {
  title?: string
}

const NavigatorHeader: React.FC<NavigatorHeaderProps> = ({title}) => {
  const {back} = useRoutes()

  return (
    <TouchableOpacity onPress={back} style={styles.wrapper}>
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
    width: 7,
    height: 14,
    marginRight: 12,
  },
  title: {
    color: '#000000',
    fontFamily: 'NotoSansKR_500Medium',
    fontSize: 20,
  },
})
