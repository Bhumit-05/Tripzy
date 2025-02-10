import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import useGetCurrencies from '../hooks/useGetCurrencies';
import useGetUserCurrencyDetails from '../hooks/useGetUserCurrencyDetails';

const Profile = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"));
    const getCurrencies = useGetCurrencies();
    const getUserCurrencyDeatails = useGetUserCurrencyDetails();
    const dp_url = useSelector(state => state.user.dp_url);

    const [showDialog, setShowDialog] = useState(false);

    const currencies = useSelector(state => state.currency.currencies);
    
    useEffect(() => {
        if(currencies.length===0){
            getCurrencies();
        }
    }, [currencies.length])

    const [nameValue, setNameValue] = useState(user?.fullName);
    const [dpurl, setDpurl] = useState(user?.dp_url);
    const [isEditable, setEdit] = useState(false);
    const [currencyCode, setCurrencyCode] = useState(user?.currencyCode);

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    }
    const handleCurrencyChange = (e) => {
        setCurrencyCode(e.target.value);
    }
    const handleDpChange = (e) => {
        setDpurl(e.target.value)
    }
    const handleEditChange = async (updated) => {

        // This is done because if the field is changed without updating db then the data should be restored back to its original value after the editing mode is switched
        if(isEditable){
            const res = await fetch("http://localhost:4000/user/getUser", {
                method : "GET",
                headers : {
                    "token" : localStorage.getItem("token")
                }
            });
            const json = await res.json();
            setNameValue(json.fullName);
            setDpurl(json.dp_url);
            setCurrencyCode(json.currencyCode);
        }

        if(!updated){
            setEdit(!isEditable);
        }
    }

    const handleUpdateClick = async () => {
        const res = await fetch(`http://localhost:4000/user/${user?._id}`, {
            method : "PUT",
            headers : {
                "token" : localStorage.getItem("token"),
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                fullName : nameValue,
                dp_url : dpurl,
                currencyCode : currencyCode,
            })
        })
        const json = await res.json();

        localStorage.setItem("user", JSON.stringify(json));
        console.log(json);

        setNameValue(json.fullName);
        setDpurl(json.dp_url);
        setCurrencyCode(json.currencyCode);
        
        getUserCurrencyDeatails();

        setShowDialog(true);
        setTimeout(() => setShowDialog(false), 3000);
    }

    const handleLogoutClick = () => {
      localStorage.clear();
      dispatch({ type: "RESET" });
      Navigate("/");
    }

    return (
        <div>
            <Header/>

            <div className='mt-60 border border-gray-400 bg-gray-200 pt-20 rounded-2xl w-7/12 mx-auto mb-20 pb-20'>
                <img 
                src={dp_url}
                className='max-w-fit rounded-full mx-auto sm:w-40 sm:40 w-32 h-32 border-2 border-black mb-10'/>

                <div className='grid sm:grid-cols-2 grid-cols-1'>
                    <div className='flex flex-col w-full p-6'>
                        <label>Name</label>
                        {isEditable === true ? (
                            <input type="text" value={nameValue} onChange={handleNameChange}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full focus:ring-2 focus:ring-blue-600"/>
                        ) : (
                            <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed">{nameValue}</span>
                        )}
                    </div>

                    <div className='flex flex-col w-full p-6'>
                        <label>Username</label>
                        <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed">{user?.username}</span>
                    </div>

                    <div className='flex flex-col w-full p-6'>
                        <label>DP URL</label>
                        {isEditable === true ? (
                            <input type="text" value={dpurl} onChange={handleDpChange}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full focus:ring-2 focus:ring-blue-600"/>
                        ) : (
                            <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed overflow-x-auto whitespace-nowrap">{dpurl}</span>
                        )}
                    </div>

                    <div className='flex flex-col w-full p-6'>
                        <label>Email</label>
                        <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed">{user?.email}</span>
                    </div>

                    <div className='flex flex-col w-full p-6'>
                        <label>Currency</label>
                        {isEditable === true ? (
                            <select
                            onChange={handleCurrencyChange}
                            className="border rounded-lg px-3 py-2 mt-1 text-sm w-full focus:ring-2 focus:ring-blue-600">
                                <option>{currencyCode} </option>
                                {currencies.map(currency => <option key={currency._id} value={currency.currencyCode}>{currency.currencyCode} : {currency.symbol}</option>)}
                            </select>
                        ) : (
                            <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed">{currencyCode}</span>
                        )}
                    </div>

                    <div className='flex flex-col w-full p-6'>
                        <label>Number of Friends</label>
                        <span className="border rounded-lg px-3 py-2 mt-1 text-sm w-full bg-gray-100 text-gray-500 cursor-not-allowed">{user?.friends.length}</span>
                    </div>
                </div>

                <div className='grid sm:grid-cols-2 grid-cols-1'>
                    <button onClick={() => {handleEditChange(false)}} className='bg-blue-600 mx-auto duration-300 my-8 h-10 w-40 font-light hover:bg-blue-700 text-white p-2 rounded-lg transition transform active:scale-90'>
                        {isEditable? "Editing Enabled" : "Edit Profile"}
                    </button>

                    {isEditable && (
                        <button onClick={handleUpdateClick} className='bg-blue-600 mx-auto duration-300 h-10 w-40 my-8 font-light hover:bg-blue-700 text-white p-2 rounded-lg transition transform active:scale-90'>
                            Update Profile
                        </button>
                    )}
                </div>

                {showDialog && (
                    <div className="fixed bottom-10 right-10 w-80 bg-gray-800 text-white text-base px-6 py-4 rounded-xl shadow-xl transition-transform transform scale-95 animate-fade-in">
                        <p className="font-medium">✅ Updated Successfully!</p>
                        <p className="text-gray-300 text-sm mt-1">
                            Your profile details have been updated successfully.
                        </p>
                    </div>
                )}

                <button onClick={handleLogoutClick} className='bg-red-600 mt-10 rounded-3xl w-[100px] h-[50px] flex items-center justify-center p-2 text-white hover:bg-red-700 duration-300 mx-auto'>Logout</button>
            </div>
        </div>
    )
}

export default Profile;