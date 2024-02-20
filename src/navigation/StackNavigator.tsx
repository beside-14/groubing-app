import React, {useRef} from 'react'
import {StatusBar} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {isLoggedAtom} from 'store'
import {useAtomValue} from 'utils/jotai'

import {screens} from './screens'
import {AuthNavigator, SplashScreen, TabNavigator} from './components'

const Root = createStackNavigator()

const StackNavigator = () => {
  const navigationRef = useRef<undefined | any>()
  const isLogged = useAtomValue(isLoggedAtom)

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Root.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        {isLogged ? <Root.Screen name="Main" component={TabNavigator} /> : <Root.Screen name="Auth" component={AuthNavigator} />}
        {screens.map((screen, index) => (
          <Root.Screen key={index} name={screen.name} component={screen.component} options={screen.options} />
        ))}
      </Root.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
