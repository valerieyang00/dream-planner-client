import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function EditExpense(currentUser) {
    const [msg, setMsg] = useState("")
    const { expenseId, destinationId } = useParams()
    const [form, setForm] = useState({
        user: currentUser.userId,
        destination: destinationId,
        date: '',
        category: '',
        merchant: '',
        amount: 0,
        details: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/${expenseId}/`)
                setForm(response.data)
            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setMsg(err.response.data.message)
                }
            }
        }
        getDestination() 
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/expenses/${expenseId}/`, form)
            navigate(`/destinations/${destinationId}`)
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    return (
        <div>
            <h1>Edit your expense</h1>
            <div className="w-full max-w-xs object-center">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Edit date..."
                        value={form.date}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="merchant" className="block text-gray-700 text-sm font-bold mb-2">Merchant:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="merchant"
                        id="merchant"
                        placeholder="Edit merchant..."
                        value={form.merchant}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Edit amount..."
                        value={form.amount}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">Details:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="details"
                        id="details"
                        placeholder="Edit details..."
                        value={form.details}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor='category'>Select Category:</label>
                        <select value={form.category} name="category" onChange={handleChange}>
                                <option value="lodging">Lodging</option>
                                <option value="transportation">Transportation</option>
                                <option value="food">Food</option>
                                <option value="activities">Activities</option>
                                <option value="misc">Misc</option>
                        </select>
                        <br></br>
                        <br></br>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </div>
    )
}