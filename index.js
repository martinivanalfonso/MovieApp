import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

const Debug = require('debug')

if (__DEV__) {
  Debug.enable('*')
}

AppRegistry.registerComponent(appName, () => App)
