import React from 'react'
import TripTransactionsCard from './TripTransactionsCard';
import TripFilter from './TripFilter';
import TripTotal from './TripTotal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowTripTransac } from '../../../utils/userSlice';

const TripTransactions = ({userCurrency, tripCurrency}) => {
    
  const showTripTransactions = useSelector(state => state.user.showTripTransactions);
  let tripTransactions = useSelector(state => state.transactions.tripTransactions);
  const duplicateTransactions = tripTransactions;
  const filterDate = useSelector(state => state.trips.tripTransactionDate);
  const dispatch = useDispatch();

  const handleShowTripTransac = () => {
    dispatch(toggleShowTripTransac());
  }

  const formatTheDate = (date) => {
    const dateToFormat = new Date(date);
    const formattedDate = dateToFormat.toLocaleDateString('en-GB');
    
    return formattedDate;
  }

  if(filterDate !== "All"){
    tripTransactions = duplicateTransactions.filter(transaction => formatTheDate(transaction?.date) === filterDate);
  }
  else{
    tripTransactions = duplicateTransactions;
  }

  tripTransactions = [...tripTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
        <div className="w-96 mx-auto">
        <button
          onClick={handleShowTripTransac}
          className="w-full h-12 border border-gray-500 rounded-lg flex justify-between items-center px-4 bg-gray-100 hover:bg-gray-200 transition duration-200"
        >
          <span className='text-xl font-normal'>Trip Transactions</span>
          <span>{showTripTransactions ? "▲" : "▼"}</span>
        </button>

        {showTripTransactions && (
          <div className="mt-2 w-full border border-gray-500 rounded-lg bg-gray-100 p-2">
            
            {tripTransactions.length > 0 ? (<>
              <TripFilter/>
              {tripTransactions.map((transaction) => (
                <TripTransactionsCard key={transaction._id} transaction={transaction} userCurrency={userCurrency} tripCurrency={tripCurrency}/>
              ))}
          
              <TripTotal userCurrency={userCurrency} tripCurrency={tripCurrency}/>
              </>
            ) : (
              <p className="text-gray-600 text-center">Looks like your wallet's been on vacation—no transactions here!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TripTransactions;