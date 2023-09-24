// import {COLOR, Div, MENU, Row, useRoutes} from '@app/lib'
import React, {ReactElement, useState} from 'react'
import {View} from 'react-native'
// import {SearchIcon} from '@app/components'
import TabTitle, {Props as TabTitleProps} from './TabTitle'

type Props = {
  children: ReactElement<TabTitleProps>[]
  preSelectedTabIndex?: number
}

const Tabs = (props: Props): JSX.Element => {
  const {children, preSelectedTabIndex} = props
  //   const {navigate} = useRoutes()

  // First tab is shown by default
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(preSelectedTabIndex || 0)

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 61, marginHorizontal: 20}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {children.map((item, index) => (
            <TabTitle
              key={item.props.title}
              title={item.props.title}
              index={index}
              isActive={index === selectedTabIndex}
              setSelectedTab={setSelectedTabIndex}
            />
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>{children[selectedTabIndex]}</View>
    </View>
  )
}

export default Tabs
