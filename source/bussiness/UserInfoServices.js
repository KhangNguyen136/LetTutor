import RealmConfig from "../models";
import Realm from "realm";


export async function getUserInfoFromDB() {
    const realm = await Realm.open(RealmConfig);
    const userInfo = realm.objects('User');
    return userInfo;
}


export async function saveTokenToDB(tokens) {
    console.log(tokens);
    try {
        const realm = await Realm.open(RealmConfig);
        const userInfoResult = realm.objects('User');
        realm.write(() => {

            if (userInfoResult.length == 0) {
                console.log('Create new');
                realm.create('User', {
                    accessToken: tokens.access.token,
                    expireAccess: tokens.access.expires,
                    refreshToken: tokens.refresh.token,
                    expireRefresh: tokens.refresh.expires,
                });
            }
            else {
                const userInfo = userInfoResult[0];
                userInfo.accessToken = tokens.access.token;
                userInfo.expireAccess = tokens.access.expires;
                userInfo.refreshToken = tokens.refresh.token;
                userInfo.expireRefresh = tokens.refresh.expires;
            }
        })
        return true;
    } catch (error) {
        console.log('Save tokens error: ' + error);
    }
}

export async function resetDB() {
    const realm = await Realm.open(RealmConfig);
    realm.write(() => {
        realm.deleteAll();
    })
    realm.close();

}