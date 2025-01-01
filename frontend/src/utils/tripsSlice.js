import { createSlice } from "@reduxjs/toolkit";

const tripsSlice = createSlice({
    name : "trips",
    initialState : {
        tripsList : []
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
        }
    }
})

export const { setTrips, removeTrip, addSingleTrip } = tripsSlice.actions;
export default tripsSlice.reducer;