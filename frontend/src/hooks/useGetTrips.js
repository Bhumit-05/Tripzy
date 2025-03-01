import { useDispatch } from 'react-redux'
import { setTrips } from '../utils/tripsSlice';
import { useEffect } from 'react';

const useGetTrips = () => {
    const dispatch = useDispatch();

    const getTrips = async () => {
        const res = await fetch("https://tripzy-1.onrender.com/trips", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            }
        })

        const json = await res.json();
        dispatch(setTrips(json));
    }

    useEffect(() => {
        getTrips();
    }, [])

  return getTrips;
}

export default useGetTrips;