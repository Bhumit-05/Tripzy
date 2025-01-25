import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useGetActivities from '../../../hooks/useGetActivities';

const AddActivity = () => {

    const activity = useRef("");
    const tripId = useSelector(state => state.trips.tripId);
    const getActivities = useGetActivities(tripId);
    const date = useRef(null);
    const [message, setMessage] = useState("Create an activity");

    const reset = () => {
        setTimeout(() => {
            setMessage("Create an Activity");
        }, 5000)
    }

    const handleClick = async () => {

        if(!activity.current.value || !date.current.value){
          setMessage("Enter correct details");
          return;
        }
        
        const res = await fetch("http://localhost:4000/activity", {
          method : "POST",
          headers : {
            "content-type" : "application/json",
            "token" : localStorage.getItem("token")
          },
          body : JSON.stringify({
            activity : activity.current.value,
            date : date.current.value,
            tripId : tripId
          })
        })
        const json = await res.json();
        setMessage(json.message);
    
        getActivities();
    }

  return (
    <div className='border border-gray-300 shadow-md w-80 h-56 sm:mb-44 rounded-2xl mb-20 mx-auto '>
        <form 
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-fit flex flex-col text-lg justify-between h-full py-4">
        <input
            ref={activity}
            placeholder="Activity"
            className="pl-2 h-10 border border-gray-400 rounded-md"
        />
        <input
        ref={date}
            type="date"
            className="px-2 h-10 text-sm text-gray-600 block border border-gray-400 rounded-md"
        />
        <button 
            onClick={() => {
            handleClick();
            reset();
            }}
            className="bg-blue-500 duration-300 h-10 w-20 mx-auto hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
            Add
        </button>

        <p
            className='mx-auto max-w-fit text-blue-500'>
            {message}
        </p>
        </form>
  </div>
  )
}

export default AddActivity;