import React, { useEffect } from 'react'
import { Link } from 'react-router';
import { LOGO } from '../utils/constants';
import { useSelector } from 'react-redux';
import useGetUserCurrencyDetails from '../hooks/useGetUserCurrencyDetails';

const Header = () => {

  const dp_url = JSON.parse(localStorage.getItem("user"))?.dp_url;
  const userCurrency = useSelector(state => state.currency.userCurrency);
  const user = JSON.parse(localStorage.getItem("user"));
  const getUserCurrencyDetails = useGetUserCurrencyDetails(user?.currencyCode);

  useEffect(() => {
    if(userCurrency===null){
      getUserCurrencyDetails();
    }
  }, [])

  const getUser = async () => {
    const res = await fetch("http://localhost:4000/user/getUser", {
      headers : {
        "token" : localStorage.getItem("token")
      }
    });
    const json = await res.json();
    localStorage.setItem("user", JSON.stringify(json));
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className=' h-[100px] shadow-md border-gray-300 border-b-2 flex justify-between items-center relative'>
        <Link to={"/"}><img src={LOGO} alt='logo' className='hidden sm:block w-3/5 mt-[15px] ml-[50px]'/></Link>
        <div className='my-auto max-h-fit flex flex-row font-normal'>
          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center md:mr-20 sm:mr-5 hover:bg-slate-200 duration-300 mx-auto' to={"/"}>
            Home
          </Link>

          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center md:mr-20 sm:mr-5 hover:bg-slate-200 duration-300 mx-auto' to={"/createTrips"}>
            Create Trip
          </Link>
          
          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center p-2 md:mr-60 mr-24 hover:bg-slate-200 duration-300' to={"/friends"}>
            Friends
          </Link>

          <Link className='absolute top-[50%] right-[20px] transform -translate-y-[50%]' to={"/profile"}>
            <img src={dp_url} alt="profile" className="w-[70px] h-[70px] md:mr-16 rounded-full hover:scale-110 transition-all ease-in-out duration-300 object-cover border-2 border-black"/>
          </Link>

        </div>
    </div>
  )
}

export default Header;