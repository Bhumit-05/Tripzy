import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name : "transactions",
    initialState : {
        userTransactions : [],
        tripTransactions : []
    },
    reducers : {
        setUserTransactions : (state, action) => {
            state.userTransactions = action.payload;
        },
        setTripTransactions : (state, action) => {
            state.tripTransactions = action.payload;
        }
    }
})

export const { setTripTransactions, setUserTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;