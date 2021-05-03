/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient'
import { H3 } from 'native-base'
import config from '../../config/config'

export default class CustomCarousel extends Component {
    state = {
        activeSlide: 0
    }

    _renderItem = ({ item }) => <View >
        <TouchableOpacity onPress={() => this.props.handleMovieSelection(item.id)}>
            <LinearGradient colors={['#121212', 'transparent', '#121212']} style={{ flex: 1, height: 400, width: this.props.width, position: 'absolute', top: 0, zIndex: 99, opacity: 0.9 }} />
            <ImageBackground style={{ height: 400, width: this.props.width, borderRadius: 10 }} source={{ uri: config.imagePath + item.poster_path }} />
            <View style={{ position: 'absolute', bottom: 0, zIndex: 100, marginHorizontal: 14 }}>
            <H3 style={{ color: 'red', fontWeight: 'bold' }}>LATEST RELEASE</H3>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 34 }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        </View>

    get pagination() {
        const { data } = this.props
        const { activeSlide } = this.state
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'flex-start' }}
                dotStyle={{
                    width: 20,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: '#EE3333'
                }}
                inactiveDotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: '#616161'
                }}
                inactiveDotScale={1}
            />
        )
    }

    render() {
        return (
            <View>
                <Carousel
                    data={this.props.data}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    sliderWidth={this.props.width}
                    itemWidth={this.props.width}
                    containerCustomStyle={{ backgroundColor: 'black' }}
                />
                { this.pagination}
            </View>
        )
    }

}