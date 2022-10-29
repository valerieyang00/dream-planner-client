import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState } from 'react'


export default function NewExpense({currentUser}) {
    const [msg, setMsg] = useState("")
    const {destinationId} = useParams()
    const [form, setForm] = useState({
        user: currentUser.userId,
        destination: destinationId,
        date: '',
        category: 'lodging',
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
            <section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Add a new expense
							</h1>
                            <form onSubmit={handleCreate} className="space-y-4 md:space-y-6" action="#">
                                <div className="">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="date"
                                    name="date"
                                    id="date"
                                    placeholder="Expense date..."
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>
                                
                                <div className="">
                                    <label htmlFor="merchant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Merchant:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="merchant"
                                    id="merchant"
                                    placeholder="Enter merchant..."
                                    value={form.merchant}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    placeholder="Enter amount..."
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="details"
                                    id="details"
                                    placeholder="Enter details..."
                                    value={form.details}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor='category' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category:</label>
                                    <select value={form.category} name="category" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
                                            <option defaultValue="lodging">Lodging</option>
                                            <option value="transportation">Transportation</option>
                                            <option value="food">Food</option>
                                            <option value="activities">Activities</option>
                                            <option value="misc">Misc</option>
                                    </select>

                                </div>
                                <div className="flex justify-center">
                                     <div>
                                        <Link to={`/destinations/${destinationId}`}><button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cancel</button></Link>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ml-2">Submit</button>
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