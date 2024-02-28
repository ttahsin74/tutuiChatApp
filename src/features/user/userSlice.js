import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoginInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      addLoginUserInfo: (state, action)=>{
        console.log(state.userLoginInfo);
        state.userLoginInfo=action.payload
      }
    },
  })

export const {addLoginUserInfo} = userSlice.actions
  export default userSlice.reducer