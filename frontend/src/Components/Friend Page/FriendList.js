import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFriendList } from '../../utils/friendSlice';
import FriendCard from './FriendCard';

const FriendList = () => {

    const dispatch = useDispatch();
    const friendList = useSelector(state => state.friends.friendList);

    const getList = async () => {
        const res = await fetch("http://localhost:4000/friends", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            }
        })

        const json = await res.json();
        dispatch(addFriendList(json));
    }    

    // Reducing API calls
    useEffect(() => {
        if(friendList.length === 0) getList();
    }, [])

    return (
        <div>
            {friendList.length != 0 ? <FriendCard friend = {friendList[0]}/> : null}
        </div>
    )
}

export default FriendList;