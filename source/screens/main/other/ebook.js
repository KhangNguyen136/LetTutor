import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../../components/searchBar';
import ListEbook from '../../../components/list/listEbook';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';
import CountryPicker from '../../../components/countryPicker';
import Picker from '../../../components/picker';

export default function Ebooks() {
    const [searchKey, setSearchKey] = React.useState('');
    const [filterRating, setFilterRating] = React.useState('All')
    const [level, setLevel] = React.useState('All')
    const [tag, setTag] = React.useState('All')

    const updateSearch = (key) => setSearchKey(key)
    const updateTag = (tag) => setTag(tag)
    const updateLevel = (level) => setLevel(level)

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={{ flex: 1 }} >
                        <SearchBox placeholder={"Search by book's name"} value={searchKey} textChange={updateSearch} />
                    </View>
                    <Picker data={levels} title={'Level: '} didSelect={updateLevel} />
                    {/* <View style={globalStyles.horizontalDivide} /> */}
                </View>
                <Picker data={specialies} title={'Specialies: '} didSelect={updateTag} />
                <FilterReview title={'Rating:'} setFilter={setFilterRating} choosen={filterRating} />
            </Card>
            <ListEbook searchKey={searchKey} filter={{
                rating: filterRating, level, tag
            }} />
        </SafeAreaView>
    )
}

const specialies =
    ['All', 'English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']
const levels = ['All', 'Beginner', 'Intermedia', 'Advanced']