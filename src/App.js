import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import About from './components/pages/About'
import Destination from './components/pages/Destination'
import Destinations from './components/pages/Destinations'
import EditDestination from './components/pages/EditDestination'
import EditExpense from './components/pages/EditExpense'
import Expense from './components/pages/Expense'
import Expenses from './components/pages/Expenses'
import Home from './components/pages/Home'
import NewDestination from './components/pages/NewDestination'
import NewExpense from './components/pages/NewExpense'
import Navbar from './components/partials/NavBar';

export default function App() {
  return (
    <Router>
      <header>
        <Navbar
        
        />
      </header>
      <div className='App'>
        <Routes>
          <Route
            path='/expense'
            element={<Expenses />}
          />

          <Route
            path='/expense/:id'
            element={<Expense />}          
          />

          <Route 
            path='/expense/new'
            element={<NewExpense />}          
          />

          <Route 
            path='/expense/:id/edit'
            element={<EditExpense />}          
          />

          <Route 
            path='/'
            element={<Home />}          
          />

          <Route 
            path='/destination'
            element={<Destinations />}          
          />

          <Route 
            path='/destination/:id'
            element={<Destination />}          
          />

          <Route
            path='/destination/new'
            element={<NewDestination />}                    
          />

          <Route 
            path='/destination/:id/edit'
            element={<EditDestination />}          
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


