import React, {ReactElement} from 'react'
import {View} from 'react-native'

type Props = {
  title: string
  children: ReactElement | ReactElement[]
}

const TabPane = ({children}: Props): JSX.Element => <View>{children}</View>

export default TabPane
