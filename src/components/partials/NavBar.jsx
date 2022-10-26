import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	const loggedIn = () => {
    return (
      <div className="hidden lg:flex gap-0 absolute opacity-0 lg:gap-3 lg:relative lg:opacity-100">
        {/* if the user is logged in... */}
        <Link to='/destinations' className=''>
          Destinations
        </Link>{" | "}

        <Link to='/destinations/new' className=''>
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
		<nav className="relative top-0 flex justify-between items-end w-screen h-20 max-w-[90%] bg-slate-300 text-xl font-light text-stone-50 px-0 py-2">
                {/* user always sees this section */}
            <div className="flex items-end gap-3">
                <Link to="/">Home</Link>{" | "}

                <div className=''>
                <Link to='/destinations' className=''> Browse Destinations</Link>{" | "}

                <Link to='/about' className=''>About</Link>

                </div>
            </div>

        {currentUser ? loggedIn() : loggedOut()}

		</nav>
	)
}