import React from 'react'

const TripDetails = ({trip}) => {
    console.log(trip);
    const formattedStartDate = new Date(trip.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const formattedEndDate = new Date(trip.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

  return (
    <div>
        <div className='flex flex-row mb-5'>
            <h2 className='font-normal mr-5 text-xl'>Destination : </h2>
            <h2 className='text-xl'>{trip.destination}</h2>
        </div>
        <div className='flex flex-row mb-5'>
            <h2 className='font-normal mr-5 text-xl'>Start Date : </h2>
            <h2 className='text-xl'>{formattedStartDate}</h2>
        </div>
        <div className='flex flex-row mb-5'>
            <h2 className='font-normal mr-5 text-xl'>End Date : </h2>
            <h2 className='text-xl ml-2'>{formattedEndDate}</h2>
        </div>
    </div>
  )
}

export default TripDetails;