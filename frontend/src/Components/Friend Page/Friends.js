import React, { useRef, useState } from 'react'
import Header from '../Header';
import Input from '../../Extra Components/TextField';
import FriendList from './FriendList';
import useGetFriends from '../../hooks/useGetFriends';

const Friends = () => {

  const [addMessage, setAddMessage] = useState("");
  const username = useRef("");
  const getFriends = useGetFriends();

  const handleClick = async () => {
    const enteredUsername = username.current.value || "";

    const res = await fetch("http://localhost:4000/friends", {
      method : "POST",
      headers : {
        "content-type" : "application/json",
        "token" : localStorage.getItem("token")
      },
      body : JSON.stringify({
        "friendName" : enteredUsername
      })
    })

    getFriends();
    const json = await res.json();
    setAddMessage(json.message);
  }

  return (
    <div className="font-thin">
      <Header />
      <h1 className="max-w-fit mt-44 mx-auto text-center text-3xl lg:text-5xl my-16 text-gray-800 tracking-wide">
        Share the Adventure with Your Closest Companions!
      </h1>

      <div className="bg-gradient-to-r from-white to-gray-100 shadow-lg border border-gray-300 w-full max-w-md mx-auto rounded-2xl p-6">
        <h1 className="text-center text-2xl lg:text-3xl font-extralight text-gray-700 my-6">
          Add Friend
        </h1>
        <form onSubmit={(e) => e.preventDefault()} className="w-full mx-auto mb-4 flex flex-col sm:flex-row items-center gap-4">
          <Input 
            ref={username}
            className="w-full sm:w-auto h-[50px] px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Username"
          />
          <button 
            onClick={handleClick}
            className="w-[80px] h-[50px] bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300 transform active:scale-95">
            Add
          </button>
        </form>

        <div className="mt-6 text-center">
          <h1 className={`text-lg font-normal ${addMessage ? 'text-blue-600' : 'text-gray-500'}`}>
            {addMessage || "Enter a username to add a friend."}
          </h1>
        </div>
      </div>

      <h1 className="mx-auto text-center text-4xl text-gray-800 mt-24 mb-12 tracking-wide border-b-2 border-gray-300 pb-2">
        Friend List
      </h1>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <FriendList />
      </div>
    </div>
  )
}

export default Friends;