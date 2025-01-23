import React from 'react'
import { useSelector } from 'react-redux';

const TripTotal = ({userCurrency, tripCurrency}) => {

  let tripTransactions = useSelector(state => state.transactions.tripTransactions);
  const duplicateTransactions = tripTransactions;
  const filterDate = useSelector(state => state.trips.tripTransactionDate);
  let total=0;

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

  tripTransactions.map(transaction => total+=transaction?.amountInUSD);
  const isDifferentCurrency = userCurrency?.rateToUSD !== tripCurrency?.rateToUSD;

  const tripAmount = (total*tripCurrency?.rateToUSD).toFixed(2);
  const userAmount = (total*userCurrency?.rateToUSD).toFixed(2);

  return (
    <div className="flex flex-col items-center mt-8 mx-auto bg-white  p-2 shadow-md rounded-lg border border-gray-300 ">
      <div className="text-gray-800 text-lg font-normal">
        Total spent
      </div>
      <div className="text-blue-600 text-lg font-light">
        {tripAmount} {tripCurrency?.symbol}
      </div>
      {isDifferentCurrency && (
        <div className="text-green-600 text-lg font-light">
          {userAmount} {userCurrency?.symbol}
        </div>
      )}
    </div>
  )
}

export default TripTotal;