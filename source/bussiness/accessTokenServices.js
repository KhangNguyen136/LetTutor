import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (value) => {
    try {
        await AsyncStorage.setItem('@token', value)
    } catch (e) {
        // savingerror
        console.log(e);
    }
}

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@token')
        return value;

    } catch (e) {
        // error reading value
        console.log(e);
        return null
    }
}
