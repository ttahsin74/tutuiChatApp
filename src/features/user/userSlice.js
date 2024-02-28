import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoginInfo: null,
}

export const counterSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
      addLoginUserInfo: (state, action)=>{
        
      }
    },
  })


  export default counterSlice.reducer