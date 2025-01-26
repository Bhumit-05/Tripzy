import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { triggerRefresh } from '../../utils/userSlice';

const RemoveTraveller = ({travellerUsernames, tripId}) => {
    const [removeMessage, setRemoveMessage] = useState("");
    const [selectedTraveller, setSelectedTraveller] = useState("");

    const handleTravellerChange = (event) => {
        setSelectedTraveller(event.target.value);
    };

    const reset = () => {
        setTimeout(() => {
            setRemoveMessage("");
        }, 3000)
    }

    const dispatch = useDispatch();

    const handleRemoveClick = async () => {
        const friends = JSON.parse(localStorage.getItem("friends"));
        const traveller = friends.find(friend => friend.username === selectedTraveller);

        if(selectedTraveller===(JSON.parse(localStorage.getItem("user"))).username){
            setRemoveMessage("You can't remove yourself!");
            return;
        }

        if(!traveller){
            setRemoveMessage("User not Found!");
            return;
        }

        const res = await fetch("http://localhost:4000/trips/removeTraveller", {
            method : "DELETE",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            },
            body : JSON.stringify({
                tripId : tripId,
                travellerId : traveller._id
            })
        })

        const json = await res.json();
        setRemoveMessage(json.message);
        dispatch(triggerRefresh());
    }

    return (
        <div className='flex flex-row'>
            <label htmlFor="traveller-select" className='font-normal text-xl'>Remove a traveller:</label>

            <select id="traveller-select" className='mx-4 w-44 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"' value={selectedTraveller} onChange={handleTravellerChange}>
                <option value="">  Choose a traveller </option>
                {travellerUsernames.map((traveller) => (
                    <option key={traveller}>
                        {traveller}
                    </option>
                ))}
            </select>

            <button className='bg-red-500 duration-300 hover:bg-red-600 text-white p-2 rounded-lg transition transform active:scale-90' onClick={() => {handleRemoveClick(); reset();}}>Remove</button>
            <div>
                <p className='hidden md:block lg:block ml-10 text-red-500'>{removeMessage}</p>
            </div>
        </div>
    )
}

export default RemoveTraveller;