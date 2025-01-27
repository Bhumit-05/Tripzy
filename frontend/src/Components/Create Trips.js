import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import useGetCurrencies from '../hooks/useGetCurrencies';
import { useSelector } from 'react-redux';

const CreateTrips = () => {

    let tripName = useRef(null);
    let destination = useRef(null);
    let startDate = useRef(null);
    let endDate = useRef(null);
    let currency = useRef(null);

    const [message, setMessage] = useState("");
    const getCurrencies = useGetCurrencies();
    const currencies = useSelector(state => state.currency.currencies);
    
    useEffect(() => {
        if(currencies.length===0){
            getCurrencies();
        }
    }, [currencies.length])

    const handleClick = async () => {
        tripName = tripName?.current?.value || "";
        destination = destination?.current?.value || "";
        startDate = startDate?.current?.value || null;
        endDate = endDate?.current?.value || null;
        currency = currency?.current?.value || null;

        const res = await fetch("http://localhost:4000/trips", {
            method : "POST",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            },
            body : JSON.stringify({
                "name" : tripName,
                "destination" : destination,
                "startDate" : startDate,
                "endDate" : endDate,
                "currency" : currency
            })
        })

        const json = await res.json();
        setMessage(json.message);
    }

  return (
    <div className='font-thin'>
        <Header/>

        <h1 className='max-w-fit mx-auto lg:text-5xl text-2xl my-24 mt-48'>Plan Your Perfect Journey, One Trip at a Time</h1>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-[50px] mb-20">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-2xl rounded-3xl sm:p-10 border border-gray-300">
                <form onSubmit={e => e.preventDefault()} className="max-w-md mx-auto">
                    <h1 className='mx-auto max-w-fit font-thin lg:text-4xl text-xl'>Trip Details</h1>
                    <div className="mt-5 grid grid-cols-1 gap-5">
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Trip Name</label>
                            <input ref={tripName} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-600 focus:ring-2 focus:ring-blue-600" />
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Destination</label>
                            <input ref={destination} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-600 focus:ring-2 focus:ring-blue-600" />
                        </div>
                    </div>

                    <div className='flex flex-col mt-5'>
                        <label htmlFor="currency-select" className='font-semibold text-sm text-gray-600 pb-1 block'>Currency</label>
                        <select ref={currency} id="currency-select" className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-600 focus:ring-2 focus:ring-blue-600'>
                            {currencies.map((currency) => (
                                <option key={currency.currencyCode} value={currency.currencyCode}>
                                    {currency.currencyCode} &nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp; {currency.symbol}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5">
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Start date</label>
                            <input ref={startDate} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-600 focus:ring-2 focus:ring-blue-600" type="date"/>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">End date</label>
                            <input ref={endDate} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-600 focus:ring-2 focus:ring-blue-600" type="date" />
                        </div>
                    </div>
                    <h1 className='text-blue-600'>{message}</h1>
                    <div className="mt-5">
                        <button
                            onClick={handleClick} 
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-600 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transform active:scale-95" type="submit">
                            Create Trip
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateTrips;