import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainBottomRoute from './routes/mainBottomRoute';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import firebaseConfig from './firebaseConfig';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        const auth = firebaseConfig.auth()
        auth.onAuthStateChanged((user) => {
            if (user != null) {
                setIsLoggedIn(true)
                setIsLoading(false)
            }
            else {
                setIsLoggedIn(false)
                setIsLoading(false)
            }
        })
    }, [])

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
                        <MainBottomRoute />
                    ) :
                    (<AuthStack />)
            }
        </NavigationContainer>
    )

}