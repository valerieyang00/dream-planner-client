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
		<nav className="relative top-0 flex justify-between items-end w-screen h-20 max-w-[90%] bg-slate-300 text-xl font-light text-stone-50 px-0 py-2">
                {/* user always sees this section */}
            <div className="">
                <Link to="/">Home</Link>{" | "}
{/* 
                <div className=''> */}
                <Link to='/destinations' className=''> Browse Destinations</Link>{" | "}

                <Link to='/about' className=''>About</Link>

                {/* </div> */}
            </div>
        {currentUser ? loggedIn : loggedOut}


		</nav>
	)
}