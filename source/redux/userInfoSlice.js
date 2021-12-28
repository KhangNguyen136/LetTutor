import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userInfoSlice = createSlice({
    name: 'userInfoState',
    initialState: {
        id: '',
        name: '',
        email: '',
        avt: '',
    },
    reducers: {
        setInfoAction: (state, action) => {
            state = action.payload
            console.log(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setInfoAction } = userInfoSlice.actions

export default userInfoSlice.reducer