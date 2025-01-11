import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Header from '../Header';
import useGetSingleTrip from '../../hooks/useGetSingleTrip';
import AddTraveller from './AddTraveller';
import { useSelector } from 'react-redux';
import RemoveTraveller from './RemoveTraveller';
import Activities from './Activity/Activities';
import Transactions from './Transactions';
import Loader from '../../Extra Components/Loader';
import LeaveTripButton from './LeaveTrip';
import TripDetails from './TripDetails';

const TripPage = () => {

    const {tripId} = useParams();
    const [trip, setTrip] = useState(null);
    
    const [travellerUsernames, setTravellerUsernames] = useState([]);
    const triggerRefresh = useSelector(state => state.user.refresh);

    const getUsernames = async (travellerId) => {
        const res = await fetch(`http://localhost:4000/user/getUsername/${travellerId}`)
        const json = await res.json();
        return json;
    }

    useEffect(() => {
        const fetchTravellerUsernames = async () => {
            if (trip?.travellers) {
                const usernamesAndIds = await Promise.all(
                    trip.travellers.map(async (travellerId) => {
                      const user = await getUsernames(travellerId);
                      return {
                        username: user.username,
                        userId: user.userId
                    };
                })
                );
                setTravellerUsernames(usernamesAndIds.map(usernamesAndId => usernamesAndId.username));
            }
        };
        fetchTravellerUsernames();
    }, [trip, triggerRefresh])

    const tripDetails = useGetSingleTrip(tripId);
    useEffect(() => {
        setTrip(tripDetails);
    }, [tripDetails]);

    const props = {
        travellerUsernames : travellerUsernames,
        tripId : trip?._id
    }

    if (!trip) {
        return <div><Loader/></div>;
    }

    return (
        <div className='font-thin'>
            <Header/>
            <h1 className='mx-auto max-w-fit lg:text-4xl text-3xl my-20'>{trip?.name}</h1>

            <div className='mx-auto max-w-fit'>
                <TripDetails trip={trip}/>
                <div className='flex flex-row mb-5'>
                    <h2 className='font-normal mr-5 text-xl'>Travellers : </h2>
                    <h2 className='text-xl'>{travellerUsernames.join(", ")}</h2>
                </div>
                <AddTraveller trip={trip}/>
                <RemoveTraveller {...props}/>
            </div>

            <div className='grid lg:grid-cols-2 sm:grid-rows-2 mt-10'>
                <div className='lg:border-r-2 border-b-2 border-gray-500'>
                    <h2 className='mx-auto max-w-fit'><Activities tripId = {tripId}/></h2>
                </div>
                <div className='border-b-2 border-gray-500'>
                    <h2 className='mx-auto max-w-fit'><Transactions/></h2>
                </div>
            </div>

            <div className='mx-auto max-w-fit'>
                <LeaveTripButton tripId = {tripId}/>
            </div>
        </div>
    )
}

export default TripPage;