import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { formatTheDate } from '../../utils/dateFormatter';

const TripCard = ({trip}) => {

    const Navigate = useNavigate();
    const [statusColor, setStatusColor] = useState('');
    const [statusMessage, setMessage] = useState("");

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(trip?.startDate);
        const endDate = new Date(trip?.endDate);

        if(today>=startDate && today<=endDate){
            setStatusColor('bg-yellow-500');
            setMessage("In Progress");
        }
        else if(today>endDate){
            setStatusColor('bg-green-600');
            setMessage("Completed");
        }
        else{
            setStatusColor('bg-gray-500');
            setMessage("Not Started");
        }
    }, [trip, statusColor])

    const handleClick = () => {
        Navigate(`/trip/${trip._id}`);
    }
    
    return (
        <div className='mx-auto max-w-fit '>
            <div onClick={handleClick} className='border border-gray-300 bg-white shadow-lg hover:shadow-xl cursor-pointer w-80 h-80 mx-auto rounded-2xl hover:scale-105 transition-all duration-500 my-10'>
                <h1 className='mx-auto max-w-fit mt-7 text-3xl mb-3'>{trip?.name}</h1>

                <div className="mx-auto max-w-fit space-y-3">
                    <p className="flex justify-start w-full gap-1">
                        <span className="w-24 font-medium">Destination:</span>
                        <span>{trip?.destination}</span>
                    </p>
                    <p className="flex justify-start w-full gap-1">
                        <span className="w-24 font-medium">Created at:</span>
                        <span>{formatTheDate(trip?.createdAt)}</span>
                    </p>
                    <p className="flex justify-start w-full gap-1">
                        <span className="w-24 font-medium">Currency:</span>
                        <span>{trip?.currencyCode}</span>
                    </p>
                    <p className="flex justify-start w-full gap-1">
                        <span className="w-24 font-medium">Start Date:</span>
                        <span>{formatTheDate(trip?.startDate)}</span>
                    </p>
                    <p className="flex justify-start w-full gap-0">
                        <span className="w-24 font-medium">End Date:</span>
                        <span>{formatTheDate(trip?.endDate)}</span>
                    </p>
                    <p className="flex justify-start w-full gap-0">
                        <span className="w-24 font-medium mt-2">Status:</span>
                        <span className={` w-24 p-1 max-w-fit mt-1 rounded-xl text-white ${statusColor}`}>{statusMessage}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TripCard;