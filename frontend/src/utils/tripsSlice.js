import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
    name : "trips",
    initialState : {
        tripsList : [],
        activities : [],
        travellerUsernames : [],
        tripId : null
    },
    reducers : {
        setTrips : (state, action) => {
            state.tripsList = action.payload;
        },
        addSingleTrip : (state, action) => {
            state.tripsList.push(action.payload);
        },
        removeTrip : (state, action) => {
            state.tripsList = state.tripsList.filter(trip => trip.tripId !== action.payload);
        },
        addActivity : (state, action) => {
            state.activities = action.payload;
        },
        addTravellerUsernames : (state, action) => {
            state.travellerUsernames = action.payload;
        },
        setTripId : (state, action) => {
            state.tripId = action.payload;
        }
    }
})

export const { setTrips, removeTrip, addSingleTrip, addActivity, addTravellerUsernames, setTripId } = tripsSlice.actions;
export default tripsSlice.reducer;