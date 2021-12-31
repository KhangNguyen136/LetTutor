import React from 'react';
import SplashScreen from './screens/SplashScreen';
import MainStack from '../source/routes/mainStack';
import AuthStack from './routes/authStack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { loggedIn, loggedOut } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoFromDB, updateToken } from './bussiness/UserInfoServices';
import { setUserInfoAction, setTokens } from './redux/userInfoSlice';
import { checkToken, reFreshToken } from './bussiness/refreshToken';
import { serverUrl } from './const';
import errorHandle from './bussiness/errorHanle';

export default function App() {
    const isLoggedIn = useSelector(state => state.authState.isLoggedIn)
    const [isLoading, setIsLoading] = React.useState(true)
    const dispatch = useDispatch();

    const getUserInfo = async () => {
        const userInfo = await getUserInfoFromDB();
        console.log(userInfo);
        if (userInfo.length != 0) {
            const data = userInfo[0];
            const isValidToken = await checkToken(data.accessToken);
            if (isValidToken) {
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
            else {
                const refreshTokenRes = await reFreshToken(data.refreshToken, 7);
                console.log(refreshTokenRes);
                if (refreshTokenRes != null) {
                    dispatch(setUserInfoAction(data));
                    dispatch(setTokens(refreshTokenRes));
                    dispatch(loggedIn());
                }
                else {
                    showMessage({ type: 'warning', message: 'Token expired' })
                    dispatch(loggedOut());
                }
            }
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