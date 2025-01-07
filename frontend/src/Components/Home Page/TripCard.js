import React from 'react'
import { useNavigate } from 'react-router'

const TripCard = (trip) => {

    const Navigate = useNavigate();

    const handleClick = () => {
        Navigate(`/trip/${trip.trip._id}`);
    }
    
    return (
        <div onClick={handleClick} className='border-2 border-black h-40 mb-20 mx-60 rounded-3xl hover:scale-105 transition-all duration-300 '>
            <h1>{trip.trip.name}</h1>
        </div>
    )
}

export default TripCard;