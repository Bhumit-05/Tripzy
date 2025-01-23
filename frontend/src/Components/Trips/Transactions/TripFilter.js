import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTripTransactionDate } from '../../../utils/tripsSlice';

const TripFilter = () => {

    const tripTransactions = useSelector(state => state.transactions.tripTransactions);
    const dispatch = useDispatch();

    const formatTheDate = (date) => {
        const dateToFormat = new Date(date);
        const formattedDate = dateToFormat.toLocaleDateString('en-GB');
        
        return formattedDate;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(setTripTransactionDate(value));
    };

    const uniqueDates = [...new Set(tripTransactions.map(transaction => transaction?.date))]
      .sort((a, b) => new Date(a) - new Date(b))
      .map(date => formatTheDate(date));
      
  return (
    <div className="w-32 mx-auto mt-4 mb-8">
    <select 
      className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      onChange={handleChange}
    >
      <option>All</option>
      {uniqueDates.map((date, index) => (
        <option value={date} key={index}>{date}</option>
      ))}
    </select>
  </div>
  )
}

export default TripFilter;