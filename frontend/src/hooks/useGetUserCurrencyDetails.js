import React from 'react'
import { useDispatch } from 'react-redux'
import { addUserCurrencyDetails } from '../utils/currencySlice';

const useGetUserCurrencyDetails = (currency) => {

    const dispatch = useDispatch();

    const getUserCurrencyDetails = async () => {
        const res = await fetch(`https://tripzy-1.onrender.com/currency/currencyDetails/${currency}`, {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token")
            }
        })

        const json = await res.json();
        dispatch(addUserCurrencyDetails(json));
    }

    return getUserCurrencyDetails;
}

export default useGetUserCurrencyDetails;