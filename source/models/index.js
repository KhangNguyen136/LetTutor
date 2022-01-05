import { UserInfoSchema } from "./userInfoRealm"
const RealmConfig = {
    path: 'userDB',
    schema: [UserInfoSchema]
}

export default RealmConfig;