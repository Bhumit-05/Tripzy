import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useGetActivities from '../../../hooks/useGetActivities';
import ActivityCard from './ActivityCard';
import { toggleEditActivityButton, toggleShowActivities } from '../../../utils/userSlice';
import ActivityFilter from './ActivityFilter';
import { formatTheDate } from '../../../utils/dateFormatter';
import AddActivity from './AddActivity';

const Activities = (tripId) => {

  let activities = useSelector(state => state.trips.activities);
  const duplicateActivities = activities;
  const showActivities = useSelector(state => state.user.showActivities);
  const filterDate = useSelector(state => state.trips.activitiesDate);

  const getActivities = useGetActivities(tripId.tripId);
  const edit = useSelector(state => state.user.editActivityButton);
  const dispatch = useDispatch();

  if(filterDate!== "All"){
    activities = duplicateActivities.filter(activity => formatTheDate(activity?.date)===filterDate);
  }
  else{
    activities = duplicateActivities;
  }

  const sortedActivities = [...activities].sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    getActivities();
  }, [])
  
  const handleEditClick = () => {
    dispatch(toggleEditActivityButton());
  }

  const handleShowActivitiesClick = () => {
    dispatch(toggleShowActivities());
  }

  return (
    <div>
      <h1 className='mt-10 border-b-2 border-gray-500 text-3xl mb-20 mx-auto max-w-fit'>Activities</h1>

      <AddActivity/>

      <button
        onClick={handleShowActivitiesClick}
        className="w-96 h-12 border border-gray-500 rounded-lg flex justify-between items-center px-4 bg-gray-100 hover:bg-gray-200 transition duration-200">
          <span className='text-xl font-normal'>Activities</span>
          <span>{showActivities ? "▲" : "▼"}</span>
      </button>

      {showActivities && (
        <>
        <div className='mt-2 w-96 border border-gray-500 rounded-lg bg-gray-100 p-2'>
          {activities.length>0 && <> 
            <ActivityFilter/> 
            <div className='mx-auto max-w-fit'>
              {sortedActivities.map(activity => <ActivityCard key={activity._id} Activity={activity}/>)}
            </div>
          </>}

        </div>

        {activities.length>0 && 
          <div className="flex justify-center ">
            <button 
              onClick={handleEditClick}
              className="bg-blue-500 duration-300 my-8 h-10 w-20 hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
              {edit? "Edit" : "Done"}
            </button>
          </div>}
          </>
      )}

      {!showActivities && <div className='mb-10'></div>}

    </div>
  )
}

export default Activities;