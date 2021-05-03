import React from 'react'
import { shallow } from 'enzyme'
import Carousel from './carousel'

describe('Carousel Component', () => {
    const data = ["1", "2", "3"]
    test('renders correctly', () => {
        const component = shallow(<Carousel data={data} width={400} />)
        expect(component).toMatchSnapshot()
    })
})
