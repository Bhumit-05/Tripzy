import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LeaveTripButton = (tripId) => {
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const handleLeave = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const res = await fetch("http://localhost:4000/trips/removeTraveller", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        tripId: tripId.tripId,
        travellerId: user._id
      })
    });

    const json = await res.json();
    Navigate("/");
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
      <div className="mx-auto max-w-fit">
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-200 hover:bg-red-100 p-2 rounded-xl duration-300 transition transform active:scale-90"
        >
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
                className="bg-blue-500 text-white w-20 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                OK
              </button>
              <button
                onClick={handleCancelLeave}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
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
