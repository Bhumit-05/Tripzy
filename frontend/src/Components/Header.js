import React from 'react'
import { Link, useNavigate } from 'react-router';
import { LOGO } from '../utils/constants';

const Header = () => {

  const Navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  }

  return (
    <div className=' h-[100px] z-10 bg-transparent border-black border-b-2 flex justify-between'>
        <Link to={"/"}><img src={LOGO} alt='logo' className='w-3/5 mt-[15px] ml-[50px]'/></Link>
        <div className='my-auto max-h-fit flex flex-row font-normal'>
          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center md:mr-20 sm:mr-5 hover:bg-slate-200 duration-300 mx-auto' to={"/"}>
            Home
          </Link>

          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center md:mr-20 sm:mr-5 hover:bg-slate-200 duration-300 mx-auto' to={"/createTrips"}>
            Create Trip
          </Link>
          
          <Link className='border-black border-2 rounded-3xl w-[100px] h-[50px] flex items-center justify-center p-2 md:mr-20 hover:bg-slate-200 duration-300' to={"/friends"}>
            Friends
          </Link>

          <button onClick={handleClick} className='md:mr-20 bg-red-600 rounded-3xl w-[100px] h-[50px] flex items-center justify-center p-2 text-white hover:bg-red-700 duration-300'>Logout</button>
        </div>
    </div>
  )
}

export default Header;