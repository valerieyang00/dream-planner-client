import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import MyDashboard from "./MyDashboard"

export default function Expenses({ destinationId, budget }) {

    const [msg, setMsg] = useState("")
    const [expenses, setExpenses] = useState([])

    useEffect(() => {

        const getExpenses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`)
                const filterExpenses = response.data.filter(expense => expense.destination == destinationId)
                setExpenses(filterExpenses)

            } catch (err) {
                console.warn(err)
                if (err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getExpenses()

    }, [destinationId])

    const deleteExpense = async (e, expenseId) => {
        try {
            e.preventDefault()
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/expenses/${expenseId}/`)
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/expenses/`)
            const filterExpenses = response.data.filter(expense => expense.destination == destinationId)
            setExpenses(filterExpenses)
        } catch (err) {
            console.warn(err)
        }
    }




    const tableLayout = (
        <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                        <thead className=" border-b">
                            <tr>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Date
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Type
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Merchant
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Amount
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Description
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Edit
                                </th>
                                <th scope="col" className="text-base font-medium px-6 py-4 text-center">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                    {expenses.map((expense, idx) => {
                            return (
                                <tbody key={`${expense.id}-${idx}`}>
                                    <tr className=" border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium">{expense.date}</td>
                                        <td className="text-base font-light px-6 py-4 whitespace-nowrap">
                                            {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                                        </td>
                                        <td className="text-base font-light px-6 py-4 whitespace-nowrap">
                                            {expense.merchant}
                                        </td>
                                        <td className="text-base font-light px-6 py-4 whitespace-nowrap">
                                            ${expense.amount}
                                        </td>
                                        <td className="text-base font-light px-6 py-4 whitespace-nowrap">
                                            {expense.details}
                                        </td>
                                        <td className="text-base font-light px-6 py-4 whitespace-nowrap">
                                            <Link to={`/destinations/${destinationId}/expenses/${expense.id}/edit`}><button type="button" className="inline-block px-3 py-1 border-2 border-purple-600 text-purple-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Edit</button></Link>
                                        </td>
                                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                                            <button onClick={(e) => { deleteExpense(e, expense.id) }} type="button" className="inline-block px-3 py-1 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Delete</button>
                                        </td>
                                    </tr>
                            </tbody>)
                        })}
                    </table>
                    <footer style={{margin: "15rem"}}></footer>
                </div>
            </div>
        </div>
    </div>

    )

    return (
        <div>
            {msg}
            {expenses.length > 0 ? <MyDashboard expenses={expenses} budget={budget} /> : ''}
            <Link className="flex justify-start ml-8" to={`/destinations/${destinationId}/expenses/new`}><button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out  bg-[#5094d4] hover:bg-[#b7d8f1]">Add New Expense</button></Link>
            <p className="text-2xl">{expenses.length > 0 ? tableLayout : "No Expenses Yet!"}</p>
        </div>
    )
}