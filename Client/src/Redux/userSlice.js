import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        name:"user",
        initialState:{
            token:null,
            user_name : null
        },
        reducers:{
            login:(state,action) =>{
                state.token = action.payload;
                state.user_name = action.payload.user_name;
            },
            logout:(state) =>{
                state.token = null;
                state.user_name = null;
            }
        }
    }
)

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;