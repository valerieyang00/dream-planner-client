import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function EditProfile({currentUser, setCurrentUser, handleLogout}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { userId } = useParams()

    const navigate = useNavigate()

    console.log(currentUser)

    useEffect(() => {
        const getUser = async () => {
            try {
                // e.preventDefault()
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/`)
                const user = response.data
                console.log(user)
                setEmail(user.email)
                setUsername(user.username)
            }catch(err) {
                console.warn(err)
                if (err.response) {
                    setErrorMessage(err.response.data.message)               
                }               
            }
        }
        getUser()
    }, [])

    const deleteAccount = async e => {
        try {
            e.preventDefault()
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/`)
            handleLogout()
            navigate('/register')
        }catch(err) {
            console.warn(err)
            if (err.response) {
                setErrorMessage(err.response.data.message)               
            }            
        }
    }

    const updateAccount = async e => {
        try {
            e.preventDefault()
            const reqBody = {
                username,
                email,
                password
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/`, reqBody)
            navigate(`/users/${userId}`)
            
        }catch(err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setErrorMessage(err.response.data.msg)
				}            
            }
        }
    }
    return (
        <div>
            <h3 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">Profile Settings</h3>
            <div className="w-full max-w-xs object-center">
                <form onSubmit={updateAccount} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="password"
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit Changes</button>
                </form>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}