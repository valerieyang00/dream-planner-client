import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'


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
            <section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Profile Settings
							</h1>
                            <form onSubmit={updateAccount} className="space-y-4 md:space-y-6" action="#">
                                <div className="">
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    name="password"
                                    id="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <div>
                                        <Link to={`/users/${userId}`}><button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Cancel</button></Link>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-[vw0.5] text-black bg-[#b7d8f1] hover:bg-[#5094d4] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ml-2">Update</button>
                                    </div>
                                </div>
                                <button onClick={deleteAccount} className="w-[vw0.5] text-black bg-[#d6aedd] hover:bg-[#A15D98] hover:font-stone-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete Account</button>
                            </form>
                        </div>
                    </div>  
                </div>  
            </section>
        </div>
    )
}