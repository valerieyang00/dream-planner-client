import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function NewDestination() { //pass currentUser as prop when it's set up
    const [msg, setMsg] = useState("")
    const [form, setForm] = useState({
        // user: currentUser.id, *change to this when currentUser is set up*
        user: 1,
        name: '',
        budget: 0,
        photo: '',
        description: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})

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
            <h1>Create a new dream destination</h1>
            <form onSubmit={handleCreate}>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                name="name"
                id="name"
                placeholder="Name of your dream destination..."
                value={form.name}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="photo">Photo:</label>
                <input
                type="text"
                name="photo"
                id="photo"
                placeholder="Photo URL..."
                value={form.photo}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="budget">Budget:</label>
                <input
                type="number"
                name="budget"
                id="budget"
                placeholder="Set budget for your trip..."
                value={form.budget}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="description">Description:</label>
                <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Description of this trip"
                value={form.description}
                onChange={handleChange}
                required           
                
                ></textarea>
                <button type="submit">Create</button>

            </form>
        </div>
    )
}