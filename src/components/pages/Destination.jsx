import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Expenses from '../partials/Expenses'
import MyDashboard from '../partials/MyDashboard'

export default function Destination({currentUser}) {
    const [msg, setMsg] = useState("")
    const { destinationId } = useParams()
    const [destination, setDestination] = useState([])
    const [form, setForm] = useState({})
    if (!currentUser) {
        currentUser = {userId: ''}
    }

    const navigate = useNavigate()

    useEffect (() => {

        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`)
                const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${response.data.user}/`)
                response.data['username'] = user.data.username
                setDestination(response.data)
                const data = response.data
                delete data["expenses"]
                setForm(data)

            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestination()

    },[])

    const userExpenses = (
        <div>
            <Link to={`/destinations/${destinationId}/edit`}><h4>Edit Destination</h4></Link>
            <h4>All Expenses:</h4>
            <Link to={`/destinations/${destinationId}/expenses/new`}><h4>Add New Expense</h4></Link>
            <Expenses destinationId ={destination.id} budget = {destination.budget}/>
        </div>
    )

    const markComplete = async () => {
        try {
            const changedForm = form
            changedForm.completed = true
            console.log(changedForm)
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`, changedForm)
            navigate(`/destinations/${destinationId}`)
            
        }catch(err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const userDestination = (
        <div>
            <Link to={`/destinations/${destinationId}/edit`}><h4>Edit Destination</h4></Link>
            <button onClick={markComplete} style={{pointerEvents: destination.completed ? 'none' : 'auto'}}>{destination.completed ? 'Completed Trip' : 'Mark this dream completed'}</button>

        </div>
    )
    
    return (
        <div>
            {msg}
            <h1>{destination.username}'s Dream Vacation</h1>
            <h1>{destination.name}</h1>
            {currentUser.userId == destination.user ? 
            userDestination : ''}
            <h3>${destination.budget}</h3>
            <img src={destination.photo} alt={destination.name}/>
            <h4>{destination.description}</h4>
            {currentUser.userId == destination.user ? userExpenses : ''}
  
        </div>
    )
}