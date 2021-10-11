import React from 'react';
import { FlatList } from 'react-native';
import Tag from '../tag';

export default function ListTag({ tags, numColumns = 1 }) {

    return (
        <FlatList data={tags}
            horizontal={true}
            renderItem={Tag}
            numColumns={numColumns}
            keyExtractor={item => item}
        />
    )
}

