import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice(
    {
        name:"driver",
        initialState:{
            token : null
        },
        reducers:{
            driverlogin:(state,action)=>{
                state.token = action.payload.token;
            },
            driverlogout:(state)=>{
                state.token = null;
            }
        }
    }
)

export const {driverlogin,driverlogout} = driverSlice.actions;
export default driverSlice.reducer;