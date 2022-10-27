import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function NewExpense() {
    const [msg, setMsg] = useState("")
    const [form, setForm] = useState({
        user: 1,
        destination: 1,
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

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`, form)
            navigate('/destination/:id')
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    return (
        <div>
            <h1>Add expenses for your dream destination</h1>
            <div className="w-full max-w-xs object-center">
                <form onSubmit={handleCreate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Expense date..."
                        value={form.date}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    

                    <div>
                        <label htmlFor='category'>Select Category:</label>
                        <select value={form.category} onChange={handleChange}>
                                <option value="transportation">Transportation</option>
                                <option value="lodging">Lodging</option>
                                <option value="food">Food</option>
                                <option value="activities">Activities</option>
                                <option value="misc">Misc</option>
                        </select>
                        <br></br>
                        <br></br>
                    </div>


                    {/* <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="select"

                        name="category"
                        id="category"
                        placeholder="Select category..."
                        value={form.category}
                        onChange={handleChange}
                        required
                        />
                    </div> */}

                    <div className="mb-4">
                        <label htmlFor="merchant" className="block text-gray-700 text-sm font-bold mb-2">Merchant:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="merchant"
                        id="merchant"
                        placeholder="Enter merchant..."
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
                        placeholder="Enter amount..."
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
                        placeholder="Enter details..."
                        value={form.details}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </div>
    )
}