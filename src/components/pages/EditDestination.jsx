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
            <h1 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Edit Destination</h1>
            <div className="flex justify-center">
                <div className="w-full max-w-xs object-center">
                    <form onSubmit={handleEdit}>
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
                        <Link to={`/destinations/${destinationId}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button></Link>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Changes</button>

                    </form>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete Dream Destination</button>
                </div>
            </div>
        </div>
    )
}