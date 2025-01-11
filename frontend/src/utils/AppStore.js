import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./rootReducer";

const AppStore = configureStore({
    reducer : rootReducer
})

export default AppStore;