import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import SearchBox from '../../../components/searchBar';
import ListCourse from '../../../components/list/listCourse';
import { globalStyles } from '../../../styles/globalStyles';
import FilterReview from '../../../components/filterRating';
import Card from '../../../components/card';
import Filter from '../../../components/filter';
import { levels, sortBy } from '../other/ebook';
import { specialies } from '../tutor/tutors';

export default function Course() {
    const [searchKey, setSearchKey] = React.useState('');
    const [filterRating, setFilterRating] = React.useState('All')
    // const [filterCountry, setFilterCountry] = React.useState('Country')
    const [tag, setTag] = React.useState('Specialies')
    const [level, setLevel] = React.useState('Level')
    const [sort, setSort] = React.useState('Sort by')

    const updateSearch = (key) => setSearchKey(key)
    return (
        <SafeAreaView style={globalStyles.container} >
            <Card>
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ flex: 1 }} >
                        <SearchBox placeholder={"Search course"} value={searchKey} textChange={updateSearch} />
                    </View>
                    <Filter didSelect={setLevel} value={level} data={levels} title={'Level'} />

                </View>
                <View style={{ flexDirection: 'row', margin: 3, marginEnd: 10, }} >

                    <Filter didSelect={setTag} value={tag} data={specialies} title={'Specialies'} />
                    <Filter didSelect={setSort} value={sort} data={sortBy} title={'Sort by'} />
                </View>
                {/* <FilterReview title={'Rating:'} setFilter={setFilterRating} choosen={filterRating} /> */}
            </Card>
            <ListCourse searchKey={searchKey} filter={{
                tag, level, sort
            }} />
        </SafeAreaView>
    )
}

// const specialies =
//     ['English for kid', 'English for business', 'Conversational', 'STARTER', 'MOVERS', 'FLYERS', 'KET', 'PET', 'IELTS', 'TOEFL', 'TOEIC']