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
    const [level, setLevel] = React.useState('Level')
    const [tag, setTag] = React.useState('Specialies')

    const updateSearch = (key) => setSearchKey(key)
    const updateTag = (tag) => setTag(tag)
    const updateLevel = (level) => setLevel(level)

    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <SearchBox placeholder={"Search by book's name"} value={searchKey} textChange={updateSearch} />

                <View style={{ flexDirection: 'row', marginBottom: 3 }} >
                    <Picker data={specialies} value={tag} title={'Specialies'} didSelect={updateTag} />
                    <Picker data={levels} value={level} title={'Level'} didSelect={updateLevel} />
                </View>
                <FilterReview title={'Rating:'} setFilter={setFilterRating} choosen={filterRating} />
            </Card>
            <ListEbook searchKey={searchKey} filter={{
                rating: filterRating, level, tag
            }} />
        </SafeAreaView >
    )
}

const specialies =
    ['English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']
export const levels = ['Beginner', 'Intermediate', 'Advanced']
export const sortBy = ['Level decreasing', 'Level ascending']