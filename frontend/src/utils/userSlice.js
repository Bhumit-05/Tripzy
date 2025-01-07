import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        refresh : 0,
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
        }
    }
})

export const {addUser, removeUser, triggerRefresh} = userSlice.actions;
export default userSlice.reducer;
