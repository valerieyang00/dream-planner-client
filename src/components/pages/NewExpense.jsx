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
                
                <label htmlFor="category">Category:</label>
                <input
                type=""
                name="category"
                id="category"
                placeholder="Select category..."
                value={form.category}
                onChange={handleChange}
                required
                />

                <label htmlFor="merchant">Merchant:</label>
                <input
                type="text"
                name="merchant"
                id="merchant"
                placeholder="Enter merchant..."
                value={form.merchant}
                onChange={handleChange}
                required
                />

                <label htmlFor="amount">Amount:</label>
                <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount..."
                value={form.amount}
                onChange={handleChange}
                required
                />

                <label htmlFor="details">Details:</label>
                <input
                type="text"
                name="details"
                id="details"
                placeholder="Enter details..."
                value={form.details}
                onChange={handleChange}
                required
                />

            </form>
        </div>
    )
}