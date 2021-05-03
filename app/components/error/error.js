import React from 'react'
import { View, Text } from 'react-native'

const Error = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sorry, something went wrong!</Text>
    </View>
)

export default Error