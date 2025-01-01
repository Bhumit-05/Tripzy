import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFriend } from '../../utils/friendSlice';
import useGetFriends from '../../hooks/useGetFriends';

const FriendCard = (friend) => {
  const dispatch = useDispatch();
  const getFriends = useGetFriends();

  const handleClick = async () => {

    const friendName = friend.friend.username;

    const res = await fetch("http://localhost:4000/friends",{
      method : "DELETE",
      headers : {
        "token" : localStorage.getItem("token"),
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        "friendName" : friendName
      })
    })

    dispatch(removeFriend(friendName));
    const json = await res.json();
    getFriends();
    console.log(json);
  }

  return (
    <div className='w-[80%] h-[100px] border-black border-2 mx-auto rounded-2xl lg:w-[50%] flex flex-row items-center mb-10'>
      <img src={friend.friend.dp_url} alt='dp' className='h-[80px] w-[80px] rounded-full my-auto lg:ml-[80px] ml-[10px] lg:mr-[80px] mr-[20px]'/>
      <div className='flex flex-row  justify-between items-center w-full'>
        <div className='font-normal'>
          <h1>Username : {friend.friend.username}</h1>
          <h1>Name : {friend.friend.fullName}</h1>
        </div>
        <button
          onClick={handleClick}
          className='bg-red-600 h-fit p-2 rounded-2xl text-white hover:bg-red-700 duration-300 lg:mr-[90px] mr-[15px]'>
          Remove
        </button>
      </div>
    </div>
  )
}

export default FriendCard;