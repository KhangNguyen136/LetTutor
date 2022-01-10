import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { GetIcon } from '../button';
import { globalStyles } from '../../styles/globalStyles';
import { MyButton } from '../button';
import { TextCard } from '../card';
import Tag from '../tag';

export default function BookingDialog({ show, item, balance, callBack }) {
    const [request, setRequest] = React.useState('');
    const startTime = new Date(item.startPeriodTimestamp);
    const endTime = new Date(item.endPeriodTimestamp);
    if (show)
        return null
    return (
        <Portal>
            <Dialog onDismiss={() => callBack(false)} visible={show} stylestyle={{ width: '100%', alignSelf: 'center', padding: 10 }} >
                <Dialog.Content>
                    <View>
                        <View style={styles.rowItem} >
                            <GetIcon iconName={'calendar'} source={'AntDesign'} size={18} />
                            <Text style={globalStyles.title2}>Booking date:</Text>
                            <Text style={{ marginLeft: 4, fontSize: 16 }} >{startTime.toString().substring(0, 16)}</Text>
                        </View>
                        <View style={globalStyles.verticalDivide} />
                        <View style={styles.rowItem} >
                            <GetIcon iconName={'clockcircleo'} source={'AntDesign'} size={18} />
                            <Text style={globalStyles.title2}>Booking time:</Text>
                            <Text style={{ marginLeft: 4, fontSize: 16 }} >{startTime.toString().substring(16, 21)} - {endTime.toString().substring(16, 21)}</Text>
                        </View>
                        <View style={globalStyles.verticalDivide} />
                        <View style={styles.rowItem} >
                            <GetIcon iconName={'price-tag'} source={'Entypo'} size={18} />
                            <Text style={globalStyles.title2}>Price: </Text>
                            <Text style={{ marginLeft: 4, fontSize: 16 }} > 1 lesson</Text>
                        </View>
                        <View style={globalStyles.verticalDivide} />

                        <View style={styles.rowItem} >
                            <GetIcon iconName={'wallet'} source={'Entypo'} size={18} />
                            <Text style={globalStyles.title2} > Your balance: </Text>
                            <Text style={{ fontSize: 16 }} > {balance} {balance > 1 ? 'lessons' : 'lesson'} left</Text>
                        </View>
                        <View style={globalStyles.verticalDivide} />
                        <Text style={globalStyles.title2} >Request </Text>
                        <TextCard>
                            <TextInput value={request} onChangeText={setRequest} placeholder={'What you want the tutor know?'} multiline={true} style={{ minHeight: 80 }}
                            />
                        </TextCard>
                        <MyButton onPress={() => callBack(true)}
                            title={'Book'} moreStyle={globalStyles.authBtnContainer} moreTitleStyle={{ color: 'white' }} />
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row', alignItems: 'center',
        margin: 5
    }

})