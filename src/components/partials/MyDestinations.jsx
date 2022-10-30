import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Numeral from 'react-numeral';

export default function MyDestinations({currentUser}) {
    
    // destinations from the backend
    const [destinations, setDestinations] = useState([])
    const [completed, setCompleted] = useState([])
    // state for messages from the backend
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const getDestinations = async () => {
            try {  
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${currentUser}/`)
                const completedTrips = response.data.destinations.filter(destination => destination.completed == true)
                const destinations = response.data.destinations.filter(destination => destination.completed == false)
                setDestinations(destinations)
                setCompleted(completedTrips)

            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getDestinations()
    }, []) // 
    
    

    const destinationsToDisplay = destinations.map((destination,idx) => {

        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110" key={`${destination.id}-${idx}`}>
                <ul>
                    <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='400px'/></Link>
                    <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mb-2">{destination.name}</div></Link>
                    <div><small className="text-gray-700 text-base">Budget: $<Numeral value={destination.budget} format={"0,0.00"} /></small></div>
                    <div><small className="text-gray-700 text-base">Total Expenses: $<Numeral value={destination.expenses.reduce((amount, expense) => amount + expense.amount, 0)} format={"0,0.00"}/></small></div>
                    <small className="text-gray-700 text-base">{destination.date}</small>
                    <br></br>
                </ul>
            </div>
        )
    })



    const completedToDisplay = completed.map((destination,idx) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110" key={`${destination.id}-${idx}`}>
                <ul>
                    <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='400px'/></Link>
                    <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mb-2">{destination.name}</div></Link>
                    <div><small className="text-gray-700 text-base">Budget: $<Numeral value={destination.budget} format={"0,0.00"} /></small></div>
                    <div><small className="text-gray-700 text-base">Total Expenses: $<Numeral value={destination.expenses.reduce((amount, expense) => amount + expense.amount, 0)} format={"0,0.00"}/></small></div>
                    <small className="text-gray-700 text-base">{destination.date}</small>
                </ul>
            </div>
        )
    })    


    return (
        <div className='flex items-center flex-col justify-center'>
            <br></br>
            <p className='text-xl font-bold'>My Destinations:</p>
            
            <div className='grid grid-cols-2 gap-8 mx-4 my-5 justify-items-center'>
              {destinationsToDisplay}
            </div>

            <p className='text-xl font-bold'>My Completed Destinations:</p>
            
            <div className='grid grid-cols-2 gap-8 mx-4 my-5 justify-items-center'>
              {completedToDisplay}
            </div>

            <p>{errorMessage}</p>
        </div>
    )
}