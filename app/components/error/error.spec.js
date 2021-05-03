import React from 'react'
import { shallow } from 'enzyme'
import Error from './error'

describe('Error Component', () => {
  test('renders correctly', () => {
    const component = shallow(<Error />)
    expect(component).toMatchSnapshot()
  })
})
