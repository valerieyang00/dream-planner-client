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


    const userOptions = (
    
            <div className=''>
                <Link className={``} to={`edit`}><button className="bw-half text-white bg-[#5094d4] hover:bg-[#b7d8f1] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit Profile</button></Link>
            </div>
        )

    // Output
	return (
        <div>
            <div className='mx-auto' >
                <div className='flex flex-col-reverse sm:flex-row justify-center'>
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                            <div>
                                <h1 className="text-lrg font-bold leading-tight tracking-tight  md:text-2xl ">
                                    Profile Details
                                </h1>
                                <p className="block text-lg font-medium  ">Username: {userDetails.username}</p>
                                <p className="block mb-2 text-lg font-medium  ">Email: {userDetails.email}</p>
                                {currentUser && currentUser.userId == userId ? userOptions : <h3></h3> }
                            </div>

						</div>
                </div>
                <div>
                    <h1><MyDestinations currentUser={userId}/></h1>
                </div>
            </div>
        </div>
	)
}
