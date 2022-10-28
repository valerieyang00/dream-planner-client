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
            <h1 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Create a new dream destination</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-xs object-center">
                    <form onSubmit={handleCreate}>
                        <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name of your dream destination..."
                                value={form.name}
                                onChange={handleChange}
                                required
                                />
                        </div>
                        
                        <div className="mb-6">
                                <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="photo"
                                id="photo"
                                placeholder="Photo URL..."
                                value={form.photo}
                                onChange={handleChange}
                                required
                                />
                        </div>

                        <div className="mb-6">
                                <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">Budget:</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                name="budget"
                                id="budget"
                                placeholder="Set budget for your trip..."
                                value={form.budget}
                                onChange={handleChange}
                                required
                                />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                            <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description of this trip"
                            value={form.description}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}