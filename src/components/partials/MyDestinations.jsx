import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MyDestinations({currentUser}) {
    
    // destinations from the backend
    const [destinations, setDestinations] = useState([])
    // state for messages from the backend
    const [errorMessage, setErrorMessage] = useState('')
    // console.log('server url', process.env.REACT_APP_SERVER_URL)

    useEffect(() => {
        const getDestinations = async () => {
            try {  
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${currentUser}/`)
                // console.log(response.data)
                setDestinations(response.data)
            } catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)
                }
            }
        }
        getDestinations()
    }, []) // 
    
    
    // const myDestinations = destinations.map(destination => {
    //     return (
    //         <div key={destination.id}>
    //             <Link to={`/users/${userId}/destinations/${destinationId}`}>{destination.name}</Link>
    //         </div>
    //     )
    // })


    return (
        <div>
            <h1>My Destinations:</h1>
            
            {/*   {myDestinations} */}
            
            <p>{errorMessage}</p>
        </div>
    )
}