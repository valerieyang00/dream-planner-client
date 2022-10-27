import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import MyDashboard from "./MyDashboard"

export default function Expenses({destinationId}) {

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

    const expensesToDisplay = expenses.map((expense, idx) => {
            return(
            <div key={expense.id-idx}>        
            <ul>Expenses Details:
                <li>{expense.date}</li>
                <li>{expense.merchant}</li>
                <li>{expense.category}</li>
                <li>{expense.amount}</li>
                <li>{expense.description}</li>
            </ul>
            </div>
            )
    })

    return (
        <div>
            {msg}
            <MyDashboard expenses={expenses} destinationId={destinationId}/>
            {expensesToDisplay}
        </div>
    )
}