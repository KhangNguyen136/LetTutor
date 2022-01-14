import React from 'react';
import { Text, SafeAreaView } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import ListHistory from '../../components/list/listHistory';
import Card from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';

export default function History() {
    const [searchKey, setSearchKey] = React.useState('');

    const updateSearch = (key) => setSearchKey(key)
    return (
        <SafeAreaView style={globalStyles.container} >
            <ListHistory search={searchKey} />
        </SafeAreaView>
    )
}