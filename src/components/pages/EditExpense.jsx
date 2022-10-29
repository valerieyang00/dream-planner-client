import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function EditExpense(currentUser) {
    const [msg, setMsg] = useState("")
    const { expenseId, destinationId } = useParams()
    const [form, setForm] = useState({
        // user: currentUser.userId,
        // destination: destinationId,
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
            <section className="">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Edit Expense
							</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div className="mb-4">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
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
                            <label htmlFor="merchant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant:</label>
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
                            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
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
                            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
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
                            <label htmlFor='category' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category:</label>
                            <select value={form.category} name="category" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="lodging">Lodging</option>
                                    <option value="transportation">Transportation</option>
                                    <option value="food">Food</option>
                                    <option value="activities">Activities</option>
                                    <option value="misc">Misc</option>
                            </select>
                        </div>
                        <div className="flex justify-center">
                                    <div>
                                        <Link to={`/destinations/${destinationId}/`}><button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Cancel</button></Link>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ml-2">Update</button>
                                    </div>
                        </div>
                    </form>
                </div>
            </div>  
            </div>  
        </section> 
    </div>
    )
}