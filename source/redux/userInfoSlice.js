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
    },
    //
    isTutor: false,
    isApproving: false,
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
        setBecomeTutorState: (state, action) => {
            const data = action.payload;
            if (data.tutorInfo != null) {
                console.log('tutoInfo not null')
                state.isTutor = data.tutorInfo.isActived;
                state.isApproving = true;
            }
            else {
                state.isTutor = false;
                state.isApproving = false;
            }
        },
        updateAvatarAction: (state, action) => {
            state.avatar = action.payload.avatar;
            console.log('Update user avatar action');
        },
        setTokens: (state, action) => {
            state.tokens = action.payload
            console.log('Update user token action');
        },
        setApprovingAction: (state, action) => {
            state.isApproving = true;
            // state.isTutor = action.isApproving;
        },
        resetData: (state) => {
            state = initValue
            console.log('Reset user info action')
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfoAction, setTokens, resetData, updateAvatarAction, setApprovingAction, setBecomeTutorState } = userInfoSlice.actions

export default userInfoSlice.reducer