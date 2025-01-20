import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTrips } from '../utils/tripsSlice';

const useGetTrips = () => {
    const dispatch = useDispatch();
    const tripsList = useSelector(state => state.trips.tripsList);

    const getTrips = async () => {
        const res = await fetch("http://localhost:4000/trips", {
            method : "GET",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            }
        })

        const json = await res.json();
        dispatch(setTrips(json));
    }

  return getTrips;
}

export default useGetTrips;