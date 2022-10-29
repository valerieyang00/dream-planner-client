// Dependencies
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyDestinations from '../partials/MyDestinations'


export default function Profile({ currentUser, handleLogout }) {
    // States
    const navigate = useNavigate()
    const { userId } = useParams()
    const [msg, setMsg] = useState('')
    const [userDetails, setUserDetails] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: ''
    })

    // Hooks
	useEffect(() => {
		const fetchData = async () => {
            try {
                // get the token from local storage
                

                const userResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/`)
                            // example POST with auth headers (options are always last argument)
                            // await axios.post(url, requestBody (form data), options)
                            // set the secret user message in state
                setUserDetails(userResponse.data)
                console.log(currentUser)
			} catch (err) {
                // if the error is a 401 -- that means that auth failed
                console.warn(err)
                if (err.response) {
                    if (err.response.status === 401) {
                        // panic!
                        handleLogout()
                    }
                }
			}
		}
		fetchData()
	}, []) // only fire on the first render of this component

    // Handlers
    const deleteUser = async () => {
        try {
          // Deletes User
          await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}/`)
          // Logout user from deleted account
          handleLogout()
          // Return Home
          navigate('/')
        } catch (err) {
          console.log(err)
        }
    }

    const userOptions = (
    
            <div className=''>
                <Link className={``} to={`edit`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit Profile</button></Link>
            </div>
        )

    // Output
	return (
		<div className='mx-auto' >
            <div className='flex flex-col-reverse sm:flex-row justify-center'>
                <div className='flex flex-col justify-center'>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg ">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">Profile Details</div>
                            <br></br>
                            <p class="text-gray-700 text-base">Username: {userDetails.username}</p>
                            <p class="text-gray-700 text-base">Email: {userDetails.email}</p>
                            <br></br>
                            {currentUser && currentUser.userId == userId ? userOptions : <h3></h3> }
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1><MyDestinations currentUser={userId}/></h1>
            </div>
        </div>
	)
}
