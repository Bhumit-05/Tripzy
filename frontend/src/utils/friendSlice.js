import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name : 'friends',
    initialState : {
        friendList : []
    },
    reducers : {
        addFriendList : (state, action) => {
            state.friendList = action.payload;
        }
    }
})

export const {addFriendList} = friendSlice.actions;
export default friendSlice.reducer;