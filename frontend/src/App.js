import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import './App.css';
import Error from './Components/Error';
import Home from './Components/Home';
import Login from './Components/Login';
import { useState } from 'react';

function App() {

  const [token, ] = useState(localStorage.getItem("token"));

  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : token ? <Home/> : <Navigate to = "/login"/>,
      errorElement : <Error/>
    },
    {
      path : "/login",
      element : token ? <Navigate to = "/"/> : <Login/>,
      errorElement : <Error/>
    }
  ])

  return (
    <RouterProvider router = {appRouter} />
  );
}

export default App;
