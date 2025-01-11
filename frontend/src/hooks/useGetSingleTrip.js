import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useGetSingleTrip = (tripId) => {

    const [trip, setTrip] = useState(null);
    const refresh = useSelector(state => state.user.refresh);

    const getTrip = async () => {
        const res = await fetch(`http://localhost:4000/trips/oneTrip/${tripId}`, {
            method : "GET",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            }
        })

        const json = await res.json();
        setTrip(json);
    }

    useEffect(() => {
        getTrip();
    }, [refresh, tripId])

    return trip;
}

export default useGetSingleTrip;