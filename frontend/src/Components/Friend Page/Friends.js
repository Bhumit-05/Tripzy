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
      <h1 className="max-w-fit mx-auto lg:text-5xl text-2xl my-[100px]">Share the Adventure with Your Closest Companions!</h1>

      <div className="border-black border-2 shadow-2xl w-full max-w-md mx-auto rounded-3xl px-4">
        <h1 className="mx-auto max-w-fit lg:text-4xl text-2xl my-10">Add Friend</h1>
        <div className="w-full mx-auto mb-4 flex flex-col sm:flex-row items-center gap-2">
          <Input 
            ref={username}
            className="w-full sm:w-auto h-[50px]" 
          />
          <button 
            onClick={handleClick}
            className="w-[80px] h-[50px] duration-300 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform active:scale-95">
            Add
          </button>
        </div>

        <div className="w-full mt-6 mb-6 min-h-[30px]">
          <h1 className="text-red-500 text-lg font-normal text-center">
            {addMessage}
          </h1>
        </div>
      </div>

      <h1 className='mx-auto max-w-fit mt-[150px] lg:text-4xl text-3xl border-b-2 border-gray-500 mb-[100px]'>Friend List</h1>
      <FriendList/>
    </div>
  )
}

export default Friends;