import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice(
    {
        name:"driver",
        initialState:{
            drivertoken : null
        },
        reducers:{
            driverlogin:(state,action)=>{
                state.drivertoken = action.payload;
            },
            driverlogout:(state)=>{
                state.drivertoken = null;
            }
        }
    }
)

export const {driverlogin,driverlogout} = driverSlice.actions;
export default driverSlice.reducer;