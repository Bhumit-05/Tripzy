import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addCurrencies } from '../utils/currencySlice';

const useGetCurrencies = () => {

    const dispatch = useDispatch();

    const getCurrencies = async () => {
        const res = await fetch("http://localhost:4000/currency",{
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token")
            }
        });
        const json = await res.json();
        dispatch(addCurrencies(json));
    }

    return getCurrencies;

}

export default useGetCurrencies;