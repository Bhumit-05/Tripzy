import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Error from './Components/Error';
import Home from './Components/Home';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import CreateTrips from './Components/Create Trips';
import Friends from './Components/Friend Page/Friends';
import TripPage from './Components/TripPage';


function App() {

  const appRouter = createBrowserRouter([
    {
      path : "/",
      element : (
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
      ),
      errorElement : <Error/>
    },
    {
      path : "/login",
      element : <Login/>,
      errorElement : <Error/>
    },
    {
      path : "/createTrips",
      element : (
        <PrivateRoute>
          <CreateTrips/>
        </PrivateRoute>
      ),
      errorElement : <Error/>
    },
    {
      path : "/friends",
      element : (
        <PrivateRoute>
          <Friends/>
        </PrivateRoute>
      ),
      errorElement : <Error/>
    },
    {
      path : "/trip/:tripId",
      element : (
        <PrivateRoute>
          <TripPage/>
        </PrivateRoute>
      ),
      errorElement : <Error/>
    }
  ])

  return (
    <RouterProvider router = {appRouter} />
  );
}

export default App;
