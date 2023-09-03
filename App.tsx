import React from 'react'
import StackNavigator from 'navigation/StackNavigator'
import {QueryClient, QueryClientProvider} from 'react-query'

import 'react-native-devsettings'
import {GestureHandlerRootView, gestureHandlerRootHOC} from 'react-native-gesture-handler'

const queryClient = new QueryClient()
// import {SheetProvider} from 'react-native-actions-sheet'
import 'components/common/sheets'

const App = () => {
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
