import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTripTransactionDate, setUserTransactionDate } from '../../../utils/tripsSlice';

const UserFilter = () => {

    const userTransactions = useSelector(state => state.transactions.userTransactions);
    const dispatch = useDispatch();

    const formatTheDate = (date) => {
        const dateToFormat = new Date(date);
        const formattedDate = dateToFormat.toLocaleDateString('en-GB');
        
        return formattedDate;
    }

    const handleChange = (e) => {
        const value = e.target.value;
        dispatch(setUserTransactionDate(value));
    };

    const uniqueDates = [...new Set(userTransactions.map(transaction => transaction?.date))]
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

export default UserFilter;