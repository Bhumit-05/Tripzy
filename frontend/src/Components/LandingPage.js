import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LOGO } from '../utils/constants';

const LandingPage = () => {
  const Navigate = useNavigate();

  const handleGetStarted = () => {
    Navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Navigate("/home");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1736230990003-a98eea26ea1f?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 text-center text-white px-6 py-8">
        <img src={LOGO} alt="Tripzy Logo" className="mx-auto mb-4 w-40 h-auto" />
        
        <h1 className="text-6xl font-extralight mb-4">Tripzy</h1>
        <p className="text-xl font-extralight mb-4">Where Every Trip’s Easy!</p>
        <p className="text-lg font-extralight mb-8 max-w-md mx-auto">Explore new destinations effortlessly, plan your trips, and share unforgettable moments with friends—all in one place with Tripzy.</p>

        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-700 text-white text-xl font-extralight rounded-full hover:bg-blue-800 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
