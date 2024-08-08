import {configureStore} from "@reduxjs/toolkit";
import rideSlice from '../Redux/createSlice';

const store = configureStore(
    {
        reducer : {
            ride : rideSlice,
        }
    }
)

export default store;