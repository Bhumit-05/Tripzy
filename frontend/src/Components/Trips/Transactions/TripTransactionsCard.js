import React from 'react'
import CrossCheckbox from '../../../Extra Components/CrossCheckbox';
import { useSelector } from 'react-redux';
import useGetUserTransac from '../../../hooks/useGetUserTransac';
import useGetTripTransac from '../../../hooks/useGetTripTransac';

const TripTransactionsCard = ({transaction, userCurrency, tripCurrency}) => {
    
    const tripId = useSelector(state => state.trips.tripId);
    const getUserTransaction = useGetUserTransac((JSON.parse(localStorage.getItem("user"))._id));
    const getTripTransction = useGetTripTransac(tripId);
    const edit = useSelector(state => state.user.editTransactionsButton);
    const tripAmount = (transaction?.amountInUSD * tripCurrency?.rateToUSD).toFixed(2);
    const userAmount = (transaction?.amountInUSD * userCurrency?.rateToUSD).toFixed(2);

    const friends = JSON.parse(localStorage.getItem("friends"));
    friends.push(JSON.parse(localStorage.getItem("user")))
    const user = friends.find(friend => friend._id === transaction?.userId);

    const date = new Date(transaction?.date);
    const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const handleChange = async () => {
        const res = await fetch(`http://localhost:4000/transaction/${transaction?._id}`, {
            method : "DELETE",
            headers : {
                "token" : localStorage.getItem("token")
            }
        })

        const json = await res.json();
        getTripTransction();
        getUserTransaction();
    }

    return (
        <div className="border border-gray-300 shadow-md rounded-md w-full max-w-lg p-4 bg-white hover:shadow-lg hover:scale-105 duration-300 flex items-center my-2">
            <div className="flex-grow">
                <div className="flex justify-between items-center text-gray-800">
                <div className="font-medium text-lg truncate">{user?.username}</div>
                <div className="text-xs italic text-gray-500">{formattedDate}</div>
            </div>
            <div className="text-gray-600 text-sm mt-1 truncate">{transaction?.description}</div>
                <div className="flex justify-between items-center text-gray-700 mt-2 text-sm">
                    <div>
                        <span className="font-semibold">Amount:</span> {tripAmount} {tripCurrency?.symbol}
                    </div>
                    <div>
                        {userAmount} {userCurrency?.symbol}
                    </div>
                </div>
            </div>
            {edit &&
            <div className="ml-4">
                <CrossCheckbox checked={true} onChange={handleChange}/>
            </div>}
        </div>
    )
}

export default TripTransactionsCard;