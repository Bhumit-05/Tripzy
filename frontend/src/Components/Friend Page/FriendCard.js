import React from 'react'
import { useDispatch } from 'react-redux';
import { removeFriend } from '../../utils/friendSlice';
import useGetFriends from '../../hooks/useGetFriends';

const FriendCard = (friend) => {
  const dispatch = useDispatch();
  const getFriends = useGetFriends();

  const handleClick = async () => {

    const friendName = friend.friend.username;

    const res = await fetch("https://tripzy-1.onrender.com/friends",{
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
  }

  return (
    <div className="w-[80%]  mx-auto bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl flex items-center shadow-md mb-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="p-4">
        <img
          src={friend.friend.dp_url}
          alt="dp"
          className="h-16 w-16 lg:h-20 lg:w-20 border-4 border-gray-200 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow pl-4">
        <h1 className="text-lg lg:text-xl font-semibold text-gray-800">
          {friend.friend.username || "Username"}
        </h1>
        <h2 className="text-sm lg:text-base text-gray-500">
          {friend.friend.fullName || "Full Name"}
        </h2>
      </div>
      <div className="pr-4">
        <button
          onClick={handleClick}
          className="bg-red-500 text-sm lg:text-base text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 active:scale-95">
          Remove
        </button>
      </div>
    </div>

  )
}

export default FriendCard;