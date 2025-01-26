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
            : <p className='text-center mb-20 pt-10 text-2xl'>Empty friend list: Your social circle is in stealth mode.</p>}
        </div>
    )
}

export default FriendList;