import React, { useEffect } from 'react'
import Header from '../Header';
import useGetTrips from '../../hooks/useGetTrips';
import { useSelector } from 'react-redux';
import TripCard from './TripCard';
import useGetFriends from '../../hooks/useGetFriends';
import ScrollDown from '../../Extra Components/ScrollDown';

const Home = () => {

  const tripsList = useSelector(state => state.trips.tripsList);
  const friends = useSelector(state => state.friends.friendList);
  const sortedTripList = [...tripsList].sort((a, b) =>
    new Date(b.endDate) - new Date(a.endDate)
  );
  const getFriends = useGetFriends();
  const getTrips = useGetTrips();
  
  useEffect(() => {
    if((friends.length===0)){
      getFriends();
    }
  }, [friends.length])

  useEffect(() => {
    getTrips();
  }, [])

  return (
    <div className='font-thin'>
      <Header />
      
      <div className='relative flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='lg:text-6xl text-3xl'>Welcome to Tripzy</h1>
          <h2 className='lg:text-2xl'>Tripzy – Where Every Trip’s Easy!</h2>
        </div>
      </div>

      <div className='mt-12'>
        <ScrollDown />

        <h1 className='text-5xl text-black text-center'>MY TRIPS</h1>
        <div className='border-b-2 border-gray-300'></div>
        <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-3 bg-gray-100/70 py-20'>
          {sortedTripList.map(trip => <TripCard key={trip._id} trip={trip}/>)}
        </div>
      </div>
    </div>
  )
}

export default Home;