import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import friendReducer from './friendSlice';
import tripsReducer from './tripsSlice';

const appReducer = combineReducers({
    user : userReducer,
    friends : friendReducer,
    trips : tripsReducer
})

const rootReducer = (state, action) => {
    console.log("Action received in rootReducer:", action.type);
    if (action.type === 'RESET') {
      state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;