import RealmConfig from "../models";
import Realm from "realm";


export async function getUserInfoFromDB() {
    const realm = await Realm.open(RealmConfig);
    const userInfo = realm.objects('User');
    return userInfo;
}

export async function saveUserInfoToDB(data) {
    try {
        const realm = await Realm.open(RealmConfig);
        const userInfoResult = realm.objects('User');
        const user = data.user;
        const tokens = data.tokens;
        realm.write(() => {
            if (userInfoResult.length == 0)
                realm.create('User', {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    accessToken: tokens.access.token,
                    expireAccess: tokens.access.expires,
                    refreshToken: tokens.refresh.token,
                    expireRefresh: tokens.refresh.expires,
                })
            else {
                const userInfo = userInfoResult[0];
                userInfo.id = user.id
                userInfo.name = user.name;
                userInfo.email = user.email;
                userInfo.accessToken = tokens.access.token;
                userInfo.expireAccess = tokens.access.expires;
                userInfo.refreshToken = tokens.refresh.token;
                userInfo.expireRefresh = tokens.refresh.expires;
            }
        });
        // realm.close();
    } catch (error) {
        console.log('Save userInfo error: ' + error);
    }


}

export async function resetDB() {
    const realm = await Realm.open(RealmConfig);
    realm.write(() => {
        realm.deleteAll();
    })
    realm.close();

}