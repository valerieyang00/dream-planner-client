import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	const loggedIn = () => {
    return (
      <div className="logged in">
        {/* if the user is logged in... */}
        <Link to='/destinations' className=''>
          Destinations
        </Link>{" | "}

        <Link to='/destination/new' className=''>
          Plan my Trip
        </Link>{" | "}

        <Link to={`/users/${currentUser.id}`} className=''>
          Profile
        </Link>{" | "}

        <Link to="/" className=''>
          <span onClick={handleLogout}>Logout</span>
        </Link>

      </div>
    )
  }
		
	const loggedOut = () => {
    return (
      <div className="">
        {/* if the user is not logged in... */}
        <Link to="/register" className=''>
          Register
        </Link>{" | "}

        <Link to="/login" className=''>
          Login
        </Link>
      </div>
    )
  }

	return (
		<nav className="">
                {/* user always sees this section */}
            <div className="flex items-end gap-3">
                <Link to="/">Home</Link>

                <div className=''>
                <Link to='/destinations' className=''>Browse</Link>{" | "}

                <Link to='/about' className=''>About</Link>

                </div>
            </div>

        {currentUser ? loggedIn() : loggedOut()}

		</nav>
	)
}