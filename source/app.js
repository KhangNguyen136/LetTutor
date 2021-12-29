import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainStack from '../source/routes/mainStack';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { loggedIn, loggedOut } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoFromDB } from './bussiness/UserInfoServices';
import { setUserInfoAction, setTokens } from './redux/userInfoSlice';

export default function App() {
    const isLoggedIn = useSelector(state => state.authState.isLoggedIn)
    const [isLoading, setIsLoading] = React.useState(true)
    const dispatch = useDispatch();
    const getUserInfo = async () => {
        const userInfo = await getUserInfoFromDB();
        if (userInfo.length != 0) {
            const data = userInfo[0]
            const tokens = {
                access: {
                    token: data.accessToken,
                    expire: data.expireAccess
                },
                refresh: {
                    token: data.refreshToken,
                    expire: data.expireRefresh
                }
            }
            dispatch(setUserInfoAction(data));
            dispatch(setTokens(tokens));
            dispatch(loggedIn());
        }
        else
            dispatch(loggedOut());
        setIsLoading(false);
    }
    React.useEffect(() => {
        getUserInfo()
    }, [])

    if (isLoading) {
        return (
            <SplashScreen />
        )
    }
    return (
        <NavigationContainer>
            {
                isLoggedIn ?
                    (
                        <MainStack />
                    ) :
                    (<AuthStack />)
            }
            <FlashMessage position={'top'} />
        </NavigationContainer>
    )

}