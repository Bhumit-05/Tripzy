import React from 'react'
import { useSelector } from 'react-redux';
import CrossCheckbox from '../../../Extra Components/CrossCheckbox';
import useGetUserTransac from '../../../hooks/useGetUserTransac';
import useGetTripTransac from '../../../hooks/useGetTripTransac';

const UserTransactionCard = ({transaction, userCurrency, tripCurrency}) => {
    console.log(transaction)
    const description = transaction?.description;
    const tripId = useSelector(state => state.trips.tripId);
    const getUserTransaction = useGetUserTransac((JSON.parse(localStorage.getItem("user"))._id));
    const getTripTransction = useGetTripTransac(tripId);

    const edit = useSelector(state => state.user.editTransactionsButton);

    const date = new Date(transaction?.date);
    const tripAmount = (tripCurrency?.rateToUSD * transaction?.amountInUSD).toFixed(2);
    const userAmount = (userCurrency?.rateToUSD * transaction?.amountInUSD).toFixed(2);

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
        getTripTransction();
        getUserTransaction();
    }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-2 w-40 mt-2 hover:scale-105 duration-300">
      <div className='flex flex-row justify-between'>
        <h1 className='text-md font-normal'>{description}</h1>
        <div className='text-md'>{formattedDate}</div>
      </div>
      <div className='flex flex-row'>
        <div className='mx-auto max-w-fit'>
            <div><span className='font-light text-sm'>{tripAmount}</span> {tripCurrency?.symbol}</div>
            <div><span className='font-light text-sm'>{userAmount}</span> {userCurrency?.symbol}</div>
        </div>
        {edit && (
            <div className='my-auto'><CrossCheckbox checked={true} onChange={handleChange}/></div>
        )}
      </div>
    </div>
  )
}

export default UserTransactionCard;