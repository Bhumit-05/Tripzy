import React from 'react'
import { useSelector } from 'react-redux';

const UserTotal = ({userCurrency, tripCurrency, personal}) => {

    const userTransactions = useSelector(state => state.transactions.userTransactions);
    let total = 0;
    const filterDate = useSelector(state => state.trips.userTransactionDate);
    const isDifferentCurrency = tripCurrency.rateToUSD !== userCurrency.rateToUSD;

    const formatTheDate = (date) => {
      const dateToFormat = new Date(date);
      const formattedDate = dateToFormat.toLocaleDateString('en-GB');
      
      return formattedDate;
    }

    userTransactions.map(transaction => {
      if(transaction?.personal===personal && 
        (formatTheDate(transaction?.date) === filterDate || filterDate === "All")) 
          total += transaction?.amountInUSD;
    })

    const userTotal = (total * userCurrency?.rateToUSD).toFixed(2);
    const tripTotal = (total * tripCurrency?.rateToUSD).toFixed(2);

  return (
    <div className='bg-white border border-gray-300 rounded-lg shadow-md p-2 w-40 mt-6 '>
        <div className='mx-auto max-w-fit'>
            <h1 className='mx-auto max-w-fit font-medium text-base'>Total</h1>
            <div className='mx-auto max-w-fit text-blue-700 font-light'>{tripTotal} {tripCurrency?.symbol}</div>
            {isDifferentCurrency && (
              <div className='mx-auto max-w-fit text-green-600 font-light'>{userTotal} {userCurrency?.symbol}</div>
            )}
        </div>
    </div>
  )
}

export default UserTotal;