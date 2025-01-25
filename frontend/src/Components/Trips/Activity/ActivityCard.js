import React, { useEffect, useState } from 'react'
import Checkbox from '../../../Extra Components/Checkbox';
import { useSelector } from 'react-redux';
import RemoveActivity from './RemoveActivity';

const ActivityCard = (Activity) => {

    const [isChecked, setIsChecked] = useState(false);

    Activity = Activity?.Activity;
    const date = new Date(Activity?.date);
    const activityId = Activity?._id;
    const edit = useSelector(state => state.user.editActivityButton);
    const tripId = Activity.tripId;
    const formattedDate = date.toLocaleDateString("en-GB")

    const getState = async () => {
        const res = await fetch(`http://localhost:4000/activity/getState/${activityId}`, {
            method : "GET",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            }
        });
        const json = await res.json();
        setIsChecked(json.status);
    }

    const handleCheckboxChange = async () => {
        const res = await fetch(`http://localhost:4000/activity/setState/${activityId}`, {
            method : "POST",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                status : !isChecked
            })
        })
        const json = await res.json();
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        getState();
    }, [])

    return (
        <div className="w-80 h-20 bg-white text-black rounded-lg border border-gray-300 shadow-md flex justify-between items-center px-6 py-4 hover:shadow-lg hover:scale-105 hover:border-gray-400 transition-all duration-300 mb-2">

            <div className="flex flex-col justify-center">
                <p className="text-xl font-light">{Activity?.activity}</p>
                <span className="text-sm text-gray-500 mt-1">{formattedDate}</span>
            </div>
            
            <div className="flex items-center space-x-4">
                {edit ? (
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                ) : (
                <RemoveActivity activityId={activityId} tripId={tripId} />
                )}
            </div>
        </div>
    )
}

export default ActivityCard;