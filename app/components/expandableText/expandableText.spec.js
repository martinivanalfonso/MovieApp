import React from 'react'
import { shallow } from 'enzyme'
import ExpandableText from './expandableText'

describe('ExpandableText Component', () => {
  test('renders correctly', () => {
    const component = shallow(<ExpandableText text="test" />)
    expect(component).toMatchSnapshot()
  })
})
