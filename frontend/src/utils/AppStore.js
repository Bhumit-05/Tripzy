import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import friendReducer from './friendSlice';

const AppStore = configureStore({
    reducer : {
        user : userReducer,
        friends : friendReducer
    }
})

export default AppStore;