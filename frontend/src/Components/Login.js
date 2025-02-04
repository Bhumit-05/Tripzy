import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [signIn, setSignin] = useState(0);
  const [signupMessage, setSignUpMessage] = useState("");
  const [signinMessage, setSignInMessage] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  let email = useRef(null);
  let username = useRef(null);
  let fullName = useRef(null);
  let password = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Navigate('/');
    }
  }, [Navigate]);

  const handleClick = async () => {
    email = email?.current?.value || "";
    username = username?.current?.value || "";
    fullName = fullName?.current?.value || "";
    password = password?.current?.value || "";

    try {
      if (signIn) {
        const res = await fetch("https://tripzy-1.onrender.com/user/signin", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const json = await res.json();
        const token = json.token;
        dispatch(addUser(json.user));
        setSignInMessage(json.message);
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(json.user));
          Navigate("/home");
        }
      } else {
        const res = await fetch("https://tripzy-1.onrender.com/user/signup", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            fullName: fullName,
            username: username,
          }),
        });

        const json = await res.json();
        setSignUpMessage(json.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center font-light">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-300 w-[400px]">
        <h1 className="text-center text-4xl  text-gray-800 mb-6 font-extralight">Welcome to Tripzy!</h1>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-4">
          <h2 className="text-center text-2xl text-gray-600 mb-4">
            {signIn ? "Sign In" : "Sign Up"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            ref={email}
          />

          {!signIn && (
            <>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                ref={username}
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                ref={fullName}
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
            ref={password}
          />

          <p className="text-center text-red-500 font-semibold">{signIn ? signinMessage : signupMessage}</p>

          <button
            onClick={handleClick}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-light shadow-md hover:bg-blue-700 transition-all"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>

          <button
            className="text-center mt-4 text-gray-600 hover:underline font-medium"
            onClick={() => setSignin(!signIn)}
          >
            {signIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
