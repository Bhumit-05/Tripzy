import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        refresh : 0,
        editActivityButton : true
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
        }
    }
})

export const {addUser, removeUser, triggerRefresh, toggleEditActivityButton} = userSlice.actions;
export default userSlice.reducer;
