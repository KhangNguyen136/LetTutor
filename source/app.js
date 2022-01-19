import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainStack from '../source/routes/mainStack';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { loggedIn, loggedOut } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfoAction, setTokens } from './redux/userInfoSlice';
import { checkToken, reFreshToken } from './services/refreshToken';
import { initDB, saveTokenToDB, ResetDB } from './services/database';

export default function App() {
    const isLoggedIn = useSelector(state => state.authState.isLoggedIn)
    const [isLoading, setIsLoading] = React.useState(true)
    var isValidToken = null;
    var refreshToken = null;
    const dispatch = useDispatch();

    const getUserInfo = async (accessToken, refreshToken) => {
        if (accessToken != null) {
            isValidToken = await checkToken(accessToken);
            if (isValidToken != null) {
                // if (false) {
                const tokens = {
                    access: {
                        token: accessToken,
                        expire: ''
                    },
                    refresh: {
                        token: refreshToken,
                        expire: ''
                    }
                }
                dispatch(setUserInfoAction(isValidToken.user));
                dispatch(setTokens(tokens));
                dispatch(loggedIn());
            }
            else {
                refreshTokenRes = await reFreshToken(refreshToken, 7);
                if (refreshTokenRes != null) {
                    dispatch(setUserInfoAction(refreshTokenRes.user));
                    dispatch(setTokens(refreshTokenRes.tokens));
                    saveTokenToDB(refreshTokenRes.tokens.access.token, refreshTokenRes.tokens.refresh.token);
                    dispatch(loggedIn());
                }
                else {
                    showMessage({ type: 'warning', message: 'Token expired' });
                    dispatch(loggedOut());
                    ResetDB();
                }
            }
        }
        else
            dispatch(loggedOut());
        setIsLoading(false);
    }
    React.useEffect(() => {
        initDB(getUserInfo);
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