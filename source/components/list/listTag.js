import React from 'react';
import { FlatList } from 'react-native';
import Tag from '../tag';

export default function ListTag({ tags, numColumns = 3, horizontal = true }) {

    return (
        <FlatList data={tags}
            horizontal={horizontal}
            renderItem={Tag}
            // numColumns={3}

            keyExtractor={item => item}
        // columnWrapperStyle={ }

        // contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
        />
    )
}

