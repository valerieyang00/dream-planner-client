import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function NewDestination({currentUser}) { //pass currentUser as prop when it's set up
    const [msg, setMsg] = useState("")
    const [form, setForm] = useState({
        user: currentUser.userId,
        name: '',
        budget: 0,
        photo: '',
        description: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
        console.log(form)

    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/destinations/`, form)
            navigate('/destinations')
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
                                Create a new dream destination
							</h1>
                            <form onSubmit={handleCreate} className="space-y-4 md:space-y-6" action="#">
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
                                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo:</label>
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
                                <button type="submit" className="w-full text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                            </form>
                        </div>  
                    </div>
                </div>
            </section>
		</div>
    )
}