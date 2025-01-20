import React from 'react'
import { useDispatch } from 'react-redux'
import { addTripCurrencyDetails } from '../utils/currencySlice';

const useGetTripCurrencyDetails = (currency) => {

    const dispatch = useDispatch();

    const getTripCurrencyDetails = async () => {
        const res = await fetch(`http://localhost:4000/currency/currencyDetails/${currency}`, {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token")
            }
        })

        const json = await res.json();
        dispatch(addTripCurrencyDetails(json));
    }

    return getTripCurrencyDetails;
}

export default useGetTripCurrencyDetails;