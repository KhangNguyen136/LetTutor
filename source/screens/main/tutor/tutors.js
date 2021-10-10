import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ListTutor from '../../../components/list/listTutor';
import { globalStyles } from '../../../styles/globalStyles';

export default function TutorScreen() {
    const [searchKey, setSearchKey] = React.useState('');

    const updateSearch = (key) => setSearchKey(key)

    return (
        <SafeAreaView style={globalStyles.container} >
            <SearchBar placeholder={"Search by tutor's name"} value={searchKey} onChangeText={updateSearch} />
            <ListTutor searchKey={searchKey} />
        </SafeAreaView>
    )
}
