import Realm from "realm"
export const UserInfoSchema = {
    name: 'User',
    properties: {
        id: 'string',
        name: 'string',
        email: 'string',
        avatar: 'string',
        accessToken: 'string',
        expireAccess: 'string',
        refreshToken: 'string',
        expireRefresh: 'string',
    }
};
