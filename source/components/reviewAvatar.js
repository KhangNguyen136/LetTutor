import React from 'react';
import { View, Text, Image } from 'react-native';
import { MyButton } from './button';
import { Dialog, Portal } from 'react-native-paper';
import LoadingIndicator from './loadingIndicator';

export default function ReviewImage({ imgSrc, onCancel, onUpdate, show, loading }) {
    if (!show)
        return null

    return (
        <Portal>
            <Dialog visible={show} >
                <Dialog.Content>
                    {
                        loading &&
                        <LoadingIndicator />
                    }
                    <View style={{
                        alignSelf: 'center', padding: 10, margin: 10, alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: '600' }} >Review avatar</Text>
                        <Image source={{ uri: imgSrc.uri }} style={{ width: 200, height: 200, borderRadius: 100, margin: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 }}>
                            <MyButton title={'Update'} onPress={onUpdate} />
                            <MyButton title={'Cancel'} onPress={onCancel} moreStyle={{ borderWidth: 0.5, borderColor: 'blue', backgroundColor: '#dfe6e9' }} />
                        </View>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>

    )
}