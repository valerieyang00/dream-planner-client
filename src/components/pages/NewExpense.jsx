import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export default function NewExpense() {
    const [msg, setMsg] = useState("")
    const [form, setForm] = useState({        

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
            <form onSubmit={handleCreate}>
                <label htmlFor="date">Date:</label>
                <input
                type="date"
                name="date"
                id="date"
                placeholder="Expense date..."
                value={form.date}
                onChange={handleChange}
                required

                />
                
                <label htmlFor=""></label>
                <input
                type=""
                name=""
                id=""
                placeholder=""
                value={form.}
                onChange={handleChange}
                required
                />

                <label htmlFor=""></label>
                <input
                type=""
                name=""
                id=""
                placeholder=""
                value={form.}
                onChange={handleChange}
                required
                />

                <label htmlFor=""></label>
                <input
                type=""
                name=""
                id=""
                placeholder=""
                value={form.}
                onChange={handleChange}
                required
                />

            </form>
        </div>
    )
}