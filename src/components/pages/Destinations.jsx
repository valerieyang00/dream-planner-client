import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Destinations() {

    const [msg, setMsg] = useState("")
    const [destinations, setDestinations] = useState([])

    useEffect(() => {

        const getDestinations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/`)
                const users = response.data
                const allDestinations = []
                users.forEach((user) => {
                    user.destinations.forEach((destination) => {
                        destination["username"] = user["username"]
                        allDestinations.push(destination)
                    })
                })
                setDestinations(allDestinations)                           
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestinations()
    },[])

    const renderPage = destinations.map((destination, idx) => {
          return (
            <ul key={`${destination.id}-${idx}`}>
                <Link to={`/destinations/${destination.id}`}><h2>{destination.name}</h2></Link>
                <small>{destination.username}</small>
                <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='rounded-3xl border-4 border-gray-400	' width='700px'/></Link>
            </ul>
        )

    })

    return (

        <div className='flex items-center flex-col justify-center'>
            {msg}
            {renderPage}
        </div>
    )
}

