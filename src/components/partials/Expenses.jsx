import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Expenses({destinationid}) {

    const [msg, setMsg] = useState("")
    const [expenses, setExpenses] = useState([])

    useEffect (() => {

        const getExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`)
                setExpenses(response.data)
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getExpenses()

    },[destinationid])

    const filterExpenses = expenses.filter(expense => expense.destination == destinationid)

    return (
        <div>
            {filterExpenses.map(expense => {
                <ul>
                    <li>
                        {expense.amount}
                    </li>
                </ul>
            })}
        </div>
    )
}