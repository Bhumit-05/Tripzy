import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./userSlice";

const AppStore = configureStore({
    reducers : {
        user : userSlice
    }
})