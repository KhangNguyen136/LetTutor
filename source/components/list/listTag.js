import React from 'react';
import { FlatList } from 'react-native';
import Tag from '../tag';

export default function ListTag({ tags, numColumns = 1, horizontal = true }) {

    return (
        <FlatList data={tags}
            horizontal={horizontal}
            renderItem={Tag}
            numColumns={numColumns}
            keyExtractor={item => item}
        />
    )
}

