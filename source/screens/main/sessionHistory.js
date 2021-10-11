import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ListSession from '../../components/list/listSession';
import { globalStyles } from '../../styles/globalStyles';

export default function SessionHistory() {
    const [searchKey, setSearchKey] = React.useState('');

    const updateSearch = (key) => setSearchKey(key)
    return (
        <SafeAreaView style={globalStyles.container} >
            <SearchBar placeholder={"Search by tutor's name"} value={searchKey} onChangeText={updateSearch} />
            <ListSession search={searchKey} />
        </SafeAreaView>
    )
}