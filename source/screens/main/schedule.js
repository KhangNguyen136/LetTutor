import React from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { GetIcon } from '../../components/button';
import ListUpcoming from '../../components/list/listUpcoming';
import { globalStyles } from '../../styles/globalStyles';

export default function UpcomingScreen({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            // title: 'History',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('History')} style={{ marginRight: 10 }} >
                    <GetIcon iconName={'history'} source={'MaterialIcons'} size={24} color={'black'} />
                </TouchableOpacity>
            ),
        })
    }, [])
    return (
        <SafeAreaView style={globalStyles.container} >
            <ListUpcoming route={route} />
        </SafeAreaView>
    )
}