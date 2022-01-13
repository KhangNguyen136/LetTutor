import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainStack from '../source/routes/mainStack';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { loggedIn, loggedOut } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoFromDB, saveTokenToDB, resetDB } from './bussiness/UserInfoServices';
import { setUserInfoAction, setTokens } from './redux/userInfoSlice';
import { checkToken, reFreshToken } from './services/refreshToken';

export default function App() {
    const isLoggedIn = useSelector(state => state.authState.isLoggedIn)
    const [isLoading, setIsLoading] = React.useState(true)
    var isValidToken = false;
    var refreshToken = null;
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        const userInfo = await getUserInfoFromDB();
        if (userInfo.length != 0) {
            const data = userInfo[0];
            const getUserInfo = await checkToken(data.accessToken);
            if (getUserInfo != null) {
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
                dispatch(setUserInfoAction(getUserInfo.user));
                dispatch(setTokens(tokens));
                dispatch(loggedIn());
            }
            else {
                if (data.refreshToken == undefined) {
                    console.log('DB error!')
                    dispatch(loggedOut());
                    resetDB();
                    return
                }
                refreshToken = await reFreshToken(data.refreshToken, 7);
                if (refreshToken != null) {
                    dispatch(setUserInfoAction(refreshToken.user));
                    dispatch(setTokens(refreshToken.tokens));
                    saveTokenToDB(refreshToken.tokens);
                    dispatch(loggedIn());
                }
                else {
                    showMessage({ type: 'warning', message: 'Token expired' });
                    // resetDB();
                    dispatch(loggedOut());
                    resetDB();
                }
            }
        }
        else
            dispatch(loggedOut());
        setIsLoading(false);
    }
    React.useEffect(() => {
        getUserInfo()
        return () => {
            isValidToken = false;
            refreshToken = null;
        }
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