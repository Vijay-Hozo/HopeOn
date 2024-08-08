import {createSlice} from "@reduxjs/toolkit";

const rideSlice = createSlice({
    name:"ride",
    initialState : {
        rides:[]
    },
    reducers : {
        addRide : (state,action) => {
            state.rides.push(action.payload);
        }
    }
})

export const {addRide} = rideSlice.actions;
export default rideSlice.reducer;