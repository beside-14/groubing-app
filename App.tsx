import React from 'react'

import StackNavigator from 'navigation/StackNavigator'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StackNavigator />
    </QueryClientProvider>
  )
}

export default App
