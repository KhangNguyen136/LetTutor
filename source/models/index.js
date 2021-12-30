import { UserInfoSchema } from "./userInfoRealm"
const RealmConfig = {
    path: 'userDB.realm',
    schema: [UserInfoSchema]
}

export default RealmConfig;