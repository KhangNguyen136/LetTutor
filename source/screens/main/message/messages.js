// import React from 'react';
// import { Text, SafeAreaView } from 'react-native';
// // import { SearchBar } from 'react-native-elements';
// import SearchBox from '../../../components/searchBar';
// import Card, { FlexCard } from '../../../components/card';
// import ListMessage from '../../../components/list/listMessage';
// import { globalStyles } from '../../../styles/globalStyles';

// export default function MessageScreen() {
//     const [searchKey, setSearchKey] = React.useState('');

//     const updateSearch = (key) => setSearchKey(key)
//     return (
//         <SafeAreaView style={globalStyles.container} >
//             <FlexCard>
//                 <SearchBox placeholder={"Search by tutor's name"} value={searchKey} textChange={updateSearch} />
//                 <ListMessage searchKey={searchKey} />
//             </FlexCard>
//         </SafeAreaView>
//     )
// }