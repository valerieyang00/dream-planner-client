import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import MyDashboard from "./MyDashboard"

export default function Expenses({destinationId, budget}) {

    const [msg, setMsg] = useState("")
    const [expenses, setExpenses] = useState([])

    useEffect (() => {

        const getExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`)
                const filterExpenses = response.data.filter(expense => expense.destination == destinationId)
                setExpenses(filterExpenses)
                
              }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getExpenses()

    },[destinationId])

    const deleteExpense = async (e, expenseId) => {
        try {
            e.preventDefault()
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/expenses/${expenseId}/`)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`)
            const filterExpenses = response.data.filter(expense => expense.destination == destinationId)
            setExpenses(filterExpenses)
        }catch(err) {
            console.warn(err)          
        }
    }

    const expensesToDisplay = expenses.map((expense, idx) => {
            return(
            <div key={expense.id-idx}>        
            <ul>
                <li>{expense.date}</li>
                <li>Merchant: {expense.merchant}</li>
                <li>Type: {expense.category}</li>
                <li>Total: ${expense.amount}</li>
                <li>Details: {expense.details}</li>
            </ul>
            <Link to={`/destinations/${destinationId}/expenses/${expense.id}/edit`}>Edit</Link>
            <button onClick={(e) => {deleteExpense(e, expense.id)}}>Delete</button>
            <br></br>
            </div>
            )
    })

    return (
        <div>
            {msg}
            {expenses.length > 0 ? <MyDashboard expenses={expenses} budget={budget}/> : ''}
            {expenses.length > 0 ? "Expenses Details:" : ""}
            {expenses.length > 0 ? expensesToDisplay : "No Expenses Yet!"}
        </div>
    )
}