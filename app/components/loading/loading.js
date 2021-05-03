import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="red" />
    </View>
)

export default Loading