import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../utils/tripsSlice';

const useGetActivities = (tripId) => {

    const dispatch = useDispatch();
    const activities = useSelector(state => state.trips.activities);

    const getActivities = async () => {
        const res = await fetch(`http://localhost:4000/activity/${tripId.tripId}`, {
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        const json = await res.json();
        dispatch(addActivity(json.activities));
    }

    useEffect (() => {
        if(activities.length === 0){
            getActivities()
        }
    }, [activities.length])

    return getActivities;
}

export default useGetActivities;