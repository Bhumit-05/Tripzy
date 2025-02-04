import React from 'react'
import { useDispatch } from 'react-redux';
import { setTripTransactions } from '../utils/transactionSlice';

const useGetTripTransac = (tripId) => {
  
    const dispatch = useDispatch();

    const getTripTransc = async () => {
        const res = await fetch(`https://tripzy-1.onrender.com/transaction/trip/${tripId}`,{
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token")
            }
        });

        const json = await res.json();
        dispatch(setTripTransactions(json.tripTransactions));
    }

    return getTripTransc;

}

export default useGetTripTransac;