import React from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { GetIcon } from './button';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MyDateTimePicker({ title, mode, value, onChageValue }) {
    // const [date, setDate] = React.useState(value)
    const isIOS = Platform.OS === 'ios';

    const AndroidDateTimePicker = () => {
        const [show, setShow] = React.useState(false)
        const onChangeAndroid = (event, selectedDate) => {
            setShow(false)
            const currentDate = selectedDate || date;
            // setDate(currentDate)
            onChageValue(currentDate)
        }
        return (
            <View>
                <Button title={date.toLocaleDateString()} onPress={() => setShow(true)} />
                {show &&
                    <DateTimePicker
                        testID="dateTimePickerAndroid"
                        value={value}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeAndroid}
                    />
                }
            </View>
        )
    }
    const onChangeIOS = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setDate(currentDate)
        onChageValue(currentDate)
    }


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }} >
            <Text style={{ marginHorizontal: 5, fontSize: 16, fontWeight: '600' }} >{title}</Text>
            {
                isIOS ?
                    <DateTimePicker
                        // testID="dateTimePickerIOS"
                        value={value}
                        mode={'date'}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeIOS}
                        style={{ width: 130 }}
                    /> :
                    <AndroidDateTimePicker />
            }

        </View>
    )
}

