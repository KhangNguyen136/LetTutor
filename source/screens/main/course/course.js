import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import ListCourse from '../../../components/list/listCourse';
import { globalStyles } from '../../../styles/globalStyles';
import { GetIcon } from '../../../components/button';

export default function Course({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Course',
            headerRight: () => (
                <TouchableOpacity style={{ flexDirection: 'row', marginEnd: 5, alignItems: 'center' }} onPress={() => navigation.navigate('Ebook')} >
                    <GetIcon iconName={'book'} source={'Entypo'} color={'#00b894'} />
                    <Text>Ebook</Text>
                </TouchableOpacity>
            ),
        })
    }, [])
    return (
        <SafeAreaView style={globalStyles.container} >
            <ListCourse />
        </SafeAreaView>
    )
}
