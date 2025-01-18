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
        <div className='w-[450px] h-20 border border-black text-xl flex items-center px-4 justify-between mb-10 rounded-lg hover:scale-105 hover:shadow-xl duration-300'>
            <p className='ml-4 font-normal'>{Activity?.activity}</p>
            <div className='mr-4'>{formattedDate}</div>
            <div className='mr-6'>
                {edit ? <Checkbox checked={isChecked} onChange={handleCheckboxChange} /> : <RemoveActivity activityId={activityId} tripId={tripId}/>}
            </div>
        </div>
    )
}

export default ActivityCard;