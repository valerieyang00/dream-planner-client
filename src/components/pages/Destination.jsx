import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Expenses from '../partials/Expenses'
import Modal from 'react-modal';

export default function Destination({ currentUser }) {
    const [msg, setMsg] = useState("")
    const { destinationId } = useParams()
    const [destination, setDestination] = useState([])
    const [form, setForm] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [expectDate, setExpectDate] = useState('')
    const [saveAmount, setSaveAmount] = useState(0)


    if (!currentUser) {
        currentUser = { userId: '' }
    }

    const navigate = useNavigate()

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false)
        setSaveAmount('')
        setExpectDate('')

    }

    useEffect(() => {

        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`)
                const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${response.data.user}/`)
                response.data['username'] = user.data.username
                setDestination(response.data)
                const data = response.data
                delete data["expenses"]
                setForm(data)

            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestination()

    }, [])

    const userExpenses = (
        <div>
            <div className="flex justify-start" style={{ marginLeft: "2rem" }}>
                <h4 className="text-3xl mt-8">Summary of Expenses:</h4>
            </div>
            <Expenses destinationId={destination.id} budget={destination.budget} />
        </div>
    )

    const markComplete = async () => {
        try {
            const changedForm = form
            changedForm.completed = !changedForm.completed
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`, changedForm)
            navigate(`/destinations/${destinationId}`)

        } catch (err) {
            console.warn(err)
            if (err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const handleDateChange = (e) => {
        setExpectDate(e.target.value)
        setSaveAmount('')
    }

    const handleEstimation = (e) => {
        e.preventDefault()

        let today = new Date().toISOString().slice(0, 10)
        let expectedDate = expectDate
        const diffInMs = new Date(expectedDate) - new Date(today)
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        if (diffInDays == 1) {
            setSaveAmount(destination.budget)
        } else if (diffInDays <= 0) {
            setSaveAmount(-1)
        } else {
            const numWeeks = diffInDays / 7
            const amountToSave = Math.round(destination.budget / numWeeks)
            setSaveAmount(amountToSave)
        }

    }




    const userDestination = (
        <div>
            <div className="flex space-x-2 justify-center">
                <Link to={`/destinations/${destinationId}/edit`}><button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" style={{display: destination.completed ? "none" : "inline-block"}}>Edit Destination</button></Link>
                <button type="button" className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={markComplete} style={{ backgroundColor: destination.completed ? "green" : '' }}>{destination.completed ? 'Completed Trip' : 'Mark as Completed'}</button>
            </div>

            <div className="flex space-x-2 justify-center">
                {!destination.completed ? <button type="button" className="inline-block px-6 py-2 border-2 border-blue-400 text-white font-medium text-base leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={setModalIsOpenToTrue} style={{ marginTop: "1rem" }}>Estimate how much to save per week</button> : ''}
                <Modal isOpen={modalIsOpen} ariaHideApp={false} backdrop="static" >
                    <div className="grid place-items-center h-screen" style={{backgroundColor: "rgb(17, 24, 34)" }} >
                        <form>
                            <h5 className="text-2xl text-center text-white font-medium leading-normal  mb-10">
                                Estimate How Much to Save Per Week
                            </h5>
                            <label htmlFor="date" className="block text-white text-base font-bold mb-4">Expected Travel Date:</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="date"
                                name="date"
                                id="date"
                                value={expectDate}
                                onChange={handleDateChange}
                                required
                            />
                            {saveAmount && saveAmount != -1 ? <p className='text-xl mt-8 text-center text-white'>Weekly Savings needed for {expectDate}: <br></br> <p className=" text-white text-center mt-3 text-2xl ">${saveAmount} </p></p>: ''}
                            <div className="flex space-x-2 justify-center mt-8">
                                <p>{saveAmount == -1 ? 'Please select a future date' : ''}</p>
                                <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  bg-[#5094d4] hover:bg-[#b7d8f1]" onClick={handleEstimation}>Submit</button>
                                <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  bg-[#b7d8f1] hover:bg-[#5094d4]" onClick={setModalIsOpenToFalse}>Close</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>

    )

    return (
        <div>
            {msg}
            <div className="flex space-x-2 justify-center">
                <div className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover rounded-lg" style={{ backgroundImage: `url(${destination.photo})`, width: "100%", height: currentUser.userId == destination.user ? "67vh" : "100vh" }}>
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}>
                        <div className="flex justify-center items-center h-full">
                            <div className="text-white">
                                <h2 className="font-semibold text-4xl mb-4">{destination.name}</h2>
                                <h4 className="font-semibold text-xl mb-6">{destination.username}'s Dream Destination</h4>
                                <h4 className="font-semibold text-xl mb-6">Budget: ${destination.budget}</h4>
                                <h4 className="font-semibold text-xl mb-6">{destination.description}</h4>
                                {currentUser.userId == destination.user ? userDestination : ''}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {currentUser.userId == destination.user ? userExpenses : ''}
        </div>

    )
}



