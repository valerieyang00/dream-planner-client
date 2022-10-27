import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

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
import Navbar from './components/partials/NavBar';

export default function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('jwt')? { userId: jwt_decode(localStorage.getItem('jwt')).user_id }: null)


  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
        const token = localStorage.getItem('jwt')
        if (token) {
          const decoded = jwt_decode(token)
          // if so, we will decode it and set the user in app state
          setCurrentUser({userId: decoded.user_id})
        } else {
          setCurrentUser(null)
        }
    }, []) // happen only once

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
            path='/profile'
            element={<Profile />}
          />

          <Route
            path='/profile/edit'
            element={<EditProfile />}
          />

    
          <Route 
            path='/destinations'
            element={<Destinations currentUser={currentUser}/>}          
          />

          <Route 
            path='/destinations/:id'
            element={<Destination currentUser={currentUser}/>}          
          />

          <Route
            path='/destinations/new'
            element={<NewDestination currentUser={currentUser}/>}                    
          />

          <Route 
            path='/destinations/:id/edit'
            element={<EditDestination />}          
          />

          <Route
            path='/destinations/:id/expenses'
            element={<Expenses />}
          />

          <Route 
            path='/destinations/:id/expenses/new'
            element={<NewExpense />}          
          />

          <Route 
            path='/destinations/:destinationid/expenses/:expenseid/edit'
            element={<EditExpense />}          
          />

          <Route 
            path='/about'
            element={<About />}          
          />
        </Routes>
      </div>



    </Router>
  );
}


