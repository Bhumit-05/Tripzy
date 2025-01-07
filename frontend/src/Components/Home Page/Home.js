import React from 'react'
import Header from '../Header';
import useGetTrips from '../../hooks/useGetTrips';
import { useSelector } from 'react-redux';
import TripCard from './TripCard';

const Home = () => {

  useGetTrips();
  const tripsList = useSelector(state => state.trips.tripsList);

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
        <h1 className='text-5xl text-black text-center mb-20'>MY TRIPS</h1>
        <div className='grid grid-cols-1'>
          {tripsList.map(trip => <TripCard key={trip._id} trip={trip}/>)}
        </div>
      </div>
    </div>


  )
}

export default Home;