import { StyleSheet, Platform } from 'react-native';

export const globalStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignSelf: 'center',
            width: '100%',
        },
        loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            opacity: 0.5,
            zIndex: 2,
        },
        authBtnContainer: {
            backgroundColor: '#3399ff',
            width: '69%',
            alignSelf: 'center',
        },
        avt: {
            width: 80,
            height: 80,
            borderRadius: 8,
            margin: 5
        },
        titleName: { fontWeight: 'bold', fontSize: 18 },
        rowContainer: {
            flexDirection: 'row', alignItems: 'center', padding: 5,
            flex: 1
        },
        verticalDivide: {
            borderBottomWidth: 0.5, borderBottomColor: 'gray', paddingVertical: 3
        },
        horizontalDivide: {
            borderEndWidth: 0.5, borderEndColor: 'gray', paddingHorizontal: 3
        },
        guideLine: {
            padding: 3,
            borderColor: 'blue', borderWidth: 1, alignSelf: 'center',
            textAlign: 'center', fontWeight: '500', backgroundColor: '#81ecec',
            margin: 3
        },
        title1: {
            fontWeight: 'bold',
            margin: 3, color: '#0984e3', fontSize: 16
        },
        title2: {
            fontWeight: '600',
            margin: 4,
            fontSize: 16
        },
        button: {
            padding: 4, margin: 3, borderColor: '#0984e3',
            color: 'white', borderWidth: 1, backgroundColor: '#81ecec', textAlign: 'center', alignSelf: 'center'
        },
        error: { color: 'orange', marginLeft: 10, fontWeight: '500' },

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
        return haveUnit ? temp + " vn??" : temp
    for (let id = n - 3; id > 0; id = id - 3) {
        temp = temp.substring(0, id) + '.' + temp.substring(id, newN)
        newN++
    }
    return haveUnit ? temp + " vn??" : temp
}