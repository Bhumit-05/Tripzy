import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useGetUserTransac from '../../../hooks/useGetUserTransac';
import useGetTripTransac from '../../../hooks/useGetTripTransac';

const AddTransaction = ({userCurrency, tripCurrency}) => {

  const description = useRef(null);
  const [transactor, setTransactor] = useState("");
  const tripId = useSelector(state => state.trips.tripId);
  const [message, setMessage] = useState("Log a Transaction");
  let personal = false;

  const getUserTransaction = useGetUserTransac((JSON.parse(localStorage.getItem("user"))._id));
  const getTripTransction = useGetTripTransac(tripId);

  const friends = JSON.parse(localStorage.getItem("friends"));
  const travellerUsernames = useSelector(state => state.trips.travellerUsernames);

  const isCurrencyDifferent = userCurrency?.rateToUSD !== tripCurrency?.rateToUSD;

  const [userAmount, setUserAmount] = useState('');
  const [tripAmount, setTripAmount] = useState('');
  const date = useRef(null);

  const handleAddClick = () => {
    personal = false;
    handleAddTransaction();
  }

  const handlePersonalAddClick = () => {
    personal = true;
    handleAddTransaction();
  }

  const handleAddTransaction = async () => {

    friends.push(JSON.parse(localStorage.getItem("user")))
    let transactorObj = friends.find(friend => friend.username === transactor);

    const tripAmountInUSD = parseFloat((tripAmount / tripCurrency.rateToUSD));

    if(personal===true){
      transactorObj = JSON.parse(localStorage.getItem("user"));
    }

    if(!transactorObj){
      setMessage("Choose a Transactor");
      return;
    }

    const res = await fetch("http://localhost:4000/transaction", {
      method : "POST",
      headers : {
        "content-type" : "application/json",
        "token" : localStorage.getItem("token")
      },
      body : JSON.stringify({
        tripId : tripId,
        userId : transactorObj._id,
        amountInUSD : tripAmountInUSD,
        description : description.current.value,
        personal : personal,
        date : date.current.value
      })
    })

    const json = await res.json();
    setMessage(json.message);
    getTripTransction();
    getUserTransaction();
  }

  const handleChange = (e) => {
    setTransactor(e.target.value);
  }

  const handleTripAmountChange = (e) => {
    const value = e.target.value;
    setTripAmount(value);

    if (value) {
      const tripToUSD = (parseFloat(value)/tripCurrency?.rateToUSD);
      const USDToUser = (tripToUSD * userCurrency?.rateToUSD);
      setUserAmount((USDToUser).toFixed(2));
    } else {
      setUserAmount('');
    }
  }

  const handleUserAmountChange = (e) => {
    const value = e.target.value;
    setUserAmount(value);

    if (value) {
      const userToUSD = (parseFloat(value) / userCurrency?.rateToUSD);
      const USDToTrip = (userToUSD * tripCurrency?.rateToUSD);
      setTripAmount(USDToTrip.toFixed(2));
    } else {
      setTripAmount('');
    }
  }

  const reset = () => {
    setTimeout(() => {
      setMessage("Log a Transaction")
    }, 3000)
  }

  return (
    <div className='border border-gray-300 shadow-md w-96 h-80 rounded-2xl mb-20 mx-auto text-md'>
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-fit w-72 flex flex-col justify-between h-full py-4">
        <div className="flex flex-row items-center space-x-4">
          <div className="flex items-center border border-gray-400 rounded-md px-2 h-10 w-36">
            <input
              type="number"
              value={tripAmount}
              onChange={handleTripAmountChange}
              placeholder={tripCurrency?.currencyCode}
              className="w-full border-none outline-none text-gray-700"
            />
            <p className="ml-2 text-lg">{tripCurrency?.symbol}</p>
          </div>
          {isCurrencyDifferent && (
            <div className="flex items-center border border-gray-400 rounded-md px-2 h-10 w-36">
              <input
                type="number"
                value={userAmount}
                onChange={handleUserAmountChange}
                placeholder={userCurrency?.currencyCode}
                className="w-full border-none outline-none text-gray-700"
              />
              <p className="ml-2 text-lg">{userCurrency?.symbol}</p>
            </div>
          )}
        </div>

        <select className='px-2 h-10 text-gray-600 block border border-gray-400 rounded-md' value={transactor} onChange={handleChange}>
          <option value="">Choose Transactor</option>
          {travellerUsernames.map(traveller => 
            <option key={traveller} value={traveller}>
              {traveller}
            </option>)}
        </select>

        <input
          ref={description}
          type='text'
          className='px-2 h-10 text-gray-600 block border border-gray-400 rounded-md'
          placeholder='Description'>
        </input>

        <input
          ref={date}
          type="date"
          className="px-2 h-10 text-sm text-gray-600 block border border-gray-400 rounded-md">
        </input>

        <div className='flex flex-row'>
          <button 
            onClick={() => {
              handleAddClick();
              reset();
            }}
            className="bg-blue-500 mr-4 duration-300 h-10 w-32 mx-auto hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
            Add to trip
          </button>

          <button 
            onClick={() => {
              handlePersonalAddClick();
              reset();
            }}
            className="bg-blue-500 duration-300 h-10 w-fit mx-auto hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
            Add to personal
          </button>
        </div>

        <p className='mx-auto max-w-fit text-blue-500'>{message}</p>
      </form>
    </div>
  )
}

export default AddTransaction;