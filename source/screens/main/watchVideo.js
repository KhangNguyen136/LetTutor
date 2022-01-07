import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Video } from 'expo-av';
import ListBooking from '../../components/list/listBooking';
import Card from '../../components/card';
import SearchBox from '../../components/searchBar';
import { globalStyles } from '../../styles/globalStyles';

export default function WatchVideo({ navigation, route }) {
    const videoUrl = route.params.url;
    const videoRef = React.useRef(null)

    return (
        <SafeAreaView style={globalStyles.container} >
            <Video ref={videoRef} style={{ flex: 1 }} source={{ uri: videoUrl }}
                useNativeControls
                resizeMode={'contain'}
                isLooping={false} />
        </SafeAreaView>
    )
}