import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
  let userId = ''

	if(currentUser){
		userId = currentUser.userId
	}

	const loggedIn = (
      <div className="">
        {/* if the user is logged in... */}

        <Link to='/destinations/new' className=''>
          Plan my Trip
        </Link>{" | "}

        <Link to={`/users/${userId}`} className=''>
          Profile
        </Link>{" | "}

        <Link to="/" className=''>
          <span onClick={handleLogout}>Logout</span>
        </Link>

      </div>
    )

		
	const loggedOut = (

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


	return (
		<nav className="fixed-top flex justify-between items-end w-screen h-15 max-w-100 bg-[#5094d4] text-xl font-light text-stone-50 px-5 py-2">
          {/* user always sees this section */}
          <div className="flex items-end gap-3 ">
              <Link to="/" className='font-bold italic'>Dream Planner</Link>{" | "}

              <Link to='/destinations' className=''> Destinations</Link>{" | "}

              <Link to='/hotels' className=''> Hotels</Link>{" | "}

              <Link to='/about' className=''>About</Link>


          </div>
      {currentUser ? loggedIn : loggedOut}


		</nav>
	)
}