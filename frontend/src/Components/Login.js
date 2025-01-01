import React, { useRef, useState } from 'react'
import { LOGIN_BG } from '../utils/constants';
import { useNavigate } from 'react-router';

const Login = () => {

  const [signIn, setSignin] = useState(0);
  const [signupMessage, setSignUpMessage] = useState("");
  const [signinMessage, setSignInMessage] = useState("");
  const Navigate = useNavigate();

  let email = useRef(null);
  let username = useRef(null);
  let fullName = useRef(null);
  let password = useRef(null);

  const handleClick = async () => {
    email=email?.current?.value || "";
    username=username?.current?.value || "";
    fullName=fullName?.current?.value || "";
    password=password?.current?.value || "";

    try{
      if(signIn){
        const res = await fetch("http://localhost:4000/user/signin", {
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            "email" : email,
            "password" : password
          })
        })

        const json = await res.json();
        const token = json.token;
        setSignInMessage(json.message);
        if(token){
          localStorage.setItem("token", token);
          Navigate("/");
        }
      }
      else{
        const res = await fetch("http://localhost:4000/user/signup", {
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            "email" : email,
            "password" : password,
            "fullName" : fullName,
            "username": username
          })
        })
        
        const json = await res.json();
        setSignUpMessage(json.message);
      }
    }
    catch(error){
      console.error("Error occurred:", error);
    }
  }

  return (
    <div className=''>
      <img src = {LOGIN_BG} alt = "Login bacakground" className='h-screen w-screen' />
      <div className='z-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col mt-[20px] '>
        <h1 className='bg-cyan-700/40 mx-auto text-5xl font-thin p-4 rounded-3xl shadow-2xl'>Welcome to Tripzy!</h1>
        <form 
          onSubmit={e => e.preventDefault()}
          className='z-0 mt-[50px] bg-cyan-700/40 rounded-3xl h-[550px] w-[425px] flex justify-center items-center flex-col'>
          
          <h1 className= 'text-4xl mb-[40px] '>{signIn ? "SIGN IN" : "SIGN UP" }</h1>

          <input 
            placeholder='Email' 
            className='w-[280px] h-[35px] text-xl pl-[10px] mb-[40px] rounded-lg' 
            ref={email}>
          </input>

          {!signIn ? (<>
            <input 
              placeholder='Username' 
              className='w-[280px] h-[35px] text-xl pl-[10px] mb-[40px] rounded-lg' 
              ref={username}>
            </input>
            
            <input 
              placeholder='Fullname' 
              className='w-[280px] h-[35px] text-xl pl-[10px] mb-[40px] rounded-lg' 
              ref={fullName}>
            </input>
            </>
          ) : null}
          
          <input
            type='password'
            placeholder='Password' 
            className='w-[280px] h-[35px] text-xl pl-[10px] mb-[35px] rounded-lg' 
            ref={password}>
          </input>

          <h1 className='text-red-700 pb-[15px] font-bold text-lg'>{signIn ? signinMessage : signupMessage}</h1>

          <button
            onClick={handleClick}
            className="h-[35px] w-[90px] mb-[20px] font-medium uppercase tracking-wider text-black bg-white border-none rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:shadow-black hover:translate-y-[-7px] active:translate-y-[-1px] focus:outline-none">
            {signIn ? "Sign In" : "Sign up"}
          </button>

          <button 
            className='text-white mb-[20px] hover:underline duration-300'
            onClick={() => setSignin(!signIn)}>
            {signIn ? "Start your Tripzy journey! Create an account." : "Returning? Log in to continue your adventure."}
          </button>
        </form> 
      </div>
    </div>
  )
}

export default Login;