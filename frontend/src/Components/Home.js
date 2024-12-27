import React from 'react'
import Header from './Header';
import { HOME } from '../utils/constants';

const Home = () => {
  return (
    <div className='font-thin'>
      <Header className='relative z-10 bg-transparent'/>
      <img src={HOME} className='absolute z-0 ' alt=""/>
    </div>
  )
}

export default Home;