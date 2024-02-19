import React from 'react'
import {View, Text, ActivityIndicator} from 'react-native'

export const SplashScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
    <ActivityIndicator size="large" />
    <Text>Loading...</Text>
  </View>
)
