import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')


	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/token/`, reqBody)

			// save the token in localstorage
			const token = response.data.access
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)
			console.log(decoded.user_id)

			const user = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${decoded.user_id}/`)

			// set the user in App's state to be the decoded token
			setCurrentUser(user)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to={`/users/${currentUser.id}`} />
	}

	return (
		<div>
			<p>{msg}</p>

			<section className="h-screen">
				<div className="container px-6 py-12 h-full">
					<div className="">
						<div className="">
							<img
							src="/loginNew.svg"
							className="w-full"
							
							/>
						</div>

						<div className="">
							<form onSubmit={handleSubmit}>
								<p>Login to your Account:</p>
								<br></br>

								{/* <!-- Email input --> */}
								<div className="mb-6 ">
									<input 
										type="email"
										id="email"
										className=""
										placeholder="Email address"
										onChange={e => setEmail(e.target.value)}
										value={email}
										required
									/>
								</div>

								{/* <!-- Password input --> */}
								<div className="mb-6">
									<input 
										type="password"
										id="password"
										className=""
										placeholder="Password"
										onChange={e => setPassword(e.target.value)}
										value={password}
										required
									/>
								</div>

								{/* <!-- Submit button --> */}
								<button
									type="submit"
									className=""
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
								>
									Sign in
								</button>


							</form>
						</div>
					</div>
				</div>
			</section>

		</div>
	)
}