import { UserInfoSchema } from "./userInfo"
const RealmConfig = {
    path: 'userDB.realm',
    schema: [UserInfoSchema]
}

export default RealmConfig;