import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import Pdf from 'react-native-pdf';
import { showMessage } from 'react-native-flash-message';
import Card from '../../../components/card';
import Picker from '../../../components/picker';

export default function DiscoverCourse({ navigation, route }) {
    const { data } = route.params
    const [topic, setTopic] = React.useState(data[0])
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text style={globalStyles.titleName}>Topic: </Text>
                    <Picker value={topic} didSelect={setTopic} data={data} searchable={true} />
                </View>
            </Card>
            {/* <View> */}
            {/* <Text>Course details</Text> */}
            {/* <Card> */}
            {/* <View style={{ flex: 1 }} > */}
            <Pdf source={{ uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf' }}
                onError={(error) => console.log(error)}
                style={{ flex: 1, height: '100%', width: '100%' }}
            />
            {/* </View> */}
            {/* </Card> */}
            {/* </View> */}
        </SafeAreaView>
    )
}