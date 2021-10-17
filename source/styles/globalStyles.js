import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignSelf: 'center',
            width: '99%',
        },
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        authBtnContainer: {
            backgroundColor: '#3399ff',
            width: '96%',
            alignSelf: 'center',
        },
        avt: {
            width: 80,
            height: 80,
            borderRadius: 8,
        },
        titleName: { fontWeight: '600', fontSize: 16 },
        rowContainer: {
            flexDirection: 'row', alignItems: 'center', padding: 5,
            flex: 1
        }
    }
);

export const myHeaderStyle = {
    headerTitleAlgin: 'center',
}

export function formatAmount(number, haveUnit = true) {
    var temp = String(number)
    const n = temp.length
    var newN = n
    var end = n - 1
    if (n < 4)
        return haveUnit ? temp + " vnđ" : temp
    for (let id = n - 3; id > 0; id = id - 3) {
        temp = temp.substring(0, id) + '.' + temp.substring(id, newN)
        newN++
    }
    return haveUnit ? temp + " vnđ" : temp
}