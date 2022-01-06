import React from 'react';
import { Text } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

export default function MyViewMoreText({ content, numberOfLine, textStyle = initTextStyle }) {
    const renderViewMore = (onPress) => {
        return (
            <Text style={{ alignSelf: 'flex-end', color: '#3399ff', fontWeight: '600' }} onPress={onPress}>View more</Text>
        )
    }
    const renderViewLess = (onPress) => {
        return (
            <Text style={{ alignSelf: 'flex-end', color: '#3399ff', fontWeight: '600' }} onPress={onPress}>View less</Text>
        )
    }
    return (
        <ViewMoreText
            renderViewLess={renderViewLess}
            renderViewMore={renderViewMore}
            numberOfLines={numberOfLine}
            textStyle={textStyle}
        >
            <Text >{content}</Text>
        </ViewMoreText>
    )
}

const initTextStyle = { fontSize: 14 }