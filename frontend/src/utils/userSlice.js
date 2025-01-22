import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        refresh : 0,
        editActivityButton : true,
        editTransactionsButton : true,
        showTripTransactions : false,
        showUserTransactions : false,
    },
    reducers : {
        addUser : (state, action) => {
            state.user = action.payload;
        },
        removeUser : (state, action) =>  {
            state.user = null;
        },
        triggerRefresh : (state) => {
            state.refresh += 1;
        },
        toggleEditActivityButton : (state) => {
            state.editActivityButton = !state.editActivityButton;
        },
        toggleEditTransactionButton : (state) => {
            state.editTransactionsButton = !state.editTransactionsButton;
        },
        toggleShowTripTransac : (state) => {
            state.showTripTransactions = !state.showTripTransactions;
        },
        toggleShowUserTransac : (state) => {
            state.showUserTransactions = !state.showUserTransactions;
        }
    }
})

export const {addUser, removeUser, triggerRefresh, toggleEditActivityButton, toggleEditTransactionButton, toggleShowUserTransac, toggleShowTripTransac} = userSlice.actions;
export default userSlice.reducer;
