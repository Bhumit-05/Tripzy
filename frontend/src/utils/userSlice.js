import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        refresh : 0,
        editActivityButton : true,
        editTransactionsButton : false,
        showTripTransactions : false,
        showUserTransactions : false,
        showActivities : false,
        dp_url : null
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
        },
        toggleShowActivities : (state) => {
            state.showActivities = !state.showActivities;
        },
        setDpURL : (state, action) => {
            state.dp_url = action.payload;
        }
    }
})

export const {addUser, removeUser, triggerRefresh, toggleEditActivityButton, toggleEditTransactionButton, toggleShowUserTransac, toggleShowTripTransac, toggleShowActivities, setDpURL} = userSlice.actions;
export default userSlice.reducer;
