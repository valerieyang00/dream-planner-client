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

    const renderPage = destinations.map((destination) => {
          return (
            <ul key={destination.id}>
                <Link to={`/destinations/${destination.id}`}><h2>{destination.name}</h2></Link>
                <small>{destination.username}</small>
                <img src={destination.photo} alt={destination.name} />
            </ul>
        )

    })

    return (

        <div>
            {msg}
            {renderPage}
        </div>
    )
}

