import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name : "currency",
    initialState : {
        currencies : [],
        userCurrency : null,
        tripCurrency : null
    },
    reducers : {
        addCurrencies : (state, action) => {
            state.currencies = action.payload;
        },
        addUserCurrencyDetails : (state, action) => {
            state.userCurrency = action.payload;
        },
        addTripCurrencyDetails : (state, action) => {
            state.tripCurrency = action.payload;
        }
    }
})

export const {addCurrencies, addTripCurrencyDetails, addUserCurrencyDetails} = currencySlice.actions;
export default currencySlice.reducer;