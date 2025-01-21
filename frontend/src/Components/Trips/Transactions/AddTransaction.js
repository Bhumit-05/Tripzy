import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';

const AddTransaction = ({userCurrency, tripCurrency}) => {

  const description = useRef(null);
  const [transactor, setTransactor] = useState("");
  const tripId = useSelector(state => state.trips.tripId);
  const [message, setMessage] = useState("Log a Transaction")

  const friends = JSON.parse(localStorage.getItem("friends"));
  const travellerUsernames = useSelector(state => state.trips.travellerUsernames);

  const isCurrencyDifferent = userCurrency?.rateToUSD !== tripCurrency?.rateToUSD;

  const [userAmount, setUserAmount] = useState('');
  const [tripAmount, setTripAmount] = useState('');
  const date = useRef(null);

  const handleAddClick = async () => {

    friends.push(JSON.parse(localStorage.getItem("user")))
    const transactorObj = friends.find(friend => friend.username === transactor);

    const tripAmountInUSD = (tripAmount / tripCurrency.rateToUSD).toFixed(2);

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
        date : date.current.value
      })
    })

    const json = await res.json();
    setMessage(json.message);
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
    <div className='border-gray-500 border-2 w-96 h-80 rounded-2xl mb-20 mx-auto text-md'>
      <form 
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-fit w-72 flex flex-col justify-between h-full py-4">
        <div className='flex flex-row w-72'>

          <input
            type="number"
            value={tripAmount}
            onChange={handleTripAmountChange}
            placeholder={tripCurrency?.currencyCode}
            className="pl-2 h-10 border border-gray-400 rounded-md w-28">
          </input>

          <p className='ml-2 mr-4 text-2xl'>{tripCurrency?.symbol}</p>

          {isCurrencyDifferent && <div className='flex flex-row'>
            <input
              type="number"
              value={userAmount}
              onChange={handleUserAmountChange}
              placeholder={userCurrency?.currencyCode}
              className="pl-2 h-10 border border-gray-400 rounded-md w-28">
            </input>

            <p className='ml-2 text-2xl'>{userCurrency?.symbol}</p>  
          </div>}
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

        <button 
          onClick={() => {
            handleAddClick();
            reset();
          }}
          className="bg-blue-500 duration-300 h-10 w-20 mx-auto hover:bg-blue-600 text-white p-2 rounded-lg transition transform active:scale-90">
          Add
        </button>

        <p className='mx-auto max-w-fit text-blue-500'>{message}</p>
      </form>
    </div>
  )
}

export default AddTransaction;