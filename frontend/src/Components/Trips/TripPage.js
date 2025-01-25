import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Header from '../Header';
import useGetSingleTrip from '../../hooks/useGetSingleTrip';
import AddTraveller from './AddTraveller';
import { useDispatch, useSelector } from 'react-redux';
import RemoveTraveller from './RemoveTraveller';
import Activities from './Activity/Activities';
import Transactions from './Transactions/Transactions';
import Loader from '../../Extra Components/Loader';
import LeaveTripButton from './LeaveTrip';
import TripDetails from './TripDetails';
import useGetTripCurrencyDetails from '../../hooks/useGetTripCurrencyDetails';
import { addTravellerUsernames, setTripId } from '../../utils/tripsSlice';

const TripPage = () => {

    const {tripId} = useParams();
    const [trip, setTrip] = useState(null);
    const dispatch = useDispatch();
    
    const [travellerUsernames, setTravellerUsernames] = useState([]);
    const triggerRefresh = useSelector(state => state.user.refresh);
    const getTripCurrencyDetails = useGetTripCurrencyDetails(trip?.currencyCode);

    useEffect(() => {
        getTripCurrencyDetails();
        dispatch(setTripId(tripId));
    }, [])

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
                dispatch(addTravellerUsernames(usernamesAndIds.map(usernamesAndId => usernamesAndId.username)));
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

            <div className='sm:ml-[35%] ml-7'>
                <TripDetails trip={trip}/>
                <div className='flex flex-row mb-5'>
                    <h2 className='font-normal mr-5 text-xl'>Travellers : </h2>
                    <h2 className='text-xl'>{travellerUsernames.join(", ")}</h2>
                </div>
                <div className=''>
                    <AddTraveller trip={trip}/>
                    <RemoveTraveller {...props}/>
                </div>
            </div>

            <div className='grid lg:grid-cols-2 sm:mt-28 mt-20'>
                <div className='border-b-2 sm:border-b-0 sm:border-r-2 border-gray-500'>
                    <h2 className='mx-auto max-w-fit'><Activities tripId = {tripId}/></h2>
                </div>
                <div className=' border-gray-500 sm:pb-10'>
                    <h2 className='mx-auto max-w-fit'><Transactions currency={trip.currencyCode}/></h2>
                </div>
            </div>

            <div className='mx-auto max-w-fit mt-10'>
                <LeaveTripButton tripId = {tripId} NoOfTravellers={travellerUsernames.length}/>
            </div>
        </div>
    )
}

export default TripPage;