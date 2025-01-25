import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
    name : "trips",
    initialState : {
        tripsList : [],
        activities : [],
        travellerUsernames : [],
        tripId : null,
        tripTransactionDate : "All",
        userTransactionDate : "All",
        activitiesDate : "All",
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
        },
        setTripTransactionDate : (state, action) => {
            state.tripTransactionDate = action.payload;
        },
        setUserTransactionDate : (state, action) => {
            state.userTransactionDate = action.payload;
        },
        setActivitiesDate : (state, action) => {
            state.activitiesDate = action.payload;
        }
    }
})

export const { setTrips, removeTrip, addSingleTrip, addActivity, addTravellerUsernames, setTripId, setTripTransactionDate, setUserTransactionDate, setActivitiesDate } = tripsSlice.actions;
export default tripsSlice.reducer;