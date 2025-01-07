import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { triggerRefresh } from "../../utils/userSlice";

const AddTraveller = ({trip}) => {
    
    const [selectedFriend, setSelectedFriend] = useState("");
    const [addMessage, setAddMessage] = useState("");
    const friends = JSON.parse(sessionStorage.getItem("friends"));
    const tripId = trip?._id;
    const dispatch = useDispatch();

    const handleFriendChange = (event) => {
        setSelectedFriend(event.target.value);
    };

    const handleAddClick = async () => {

        const friends = JSON.parse(sessionStorage.getItem("friends"));
        const userId = friends.find(friend => friend.username === selectedFriend)?._id;
        
        if (!userId) {
            setAddMessage("User not found!");
            return;
        }

        if (trip?.travellers.includes(userId)) {
            setAddMessage("Traveller is already part of this trip.");
            return;
        }        

        const res = await fetch("http://localhost:4000/trips/addTraveller",{
            method : "POST",
            headers : {
                "content-type" : "application/json",
                "token" : localStorage.getItem("token")
            },
            body : JSON.stringify({
                tripId : tripId,
                travellerId : userId
            })
        })

        const json = await res.json();
        setAddMessage(json.message);
        dispatch(triggerRefresh());
    }

    return(
        <div className="flex flex-row">
           <div>
                <label htmlFor="friend-select" className='font-normal text-xl mr-9'>Add a traveller:</label>

                <select id="friend-select" className='mx-4 mb-5 w-44 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"' value={selectedFriend} onChange={handleFriendChange}>
                    <option value="">  Choose a friend </option>
                    {friends.map((friend) => (
                        <option key={friend._id} value={friend.username}>
                            {friend.username}
                        </option>
                    ))}
                </select>

                <button className='bg-blue-500 px-5 hover:bg-blue-600 text-white p-2 rounded-lg' onClick={handleAddClick}>Add</button>
           </div>
            <div>
                <p className="hidden md:block lg:block ml-10 text-blue-500">{addMessage}</p>
            </div>
        </div>
    );
}

export default AddTraveller;