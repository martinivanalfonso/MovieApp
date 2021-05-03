import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'

describe('App Component', () => {
  test('renders correctly', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})
