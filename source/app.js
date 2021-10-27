import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainStack from '../source/routes/mainStack';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseConfig from './firebase';
import FlashMessage from 'react-native-flash-message';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        const auth = firebaseConfig.auth()
        auth.onAuthStateChanged((user) => {
            if (user != null) {
                updateAuthState(true)
                setIsLoading(false)
            }
            else {
                updateAuthState(false)
                setIsLoading(false)
            }
        })
    }, [])
    const updateAuthState = (stt) => {
        setIsLoggedIn(stt)
    }

    if (isLoading) {
        return (
            <SplashScreen />
        )
    }
    return (
        <NavigationContainer>
            {
                isLoggedIn == true ?
                    (
                        <MainStack />
                    ) :
                    (<AuthStack />)
            }
            <FlashMessage position={'top'} />
        </NavigationContainer>
    )

}