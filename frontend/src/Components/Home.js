import React from 'react'
import Header from './Header';
import { HOME } from '../utils/constants';
import useGetTrips from '../hooks/useGetTrips';

const Home = () => {

  const getTrips = useGetTrips();
  getTrips();

  return (
    <div className='font-thin'>
      <Header className='z-20'/>
      <img src={HOME} className='z-10 ' alt=""/>
      
    </div>
  )
}

export default Home;