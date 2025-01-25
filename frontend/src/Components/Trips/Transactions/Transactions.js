import React, { useEffect } from 'react'
import AddTransaction from './AddTransaction';
import useGetTripCurrencyDetails from '../../../hooks/useGetTripCurrencyDetails';
import { useDispatch, useSelector } from 'react-redux';
import useGetUserTransac from '../../../hooks/useGetUserTransac';
import useGetTripTransac from '../../../hooks/useGetTripTransac';
import { toggleEditTransactionButton } from '../../../utils/userSlice';
import TripTransactions from './TripTransactions';
import UserTransactions from './UserTransactions';

const Transactions = (currencyCode) => {

  const dispatch = useDispatch();
  const tripId = useSelector(state => state.trips.tripId);
  const getTripCurrencyDetails = useGetTripCurrencyDetails(currencyCode.currency);
  const getUserTransaction = useGetUserTransac((JSON.parse(localStorage.getItem("user"))._id));
  const getTripTransction = useGetTripTransac(tripId);
  
  const edit = useSelector(state => state.user.editTransactionsButton);

  const showTripTransactions = useSelector(state => state.user.showTripTransactions);
  const showUserTransactions = useSelector(state => state.user.showUserTransactions);

  useEffect(() => {
    getTripCurrencyDetails();
    getUserTransaction();
    getTripTransction();
  }, [])

  const handleEditClick = () => {
    dispatch(toggleEditTransactionButton());
  }

  const userCurrency = useSelector(state => state.currency.userCurrency);
  const tripCurrency = useSelector(state => state.currency.tripCurrency);

  return (
    <div>
      <h1 className='border-b-2 mt-10 border-gray-500 text-3xl mb-20 mx-auto max-w-fit'>Transactions</h1>

      <AddTransaction userCurrency={userCurrency} tripCurrency={tripCurrency} />

      <TripTransactions userCurrency={userCurrency} tripCurrency={tripCurrency}/>

      <UserTransactions userCurrency={userCurrency} tripCurrency={tripCurrency}/>

      {(showTripTransactions || showUserTransactions) &&
      <div className="flex justify-center items-center h-full my-8">
        <button 
          onClick={handleEditClick}
          className="bg-blue-500 duration-300 h-10 w-20 hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
          {!edit ? "Edit" : "Done"}
        </button>
      </div>}
    </div>
  )
}

export default Transactions;