import {configureStore} from "@reduxjs/toolkit";
import rideSlice from '../Redux/createSlice';
import userSlice from "./userSlice";
import driverSlice from "./driverSlice";

const store = configureStore(
    {
        reducer : {
            ride : rideSlice,
            user : userSlice,
            driver : driverSlice
        }
    }
)

export default store;