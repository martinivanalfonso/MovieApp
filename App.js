import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  StatusBar,
  useColorScheme,
  LogBox 
} from 'react-native'

import Navigation from './app/Navigation'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  //https://stackoverflow.com/questions/58243680/react-native-another-virtualizedlist-backed-container
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </NavigationContainer>
  )
}

export default App
