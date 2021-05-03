import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home Component', () => {
  test('renders correctly', () => {
    const component = shallow(<Home navigation={{ navigate: () => {}, goBack: () => {}}} />)
    expect(component).toMatchSnapshot()
  })
})
