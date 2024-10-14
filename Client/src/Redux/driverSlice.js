import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice(
    {
        name:"driver",
        initialState:{
            drivertoken : null,
            driver_name : null,
        },
        reducers:{
            driverlogin:(state,action)=>{
                state.drivertoken = action.payload;
                state.driver_name = action.payload.driver_name;
            },
            driverlogout:(state)=>{
                state.drivertoken = null;
                state.driver_name = null;
            }
        }
    }
)

export const {driverlogin,driverlogout} = driverSlice.actions;
export default driverSlice.reducer;