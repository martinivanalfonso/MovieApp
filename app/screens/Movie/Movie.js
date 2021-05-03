import { H2, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'
import Divider from '../../components/divider/divider'
import api from '../../services/theMovieApi'
import Loading from '../../components/loading/loading'
import Error from '../../components/error/error'
import config from '../../config/config'
import ExpandableText from '../../components/expandableText/expandableText'

const tag = 'Movie'
const debug = require('debug')(tag)

const Movie = ({ route, navigation }) => {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { width: deviceWidth } = useWindowDimensions()

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const { id } = route.params
        const response = await api.get(`/movie/${id}`)
        debug('movie res', response)
        setDetails(response)
      } catch (err) {
        debug('getData', err)
        setError(true)
      }
      setLoading(false)
    }
    getData()
  }, [route.params])

  const handleGoBack = () => {
    debug('handleGoBack')
    navigation.goBack()
  }

  if (loading) return (<Loading />)
  if (error) return (<Error />)

  const { title, genres, poster_path, release_date, vote_average, overview, adult, production_companies } = details
  const { imagePath } = config

  let genresString = ""
  genres.map(elem => genresString = `${genresString} ${elem.name} ·`)
  genresString = genresString.substring(0, genresString.length - 2)
  const pg = adult ? 'PG-18' : 'PG-13'

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: 'black' }}        >
      <View >
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackContainer}>
          <Icon
            type="FontAwesome5"
            name="arrow-left"
            fontSize={24}
            style={styles.goBack}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.playContainer, { left: deviceWidth / 2 - 32 }]}>
          <Icon
            type="FontAwesome5"
            name="play"
            style={styles.play}
          />
        </TouchableOpacity>
        <LinearGradient
          colors={['#121212', 'transparent', '#121212']}
          style={[styles.movieFading, { width: deviceWidth }]}
        />
        <ImageBackground
          style={{ height: 400, width: deviceWidth, borderRadius: 10 }}
          source={{ uri: imagePath + poster_path }}
        />
        <View style={styles.movieTitleContainer}>
          <Text style={styles.movieTitle}>{title}</Text>
          <H2 style={styles.whiteText}>{pg} / {release_date.substring(0, 4)}</H2>
        </View>
      </View>
      <View style={styles.marginHorizontal}>
        <Text style={styles.genres}>{genresString}</Text>
        <ExpandableText text={overview} />
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <ProgressCircle
            percent={vote_average * 10}
            radius={14}
            borderWidth={4}
            color="#EE3333"
            shadowColor="#701818"
            bgColor="black" />
          <Text style={styles.userScore}>
            {vote_average * 10}%{" "}
            <Text style={styles.userScoreSubText}>
              User Score
            </Text>
          </Text>
        </View>
      </View>
      <Divider />
      <View>
        <H2 style={styles.title}>Cast and Crews</H2>
        <ScrollView
          horizontal
          contentContainerStyle={{ width: 128 * production_companies.length }}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          pagingEnabled
        >
          {production_companies.map((elem) => (
            <View key={elem.id} style={styles.crewMemberContainer}>
              <Image
                style={[styles.smallImage]}
                resizeMode="center"
                source={elem.logo_path ? { uri: imagePath + elem.logo_path } : require('../../assets/gray_bg.png')} />
              <Text style={styles.crewName}>
                {elem.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Divider />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  whiteText: {
    color: 'white'
  },
  grayText: { color: '#888888' },
  title: {
    color: 'white',
    fontWeight: 'bold',
    margin: 14
  },
  bigImage: {
    height: 250,
    width: 172,
    borderRadius: 10,
    marginVertical: 14
  },
  smallImage: {
    height: 100,
    width: 100,
    borderRadius: 500,
    margin: 14
  },
  marginHorizontal: { marginHorizontal: 14 },
  userScore: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 14,
    marginLeft: 7
  },
  userScoreSubText: {
    color: 'white',
    fontWeight: 'normal'
  },
  crewName: { color: 'white', textAlign: 'center' },
  genres: { color: 'white', fontSize: 16, marginVertical: 14 },
  movieFading: {
    flex: 1,
    height: 400,
    position: 'absolute',
    top: 0,
    zIndex: 99,
    opacity: 0.9
  },
  play: { color: 'white', fontSize: 64 },
  goBack: { margin: 14, color: 'white' },
  goBackContainer: { position: 'absolute', top: 0, zIndex: 100 },
  movieTitleContainer: { position: 'absolute', bottom: 0, zIndex: 100, marginHorizontal: 14 },
  movieTitle: { color: 'white', fontWeight: 'bold', fontSize: 34 },
  crewMemberContainer: { width: 128 },
  playContainer: { position: 'absolute', top: 200 - 32, zIndex: 100 }
})

Movie.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func, goBack: PropTypes.func }).isRequired
}

export default Movie