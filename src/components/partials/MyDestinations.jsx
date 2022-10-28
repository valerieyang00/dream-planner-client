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
    
    
    // const destinationsToDisplay = destinations.map((destination,idx) => {
    //     return (
    //         <div key={`${destination.id}-${idx}`}>
    //         <Link to={`/destinations/${destination.id}`}><ul>
    //             <li>{destination.name}</li>
    //             <li>Budget: ${destination.budget}</li>
    //             <li><img src={destination.photo} /></li>
    //             <li>Details: {destination.description}</li>
    //             <li>{destination.date}</li>
    //         </ul></Link>
    //         </div>
    //     )
    // })

    const destinationsToDisplay = destinations.map((destination,idx) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110">
                <ul key={`${destination.id}-${idx}`}>
                    <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='400px'/></Link>
                    <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mb-2">{destination.name}</div></Link>
                    {/* <small className="text-gray-700 text-base">{destination.username}'s Dream</small> */}
                    <div><small className="text-gray-700 text-base">Budget: ${destination.budget}</small></div>
                    <div><small className="text-gray-700 text-base">Details: {destination.description}</small></div>
                    <small className="text-gray-700 text-base">{destination.date}</small>
                    <br></br>
                </ul>
            </div>
        )
    })

    // const completedToDisplay = completed.map((destination,idx) => {
    //     return (
    //         <div key={`${destination.id}-${idx}`}>
    //         <Link to={`/destinations/${destination.id}`}><ul>
    //             <li>{destination.name}</li>
    //             <li>Budget: ${destination.budget}</li>
    //             <li><img src={destination.photo} /></li>
    //             <li>Details: {destination.description}</li>
    //             <li>{destination.date}</li>
    //         </ul></Link>
    //         </div>
    //     )
    // })


    const completedToDisplay = completed.map((destination,idx) => {
        return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110">
                <ul key={`${destination.id}-${idx}`}>
                    <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='400px'/></Link>
                    <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mb-2">{destination.name}</div></Link>
                    {/* <small className="text-gray-700 text-base">{destination.username}'s Dream</small> */}
                    <div><small className="text-gray-700 text-base">{destination.budget}</small></div>
                    <div><small className="text-gray-700 text-base">{destination.description}</small></div>
                    <small className="text-gray-700 text-base">{destination.date}</small>
                </ul>
            </div>
        )
    })    


    return (
        <div className='flex items-center flex-col justify-center'>
            <h1>My Destinations:</h1>
            
            <div className='grid grid-cols-2 gap-8 mx-4 my-5 justify-items-center'>
              {destinationsToDisplay}
            </div>

            <h1>My Completed Destinations:</h1>
            
            <div className='grid grid-cols-2 gap-8 mx-4 my-5 justify-items-center'>
              {completedToDisplay}
            </div>

            <p>{errorMessage}</p>
        </div>
    )
}
