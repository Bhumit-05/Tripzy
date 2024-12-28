import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name : 'friends',
    initialState : {
        friendList : []
    },
    reducers : {
        addFriendList : (state, action) => {
            state.friendList = action.payload;
        },
        removeFriend : (state, action) => {
            state.friendList = state.friendList.filter(
                friend => friend.username !== action.payload
            );
        }
    }
})

export const {addFriendList, removeFriend} = friendSlice.actions;
export default friendSlice.reducer;