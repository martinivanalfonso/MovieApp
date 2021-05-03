import React from 'react'
import { shallow } from 'enzyme'
import Movie from './Movie'

describe('Movie Component', () => {
  test('renders correctly', () => {
    const component = shallow(<Movie 
        route={{ params: { id: '12345' }  }}
        navigation={{ navigate: () => {}, goBack: () => {}}} 
        />)
    expect(component).toMatchSnapshot()
  })
})
