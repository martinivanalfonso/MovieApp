// Enzyme config
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'react-native-gesture-handler/jestSetup'

Enzyme.configure({ adapter: new Adapter() })

// Global Mocks
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: () => {},
    goBack: () => {}
  })
}))
