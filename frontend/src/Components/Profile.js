import React from 'react'
import { useNavigate } from 'react-router';
import Header from './Header';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
      localStorage.clear();
      sessionStorage.clear();
      dispatch({ type: "RESET" });
      Navigate("/login");
    }

    const user = JSON.parse(sessionStorage.getItem("user"));

    return (
        <div>
            <Header/>
            <button onClick={handleClick} className='md:mr-20 bg-red-600 rounded-3xl w-[100px] h-[50px] flex items-center justify-center p-2 text-white hover:bg-red-700 duration-300'>Logout</button>
        </div>
    )
}

export default Profile;