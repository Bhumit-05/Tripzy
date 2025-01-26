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
        if (Array.isArray(json)) {
            json.sort((a, b) => a.currencyCode.localeCompare(b.currencyCode));
            dispatch(addCurrencies(json));
        } else {
            console.error("Response is not an array:", json);
        }
    }

    return getCurrencies;

}

export default useGetCurrencies;