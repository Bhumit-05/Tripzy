import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
    name : "trips",
    initialState : {
        tripsList : [],
        activities : []
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
    }
})

export const { setTrips, removeTrip, addSingleTrip, addActivity } = tripsSlice.actions;
export default tripsSlice.reducer;