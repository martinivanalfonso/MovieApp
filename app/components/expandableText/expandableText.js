import React, { useState } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

const ExpandableText = ({ text }) => {
    const [showFullText, setShowFullText] = useState(false)
    return (
        <View>
            {text.length && text.length > 160 ? (
                <View>
                    {showFullText ? (
                        <Text style={{ color: 'gray', marginBottom: 14, fontSize: 16 }}>{text}
                            <Text style={{ color: 'red' }} onPress={() => setShowFullText(false)}>
                                ...less
                    </Text>
                        </Text>
                    ) : (
                            <Text style={{ color: 'gray', marginBottom: 14, fontSize: 16 }}>{text.substring(0, 140)}
                                <Text style={{ color: 'red' }} onPress={() => setShowFullText(true)}>
                                    ...more
                        </Text>
                            </Text>
                        )}
                </View>
            ) : (
                    <Text style={{ color: 'gray', marginBottom: 14, fontSize: 16 }}>{text}</Text>
                )}
        </View>
    )
}

ExpandableText.propTypes = {
    text: PropTypes.string.isRequired
  }

export default ExpandableText