import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MyDestinations({currentUser}) {
    
    // destinations from the backend
    const [destinations, setDestinations] = useState([])
    const [completed, setCompleted] = useState([])
    // state for messages from the backend
    const [errorMessage, setErrorMessage] = useState('')
    // console.log('server url', process.env.REACT_APP_SERVER_URL)

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
            <div key={`${destination.id}-${idx}`}>
            <Link to={`/destinations/${destination.id}`}><ul>
                <li>{destination.name}</li>
                <li>Budget: ${destination.budget}</li>
                <li><img src={destination.photo} /></li>
                <li>Details: {destination.description}</li>
                <li>{destination.date}</li>
            </ul></Link>
            </div>
        )
    })

    const completedToDisplay = completed.map((destination,idx) => {
        return (
            <div key={`${destination.id}-${idx}`}>
            <Link to={`/destinations/${destination.id}`}><ul>
                <li>{destination.name}</li>
                <li>Budget: ${destination.budget}</li>
                <li><img src={destination.photo} /></li>
                <li>Details: {destination.description}</li>
                <li>{destination.date}</li>
            </ul></Link>
            </div>
        )
    })


    return (
        <div className='flex items-center flex-col justify-center'>
            <h1>My Destinations:</h1>
            
              {destinationsToDisplay}

            <h1>My Completed Destinations:</h1>
            
              {completedToDisplay}
            
            <p>{errorMessage}</p>
        </div>
    )
}