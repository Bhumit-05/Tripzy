import React from 'react'
import useGetActivities from '../../../hooks/useGetActivities';
import CrossCheckbox from '../../../Extra Components/CrossCheckbox';

const RemoveActivity = ({activityId, tripId}) => {

    const getActivities = useGetActivities(tripId);
    
    const handleDelete = async () => {
        const res = await fetch("http://localhost:4000/activity", {
            method : "DELETE",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            },
            body : JSON.stringify({
                activityId : activityId
            })
        })
        getActivities();
    }
    
  return (
    <div>
        <CrossCheckbox checked={true} onChange={handleDelete} />
    </div>
  )
}

export default RemoveActivity;