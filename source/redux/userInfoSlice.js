import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initValue = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    tokens: {
        access: {
            token: '',
            expire: ''
        },
        refresh: {
            token: '',
            expire: ''
        }
    }
}
export const userInfoSlice = createSlice({
    name: 'userInfoState',
    initialState: initValue,
    reducers: {
        setUserInfoAction: (state, action) => {
            const data = action.payload
            state.id = data.id;
            state.name = data.name;
            state.email = data.email;
            state.avatar = data.avatar;
            console.log('Update user info action', data);
        },
        updateAvatarAction: (state, action) => {
            state.avatar = action.payload.avatar;
            console.log('Update user avatar action');
        },
        setTokens: (state, action) => {
            state.tokens = action.payload
            console.log('Update user token action');
        },
        resetData: (state) => {
            state = initValue
            console.log('Reset user info action')
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfoAction, setTokens, resetData, updateAvatarAction } = userInfoSlice.actions

export default userInfoSlice.reducer