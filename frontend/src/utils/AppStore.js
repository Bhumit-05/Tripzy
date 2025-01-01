import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import friendReducer from './friendSlice';
import tripsReducer from './tripsSlice';

const AppStore = configureStore({
    reducer : {
        user : userReducer,
        friends : friendReducer,
        trips : tripsReducer
    }
})

export default AppStore;