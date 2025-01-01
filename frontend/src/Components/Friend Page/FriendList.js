import React from 'react'
import {  useSelector } from 'react-redux';
import FriendCard from './FriendCard';
import useGetFriends from '../../hooks/useGetFriends';

const FriendList = () => {

    useGetFriends();
    const friendList = useSelector(state => state.friends.friendList);

    return (
        <div>
            {friendList.length !== 0 ? 
            friendList.map(friend => <FriendCard key = {friend._id} friend={friend}/>)
             : null}
        </div>
    )
}

export default FriendList;