import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import friendsReducer from './friendSlice';
import tripsReducer from './tripsSlice';
import currencyReducer from './currencySlice';

const appReducer = combineReducers({
  user : userReducer,
  friends : friendsReducer,
  trips : tripsReducer,
  currency : currencyReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
      state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;