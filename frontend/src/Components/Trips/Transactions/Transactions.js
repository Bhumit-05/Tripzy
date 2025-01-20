import React, { useEffect } from 'react'
import AddTransaction from './AddTransaction';
import useGetTripCurrencyDetails from '../../../hooks/useGetTripCurrencyDetails';

// add transaction
// convert from user currency to trip currency using conversion rates ( first convert to usd then to other currency )
// my transactions (total sum), trip transactions (total sum)


const Transactions = (currencyCode) => {

  const getTripCurrencyDetails = useGetTripCurrencyDetails(currencyCode.currency);

  useEffect(() => {
    getTripCurrencyDetails();
  }, [])

  return (
    <div>
      <h1 className='border-b-2 border-gray-500 text-3xl mb-20 mx-auto max-w-fit'>Transactions</h1>
      
      <AddTransaction/>
    </div>
  )
}

export default Transactions;