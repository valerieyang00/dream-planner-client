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
            <div>
                <form onSubmit={updateAccount} className="">
                    <h1 className="">Profile Settings</h1>

                    <label htmlFor="username">Username:</label>
                    <input
                        className=""
                        type="text"
                        id="username"
                        // placeholder={`${decodedToken.username}`}
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        className=""
                        type="text"
                        id="email"
                        // placeholder={`${decodedToken.email}`}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    {/* <label htmlFor="password">Current Password:</label>
                    <input
                        className=""
                        type="password"
                        id="password"
                        placeholder="******"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    /> */}

                    <label htmlFor="password">Password:</label>
                    <input
                        className=""
                        type="password"
                        id="password"
                        placeholder='******'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <button className="" type="submit">Submit Changes</button>
                </form>
            </div>
            <button className="" onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}