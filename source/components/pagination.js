import React from 'react';
import { TouchableOpacity, Text, FlatList, View } from 'react-native';
import { IconButton } from './button';

export default function MyPagination({ currentID, itemPerPage, setPage, totalItems }) {
    const maxPage = parseInt(totalItems / itemPerPage);
    const renderItem = ({ item }) => {
        const press = () => {
            setPage(item);
        }

        const color = currentID != item ? '#dfe6e9' : '#81ecec';
        return (
            <TouchableOpacity onPress={press} style={{ backgroundColor: color, padding: 5, borderRadius: 3, margin: 4 }} >
                <Text style={{ fontWeight: '600', fontSize: 14 }} >{item}</Text>
            </TouchableOpacity>
        )
    }
    const leftItem = () => {
        return (<View style={{ flexDirection: 'row', margin: 4 }}>

            <IconButton iconName={'doubleleft'} source={'AntDesign'}
                onPress={() => {
                    if (currentID != 1) {
                        setPage(1)
                    }
                }} />
            <IconButton iconName={'left'} source={'AntDesign'}
                onPress={() => setPage(currentID == 1 ? currentID : currentID - 1)} />
        </View>)
    }

    const rightItem = () => {
        return (<View style={{ flexDirection: 'row', margin: 4 }}>
            <IconButton iconName={'right'} source={'AntDesign'}
                onPress={() => {
                    if (currentID != maxPage)
                        setPage(currentID + 1)
                }} />
            <IconButton iconName={'doubleright'} source={'AntDesign'}
                onPress={() => {
                    if (currentID != maxPage) {
                        setPage(maxPage)
                    }
                }} />

        </View>)
    }
    return (
        <View style={{ alignItems: 'center', width: '100%', }} >
            <FlatList data={getData(maxPage)}
                // ListHeaderComponent={leftItem}
                // ListFooterComponent={rightItem}
                renderItem={renderItem}
                key={item => item.toString()}
                horizontal
            />
        </View>
    )
}

function getData(total) {
    const result = [];
    for (let i = 1; i <= total; i++) {
        result.push(i);
    }
    return result;
}