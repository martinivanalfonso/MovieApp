import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home/Home'
import Movie from './screens/Movie/Movie'

const Stack = createStackNavigator()

export const Navigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="Movie" component={Movie} options={{ headerShown: false }} />
  </Stack.Navigator>
)

export default Navigation