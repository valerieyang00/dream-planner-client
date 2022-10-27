import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export default function EditProfile({currentUser, setCurrentUser, handleLogout}) {
    const decodedToken = jwt_decode(localStorage.getItem('jwt'))
    const [username, setUsername] = useState(decodedToken.username)
    const [email, setEmail] = useState(decodedToken.email)
    const [password, setPassword] = useState(decodedToken.password)
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const deleteAccount = async e => {
        try {
            e.preventDefault()
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${decodedToken.id}`)
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
            const reqBody = {
                username,
                email,
                password,
                newPassword
            }
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${decodedToken.id}`, reqBody)

            const { token } = response.data
            localStorage.setItem('jwt', token)

            // decode the token
            const decoded = jwt_decode(token)

            // set the user in App's state to be the decoded token
            setCurrentUser(decoded)
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
                        placeholder={`${decodedToken.username}`}
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        className=""
                        type="text"
                        id="email"
                        placeholder={`${decodedToken.email}`}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Current Password:</label>
                    <input
                        className=""
                        type="password"
                        id="password"
                        placeholder="******"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        className=""
                        type="password"
                        id="newPassword"
                        placeholder='******'
                        onChange={e => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                    />

                    <button className="" type="submit">Submit Changes</button>
                </form>
            </div>
            <button className="" onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}