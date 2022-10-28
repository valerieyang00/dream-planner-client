import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Expenses from '../partials/Expenses'
import Modal from 'react-modal';

export default function Destination({currentUser}) {
    const [msg, setMsg] = useState("")
    const { destinationId } = useParams()
    const [destination, setDestination] = useState([])
    const [form, setForm] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [expectDate, setExpectDate] = useState('')
    const [saveAmount, setSaveAmount] = useState(0)
    const [modalMsg, setModalMsg] = useState('')

    if (!currentUser) {
        currentUser = {userId: ''}
    }

    const navigate = useNavigate()

    const setModalIsOpenToTrue = () => {
		setModalIsOpen(true)
	}

	const setModalIsOpenToFalse = () => {
		setModalIsOpen(false)
        setSaveAmount('')
        setExpectDate('')
        setModalMsg('')
	}

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
            <h4>All Expenses:</h4>
            <Link to={`/destinations/${destinationId}/expenses/new`}><h4>Add New Expense</h4></Link>
            <Expenses destinationId ={destination.id} budget = {destination.budget}/>
        </div>
    )

    const markComplete = async () => {
        try {
            const changedForm = form
            changedForm.completed = !changedForm.completed
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`, changedForm)
            navigate(`/destinations/${destinationId}`)
            
        }catch(err) {
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const handleDateChange = (e) => {
        setExpectDate(e.target.value)
        setSaveAmount('')
        setModalMsg('')
    }

    const handleEstimation = (e) => {
        e.preventDefault()
        let msg = ''
        let today = new Date().toISOString().slice(0, 10)
        let expectedDate = expectDate
        const diffInMs   = new Date(expectedDate) - new Date(today)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInDays == 1) {
            setSaveAmount(destination.budget)
        } else if (diffInDays <= 0){
            setSaveAmount(-1)
        } else {
            const numWeeks = diffInDays / 7
            const amountToSave = Math.round(destination.budget / numWeeks)
            setSaveAmount(amountToSave)
        }
      
    }

    const userDestination = (
        <div>
            <Link to={`/destinations/${destinationId}/edit`}><h4>Edit Destination</h4></Link>
            <button onClick={markComplete}>{destination.completed ? 'Completed Trip' : 'Mark as Completed'}</button>
            <button onClick={setModalIsOpenToTrue}>Calculate how much to save per week</button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false} backdrop="static">
				<form>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Expected Travel Date:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="date"
                        id="date"
                        value={expectDate}
                        onChange={handleDateChange}
                        required
                        />
                    </div>
						<button onClick={handleEstimation}>Submit</button>
                        <button onClick={setModalIsOpenToFalse}>Close</button>
						</form>
                            <p>{saveAmount && saveAmount != -1 ? `Weekly Savings needed for ${expectDate}: $ ${saveAmount}` : ''}</p>
                            <p>{saveAmount == -1 ? 'Please select a future date' : ''}</p>
					</Modal>

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