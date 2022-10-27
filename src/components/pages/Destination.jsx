import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from 'react-router-dom'
import Expenses from '../partials/Expenses'

export default function Destination({currentUser}) {
    const [msg, setMsg] = useState("")
    const { id } = useParams()
    const [destination, setDestination] = useState([])


    useEffect (() => {

        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${id}/`)
                setDestination(response.data)
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestination()


    },[])

    const userDestination = (
        <div>
            {/* import budget/expense tracker dashboard here */}
            <h4>All expenses:</h4>
            <Expenses destinationid ={destination.id}/>
        </div>
    )
    
    return (
        <div>
            {msg}
            <h1>{destination.name}</h1>
            <h3>{destination.budget}</h3>
            <img src={destination.photo} alt={destination.name}/>
            <h4>{destination.description}</h4>
            {currentUser.userId == destination.user ? userDestination : ''}
  
        </div>
    )
}