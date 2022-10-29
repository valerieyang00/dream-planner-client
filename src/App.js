import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// pages
import About from './components/pages/About'
import Destination from './components/pages/Destination'
import Destinations from './components/pages/Destinations'
import EditDestination from './components/pages/EditDestination'
import EditExpense from './components/pages/EditExpense'
import Expenses from './components/partials/Expenses'
import Home from './components/pages/Home'
import NewDestination from './components/pages/NewDestination'
import NewExpense from './components/pages/NewExpense'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import Hotels from './components/pages/Hotels';

// partials
import Navbar from './components/partials/NavBar';


export default function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('jwt')? { userId: jwt_decode(localStorage.getItem('jwt')).user_id }: null)
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };


  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
        document.body.className = theme;
    // check to see if token is in storage
        const token = localStorage.getItem('jwt')
        if (token) {
          const decoded = jwt_decode(token)
          // if so, we will decode it and set the user in app state
          setCurrentUser({userId: decoded.user_id})
        } else {
          setCurrentUser(null)
        }
    }, [theme]) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)      
    }
  }

  return (
    <div className={`App ${theme}`}>
      <br></br>
      <br></br>
      <label htmlFor="small-toggle" className="inline-flex relative items-right mb-5 cursor-pointer">
        <input type="checkbox" onClick={toggleTheme} id="small-toggle" className="sr-only peer" />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
      </label>
      <Router>
        <header>
          <Navbar
          currentUser={currentUser}
          handleLogout={handleLogout}
          />
        </header>
        <div className='App'>
          <Routes>

            <Route 
            path='/'
            element={<Home />}          
            />

            <Route
              path='/register'
              element={<Register />}
            />

            <Route
              path='/login'
              element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            />

            <Route
              path='/users/:userId'
              element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout}/>}
            />

            <Route
              path='/users/:userId/edit'
              element={<EditProfile currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout}/>}
            />

      
            <Route 
              path='/destinations'
              element={<Destinations currentUser={currentUser} setCurrentUser={setCurrentUser}/>}          
            />

            <Route 
              path='/destinations/:destinationId'
              element={<Destination currentUser={currentUser} setCurrentUser={setCurrentUser}/>}          
            />

            <Route
              path='/destinations/new'
              element={<NewDestination currentUser={currentUser} setCurrentUser={setCurrentUser}/>}                    
            />

            <Route 
              path='/destinations/:destinationId/edit'
              element={<EditDestination currentUser={currentUser} setCurrentUser={setCurrentUser}/>}          
            />

            <Route
              path='/destinations/:destinationId/expenses'
              element={<Expenses currentUser={currentUser} setCurrentUser={setCurrentUser}/>}
            />

            <Route 
              path='/destinations/:destinationId/expenses/new'
              element={<NewExpense currentUser={currentUser} setCurrentUser={setCurrentUser}/>}          
            />

            <Route 
              path='/destinations/:destinationId/expenses/:expenseId/edit'
              element={<EditExpense currentUser={currentUser} setCurrentUser={setCurrentUser}/>}          
            />

            <Route 
              path='/about'
              element={<About />}          
            />

            {/* --------PARTIALS----------- */}


            <Route 
              path='/hotels'
              element={<Hotels />}          
            />

          </Routes>
        </div>



      </Router>
    </div>
  );
}


