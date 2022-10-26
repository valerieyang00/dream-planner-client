import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	// state for the controlled form
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

    const navigate = useNavigate()

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				username,
				email, 
				password
			}
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/`, reqBody)
            navigate('/login')

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
 	}


	return (
		<div className='md:flex md:justify-center m-10 mt-20'>
			<p>{msg}</p>
			<div className="w-full max-w-xs">

				<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<p className='text-3xl font-bold mb-10'> Create your account </p>
						<label  
							className="block text-gray-700 text-sm font-bold mb-2" 
							htmlFor='username'
						>
							Username:
						</label>
						<input 
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="username"
							placeholder='your username...'
							onChange={e => setUsername(e.target.value)}
							value={username}
						/>
					</div>

					<div className='mb-4'>
						<label
							className="block text-gray-700 text-sm font-bold mb-2" 
							htmlFor='email'
							>
							Email:
						</label>

						<input 
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							id="email"
							placeholder='your email...'
							onChange={e => setEmail(e.target.value)}
							value={email}
							/>
					</div>

					<div className='mb-4'>
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor='password'
						>
							Password:
						</label>
						<input 
							className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							id="password"
							placeholder='password...'
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					<button type="submit" className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white font-bold py-2 px-4 rounded-full">Register</button>
				</form>
			</div>
		</div>
	)
}