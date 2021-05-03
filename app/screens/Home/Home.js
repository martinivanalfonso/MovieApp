import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text, useWindowDimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { H2, H3 } from 'native-base'
import api from '../../services/theMovieApi'
import CustomCarousel from '../../components/carousel/carousel'
import Divider from '../../components/divider/divider'
import Loading from '../../components/loading/loading'
import Error from '../../components/error/error'
import config from '../../config/config'

const tag = 'Home'
const debug = require('debug')(tag)


const Home = ({ navigation }) => {
  const [latestReleaseMovies, setLatestReleaseMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { width: deviceWidth } = useWindowDimensions()

  useEffect(() => {
    const getData = async () => {
      try {
        const endpoints = ["top_rated", "popular", "now_playing", "upcoming"]
        const response = await Promise.all(endpoints.map((endpoint) => api.get(`/movie/${endpoint}`)))
        const [latest, popular, nowPlaying, upcoming] = response
        setLatestReleaseMovies(latest.results)
        setPopularMovies(popular.results)
        setNowPlayingMovies(nowPlaying.results)
        setUpcomingMovies(upcoming.results)
      } catch (err) {
        debug('getData', err)
        setError(true)
      }
      setLoading(false)
    }
    getData()
  }, [])

  const handleMovieSelection = (id) => {
    debug(handleMovieSelection)
    navigation.navigate('Movie', { id })
  }

  /* Dimension Helpers */
  const smallImageWidth = { width: (deviceWidth / 3) - 28 }
  const bigImageWidth = { width: 172 }

  if (loading) return (<Loading />)
  if (error) return (<Error />)

  const { imagePath } = config

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.bgBlack}        >
      {latestReleaseMovies.length ?
        <CustomCarousel
          data={latestReleaseMovies.slice(0, 5)}
          handleMovieSelection={handleMovieSelection}
          width={deviceWidth}
        />
        : (null)}
      <View style={styles.bgBlack}>
        <H2 style={styles.title}>Popular</H2>
        <ScrollView
          horizontal
          contentContainerStyle={{ width: 200 * popularMovies.length }}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          pagingEnabled
        >
          {popularMovies && popularMovies.map(popularMovie => (
            <TouchableOpacity
              onPress={() => handleMovieSelection(popularMovie.id)}
              style={styles.marginHorizontal}
              key={popularMovie.id}
            >
              <Image style={styles.bigImage} source={{ uri: imagePath + popularMovie.poster_path }} />
              <H2 style={[styles.whiteText, bigImageWidth]}>{popularMovie.title}</H2>
              <Text style={styles.grayText}>PG13 / {popularMovie.release_date.substring(0, 4)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
      <Divider />
      <View>
        <H2 style={styles.title}>Popular</H2>
        {nowPlayingMovies.length ? (
          <FlatList data={nowPlayingMovies} numColumns={3} renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMovieSelection(item.id)}
              style={styles.marginHorizontal}
              key={`nowPlayingMovies-${item.id}`}
            >
              <Image
                style={[styles.smallImage, smallImageWidth]}
                source={{ uri: imagePath + item.poster_path }} />
              <H3 style={[styles.whiteText, smallImageWidth]}>{item.title}</H3>
              <Text style={styles.grayText}>PG13 / {item.release_date.substring(0, 4)}</Text>
            </TouchableOpacity>
          )} />
        ) : (null)}
      </View>
      <Divider />
      <View>
        <H2 style={styles.title}>Upcoming</H2>
        {upcomingMovies.length ? (
          <FlatList data={upcomingMovies} numColumns={3} renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMovieSelection(item.id)}
              style={styles.marginHorizontal}
              key={`upcomingMovies-${item.id}`}
            >
              <Image
                style={[styles.smallImage, smallImageWidth]}
                source={{ uri: imagePath + item.poster_path }} />
              <H3 style={[styles.whiteText, smallImageWidth]}>{item.title}</H3>
              <Text style={styles.grayText}>PG13 / {item.release_date.substring(0, 4)}</Text>
            </TouchableOpacity>
          )} />
        ) : (null)}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  },
  whiteText: {
    color: 'white'
  },
  grayText: { color: '#888888', fontSize: 16 },
  title: {
    color: 'white',
    margin: 14
  },
  bigImage: { height: 250, width: 172, borderRadius: 10, marginVertical: 14 },
  smallImage: {
    height: 180,
    borderRadius: 10,
    marginVertical: 14
  },
  marginHorizontal: { marginHorizontal: 14 },
  bgBlack: { backgroundColor: 'black' }
})

Home.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func, goBack: PropTypes.func }).isRequired
}

export default Home
