import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function EditDestination() {
    const [msg, setMsg] = useState("")
    const { destinationId } = useParams()
    const [form, setForm] = useState({})

    const navigate = useNavigate()

    useEffect (() => {

        const getDestination = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/destinations/${destinationId}/`)                
                const data = response.data
                delete data["expenses"]
                setForm(data)               
                
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


    return (
        <div>
                <form onSubmit={handleEdit}>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="photo">Photo:</label>
                <input
                type="text"
                name="photo"
                id="photo"
                value={form.photo}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="budget">Budget:</label>
                <input
                type="number"
                name="budget"
                id="budget"
                value={form.budget}
                onChange={handleChange}
                required           
                
                />
                <label htmlFor="description">Description:</label>
                <textarea
                type="text"
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
                required           
                
                ></textarea>
                <button type="submit">Submit Changes</button>

            </form>
        </div>
    )
}