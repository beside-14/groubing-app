import React, {useEffect} from 'react'
import StackNavigator from 'navigation/StackNavigator'
import SplashScreen from 'react-native-splash-screen'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import 'react-native-devsettings'
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler'

const queryClient = new QueryClient()
// import {SheetProvider} from 'react-native-actions-sheet'
import 'components/common/sheets'

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <SheetProvider> */}
        <StackNavigator />
        {/* </SheetProvider> */}
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

export default App
