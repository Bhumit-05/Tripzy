import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useGetActivities from '../../../hooks/useGetActivities';
import ActivityCard from './ActivityCard';

const Activities = (tripId) => {

  const activity = useRef("");
  const date = useRef(null);
  const [message, setMessage] = useState("Create an activity");
  const activities = useSelector(state => state.trips.activities);

  const getActivities = useGetActivities(tripId);

  const handleClick = async () => {
    
    const res = await fetch("http://localhost:4000/activity", {
      method : "POST",
      headers : {
        "content-type" : "application/json",
        "token" : localStorage.getItem("token")
      },
      body : JSON.stringify({
        activity : activity.current.value,
        date : date.current.value,
        tripId : tripId.tripId
      })
    })
    const json = await res.json();
    setMessage(json.message);
    console.log(json);

    getActivities();
  }

  return (
    <div>
        <h1 className='border-b-2 border-gray-500 text-3xl mb-20 mx-auto max-w-fit'>Activities</h1>
        <div className='border-gray-500 border-2 w-80 h-56 rounded-2xl mb-20 mx-auto'>
          <form className="mx-auto max-w-fit flex flex-col text-lg justify-between h-full py-4">
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
              onClick={handleClick}
              className="bg-blue-500 duration-300 h-10 w-20 mx-auto hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
              Add
            </button>

            <p
              className='mx-auto max-w-fit text-blue-500'>
              {message}
            </p>
          </form>
        </div>
        {activities.map(activity => <ActivityCard key={activity._id} Activity={activity}/>)}
    </div>
  )
}

export default Activities;