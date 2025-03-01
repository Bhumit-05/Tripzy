import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useGetTrips from '../../hooks/useGetTrips';

const LeaveTripButton = ({ tripId, NoOfTravellers }) => {
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();
  const getTrips = useGetTrips();

  const deleteTrip = async () => {
    const res = await fetch(`https://tripzy-1.onrender.com/trips`, {
      method : "Delete",
      headers : {
        "token" : localStorage.getItem("token"),
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        tripId : tripId
      })
    })
    const json = await res.json();
  }

  const handleLeave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch("https://tripzy-1.onrender.com/trips/removeTraveller", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        tripId: tripId,
        travellerId: user._id
      })
    });

    console.log(tripId);
    console.log(user._id)

    getTrips();
    Navigate("/home");

    if(NoOfTravellers===1){
      deleteTrip();
    }
  };

  const handleConfirmLeave = () => {
    handleLeave();
    setShowModal(false);
  };

  const handleCancelLeave = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="mx-auto max-w-fit mb-20 mt-20">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-600 p-2 rounded-xl duration-300 transition transform active:scale-90 text-white">
          Leave Trip
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="text-lg mb-4">Are you sure you want to leave the trip?</p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleConfirmLeave}
                className="bg-blue-600 text-white w-20 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                OK
              </button>
              <button
                onClick={handleCancelLeave}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTripButton;