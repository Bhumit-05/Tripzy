import React, { useEffect } from 'react'
import AddTransaction from './AddTransaction';
import useGetTripCurrencyDetails from '../../../hooks/useGetTripCurrencyDetails';
import { useDispatch, useSelector } from 'react-redux';
import useGetUserTransac from '../../../hooks/useGetUserTransac';
import useGetTripTransac from '../../../hooks/useGetTripTransac';
import TripTransactionsCard from './TripTransactionsCard';
import { toggleEditTransactionButton, toggleShowTripTransac, toggleShowUserTransac } from '../../../utils/userSlice';

const Transactions = (currencyCode) => {

  const dispatch = useDispatch();
  const tripId = useSelector(state => state.trips.tripId);
  const getTripCurrencyDetails = useGetTripCurrencyDetails(currencyCode.currency);
  const getUserTransaction = useGetUserTransac((JSON.parse(localStorage.getItem("user"))._id));
  const getTripTransction = useGetTripTransac(tripId);
  const edit = useSelector(state => state.user.editTransactionsButton);

  const showTripTransactions = useSelector(state => state.user.showTripTransactions);
  const tripTransactions = useSelector(state => state.transactions.tripTransactions);

  const showUserTransactions = useSelector(state => state.user.showUserTransactions);
  const userTransactions = useSelector(state => state.transactions.userTransactions);

  useEffect(() => {
    getTripCurrencyDetails();
    getUserTransaction();
    getTripTransction();
  }, [])

  const handleEditClick = () => {
    dispatch(toggleEditTransactionButton());
  }

  const handleShowTripTransac = () => {
    dispatch(toggleShowTripTransac());
  }

  const handleShowUserTransac = () => {
    dispatch(toggleShowUserTransac());
  }

  const userCurrency = useSelector(state => state.currency.userCurrency);
  const tripCurrency = useSelector(state => state.currency.tripCurrency);

  return (
    <div>
      <h1 className='border-b-2 border-gray-500 text-3xl mb-20 mx-auto max-w-fit'>Transactions</h1>

      <div><AddTransaction userCurrency={userCurrency} tripCurrency={tripCurrency} /></div>

      <div className="w-96 mx-auto">
        <button
          onClick={handleShowTripTransac}
          className="w-full h-12 border border-gray-500 rounded-lg flex justify-between items-center px-4 bg-gray-100 hover:bg-gray-200 transition duration-200"
        >
          <span>Trip Transactions</span>
          <span>{showTripTransactions ? "▲" : "▼"}</span>
        </button>

        {showTripTransactions && (
          <div className="mt-2 w-full border border-gray-500 rounded-lg bg-gray-100 p-2">
            {tripTransactions.length > 0 ? (
              tripTransactions.map((transaction) => (
                <TripTransactionsCard key={transaction._id} transaction={transaction} userCurrency={userCurrency} tripCurrency={tripCurrency}/>
              ))
            ) : (
              <p className="text-gray-600 text-center">No transactions available</p>
            )}
          </div>
        )}
      </div>

      <div className="w-96 mx-auto mt-12">
        <button
          onClick={handleShowUserTransac}
          className="w-full h-12 border border-gray-500 rounded-lg flex justify-between items-center px-4 bg-gray-100 hover:bg-gray-200 transition duration-200"
        >
          <span>My Transactions</span>
          <span>{showUserTransactions ? "▲" : "▼"}</span>
        </button>

        {showUserTransactions && (
          <div className="mt-2 w-full border border-gray-500 rounded-lg bg-gray-100 p-2">
            {userTransactions.length > 0 ? (
              userTransactions.map((transaction) => (
                <TripTransactionsCard key={transaction._id} transaction={transaction} userCurrency={userCurrency} tripCurrency={tripCurrency}/>
              ))
            ) : (
              <p className="text-gray-600 text-center">No transactions available</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center h-full mt-8">
        <button 
          onClick={handleEditClick}
          className="bg-blue-500 duration-300 h-10 w-20 hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
          {!edit ? "Edit" : "Done"}
        </button>
      </div>
    </div>
  )
}

export default Transactions;