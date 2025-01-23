import React from 'react'
import TripTransactionsCard from './TripTransactionsCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowUserTransac } from '../../../utils/userSlice';
import UserTransactionCard from './UserTransactionCard';

const UserTransactions = ({userCurrency, tripCurrency}) => {

    const userTransactions = useSelector(state => state.transactions.userTransactions);
    const showUserTransactions = useSelector(state => state.user.showUserTransactions);
    const dispatch = useDispatch();

    const handleShowUserTransac = () => {
        dispatch(toggleShowUserTransac());
    }

    const personalTransactions = userTransactions.filter(transaction => transaction.personal===true);
    const tripTransactions = userTransactions.filter(transaction => !transaction.personal===true);

  return (
    <div>
        <div className="w-96 mx-auto mt-12">
            <button
            onClick={handleShowUserTransac}
            className="w-full h-12 border border-gray-500 rounded-lg flex justify-between items-center px-4 bg-gray-100 hover:bg-gray-200 transition duration-200">
                <span className='text-xl font-normal'>My Transactions</span>
                <span>{showUserTransactions ? "▲" : "▼"}</span>
            </button>

            {showUserTransactions && (
            <div className="mt-2 w-full border border-gray-500 rounded-lg bg-gray-100 p-2">
                <div className='flex flex-row mx-auto max-w-fit'>
                    <div>
                        <h1 className='mx-auto max-w-fit text-lg border-b border-black mb-2'>Trip Transactions</h1>
                        <div className=''>
                            {tripTransactions.length > 0 ? (
                            tripTransactions.map((transaction) => (
                                !transaction.personal ? (<UserTransactionCard key={transaction._id} transaction={transaction} userCurrency={userCurrency} tripCurrency={tripCurrency}/>) : null
                            ))
                            ) : (
                            <p className="text-gray-600 text-center">No transactions available</p>
                            )}
                        </div>
                    </div>

                    <div className="border-l border-gray-300 mx-4"></div>
                    
                    <div>
                        <h1 className='mx-auto max-w-fit border-b border-black mb-2'>Personal Transactions</h1>
                        <div className=''>
                            {personalTransactions.length > 0 ? (
                            personalTransactions.map((transaction) => (
                                transaction.personal ? (<UserTransactionCard key={transaction._id} transaction={transaction} userCurrency={userCurrency} tripCurrency={tripCurrency}/>) : null
                            ))
                            ) : (
                            <p className="text-gray-600 text-center">No transactions available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default UserTransactions;