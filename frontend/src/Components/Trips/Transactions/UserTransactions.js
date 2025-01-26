import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowUserTransac } from '../../../utils/userSlice';
import UserTransactionCard from './UserTransactionCard';
import UserTotal from './UserTotal';
import UserFilter from './UserFilter';

const UserTransactions = ({userCurrency, tripCurrency}) => {

    let userTransactions = useSelector(state => state.transactions.userTransactions);
    const duplicateTransactions = userTransactions;
    const showUserTransactions = useSelector(state => state.user.showUserTransactions);
    const dispatch = useDispatch();

    const filterDate = useSelector(state => state.trips.userTransactionDate);

    const handleShowUserTransac = () => {
        dispatch(toggleShowUserTransac());
    }

    const formatTheDate = (date) => {
        const dateToFormat = new Date(date);
        const formattedDate = dateToFormat.toLocaleDateString('en-GB');
        
        return formattedDate;
    }

    if(filterDate !== "All"){
        userTransactions = duplicateTransactions.filter(transaction => formatTheDate(transaction?.date) === filterDate);
    }
    else{
        userTransactions = duplicateTransactions;
    }

    userTransactions = [...userTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

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

                {(personalTransactions.length>0 || tripTransactions.length>0) && (
                    <UserFilter/>
                    
                )}
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
                        {tripTransactions.length>0 && <UserTotal userCurrency={userCurrency} tripCurrency={tripCurrency} personal={false}/>}
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
                            <p className="text-gray-600 text-center">Even your wallet's bored.</p>
                            )}
                        </div>
                        {personalTransactions.length>0 && <UserTotal userCurrency={userCurrency} tripCurrency={tripCurrency} personal={true} />}
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default UserTransactions;