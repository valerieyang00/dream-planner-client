import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function EditDestination() {
    const [msg, setMsg] = useState("")
    const { destinationId } = useParams()
    const [form, setForm] = useState({})
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect (() => {

        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`)                
                const data = response.data
                delete data["expenses"]
                setForm(data)
                setUser(data.user)                               
                
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestination()
    },[])

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})

    }

    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`, form)
            navigate(`/destinations/${destinationId}`)
        }catch(err){
            console.warn(err)
            if(err.response) {
                setMsg(err.response.data.msg)
            }
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`)
            navigate(`/users/${user}`)
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
                                Edit Destination
							</h1>
                            <form onSubmit={handleEdit} className="space-y-4 md:space-y-6" action="#">
                                <div className="">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                                        <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name of your dream destination..."
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        />
                                </div>
                                
                                <div className="">
                                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo URL:</label>
                                        <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        name="photo"
                                        id="photo"
                                        placeholder="Photo URL..."
                                        value={form.photo}
                                        onChange={handleChange}
                                        required
                                        />
                                </div>

                                <div className="">
                                        <label htmlFor="budget" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Budget:</label>
                                        <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="number"
                                        name="budget"
                                        id="budget"
                                        step="0.01"
                                        placeholder="Set budget for your trip..."
                                        value={form.budget}
                                        onChange={handleChange}
                                        required
                                        />
                                </div>

                                <div className="">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                                    <textarea
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description of this trip"
                                    value={form.description}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <div>
                                        <Link to={`/destinations/${destinationId}`}><button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Cancel</button></Link>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ml-2">Update</button>
                                    </div>
                                </div>
                                <button onClick={handleDelete} className="w-[vw0.5] text-black bg-[#d6aedd] hover:bg-[#A15D98] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete Destination</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
		</div>
    )
}