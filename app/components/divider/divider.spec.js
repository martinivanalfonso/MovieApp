import React from 'react'
import { shallow } from 'enzyme'
import Divider from './divider'

describe('Divider Component', () => {
  test('renders correctly', () => {
    const component = shallow(<Divider />)
    expect(component).toMatchSnapshot()
  })
})
