import React from 'react';
import { Text, SafeAreaView } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../components/searchBar';
import ListSession from '../../components/list/listSession';
import Card from '../../components/card';
import { globalStyles } from '../../styles/globalStyles';

export default function SessionHistory() {
    const [searchKey, setSearchKey] = React.useState('');

    const updateSearch = (key) => setSearchKey(key)
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />
            </Card>
            <ListSession search={searchKey} />
        </SafeAreaView>
    )
}