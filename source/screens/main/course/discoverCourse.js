import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import Pdf from 'react-native-pdf';
import { showMessage } from 'react-native-flash-message';
import Card from '../../../components/card';
import Picker from '../../../components/picker';

export default function DiscoverCourse({ navigation, route }) {
    const { data } = route.params
    const [item, setItem] = React.useState(data[0]);
    // const url = data.find(item => item.orderCourse == topicOrder).nameFile;
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={globalStyles.titleName}>Topic: </Text>
                    <Picker value={item} didSelect={setItem} data={formatTopics(data)} searchable={true} />
                </View>
            </Card>

            <Pdf source={{ uri: item.nameFile.replace(/\s/g, '%20') }}
                onError={(error) => console.log(error)}
                style={{ flex: 1, height: '100%', width: '100%' }}
            />

        </SafeAreaView>
    )
}


function formatTopics(topics) {
    const result = [];
    topics.forEach(item => {
        item.value = item.orderCourse;
        item.label = (item.orderCourse + 1) + '. ' + item.name;
        result.push(item);
    })
    return result;
}