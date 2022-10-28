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
                <Link className={``} to={`edit`}>Edit Profile</Link>
                <Link className={``} to='/' onClick={deleteUser}>Delete Profile</Link>
            </div>
        )

    // Output
	return (
		<div className='mx-auto' >
            {currentUser && currentUser.userId == userId ? userOptions : <h3></h3> }
            <div className='flex flex-col-reverse sm:flex-row justify-center'>

                <div className='h-64 xl:h-80 w-full sm:w-4/5 sm:max-w-[55rem] bg-bloom-sage font-bloom-sans sm:rounded-bl-[3em] pt-10 pl-6 md:px-12 xl:px-24 ml-auto'>
                {/* <section className='flex items-center flex-col justify-center'> */}
                    <h1 className='text-5xl font-heavy mb-6'>Profile Details </h1>
                    <h3 className='text-2xl my-2 md:text-3xl'>Username: {userDetails.username}</h3>
                    <h3 className='text-2xl my-2 md:text-3xl'>Email: {userDetails.email}</h3>
                    {/* <p>your email is {userDetails.email}</p> */}
                </div>
            </div>

            <div>
                <h1><MyDestinations currentUser={userId}/></h1>
            </div>
        </div>
	)
}