import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {
  StatusBar,
  useColorScheme
} from 'react-native'

import Navigation from './app/Navigation'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </NavigationContainer>
  )
}

export default App
