import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserTransactions } from '../utils/transactionSlice';

const useGetUserTransac = (userId) => {
  
    const tripId = useSelector(state => state.trips.tripId);
    const dispatch = useDispatch();

    const getUserTransaction = async () => {
        const res = await fetch(`https://tripzy-1.onrender.com/transaction/user/${userId}/${tripId}`, {
            method : "GET",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            },
        })
        const json = await res.json();
        dispatch(setUserTransactions(json.userTransactions));
    }

    return getUserTransaction;

}

export default useGetUserTransac;