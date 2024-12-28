import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFriendList } from '../../utils/friendSlice';
import FriendCard from './FriendCard';
import useGetFriends from '../../hooks/useGetFriends';

const FriendList = () => {

    useGetFriends();
    const friendList = useSelector(state => state.friends.friendList);

    return (
        <div>
            {friendList.length != 0 ? <FriendCard friend = {friendList[0]}/> : null}
        </div>
    )
}

export default FriendList;