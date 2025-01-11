import React, { useRef, useState } from 'react'
import Header from './Header';

const CreateTrips = () => {

    let tripName = useRef(null);
    let destination = useRef(null);
    let startDate = useRef(null);
    let endDate = useRef(null);

    const [isSubmit, setIsSubmit] = useState(0);
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        if(isSubmit===1) return;  // done becuase, if the form is submited and then again submitted then there is a possibility then it didn't complete the req and we gave a req again, this doesnt let the useState var update properly
        setIsSubmit(1);

        tripName = tripName?.current?.value || "";
        destination = destination?.current?.value || "";
        startDate = startDate?.current?.value || null;
        endDate = endDate?.current?.value || null;

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
                "endDate" : endDate
            })
        })

        const json = await res.json();
        setMessage(json.message);
        setIsSubmit(0);
    }

  return (
    <div className='font-thin'>
        <Header/>

        <h1 className='max-w-fit mx-auto lg:text-5xl text-2xl my-[100px]'>Plan Your Perfect Journey, One Trip at a Time</h1>
        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-[50px]">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-2xl rounded-3xl sm:p-10">
                <div className="max-w-md mx-auto">
                    <h1 className='mx-auto max-w-fit font-thin lg:text-4xl text-xl'>Trip Details</h1>
                    <div className="mt-5 grid grid-cols-1 gap-5">
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Trip Name</label>
                            <input ref={tripName} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Destination</label>
                            <input ref={destination} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-5">
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">Start date</label>
                            <input ref={startDate} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="date"/>
                        </div>
                        <div>
                            <label className="font-semibold text-sm text-gray-600 pb-1 block">End date</label>
                            <input ref={endDate} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500" type="date" />
                        </div>
                    </div>
                    <h1 className='text-red-600'>{message}</h1>
                    <div className="mt-5">
                        <button
                            onClick={handleClick} 
                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg transform active:scale-95" type="submit">
                            Create Trip
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateTrips;