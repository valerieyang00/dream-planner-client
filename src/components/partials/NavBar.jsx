import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function Navbar({ currentUser, handleLogout }) {
  let userId = ''
  const [isNavOpen, setIsNavOpen] = useState(false);

  if (currentUser) {
    userId = currentUser.userId
  }

  const loggedIn = (
    <ul className="flex flex-row px-1">
      {/* if the user is logged in... */}

      <li className="px-3"><Link to='/destinations/new' className=''>
        Plan my Trip
      </Link></li>{' | '}

      <li className="px-3"><Link to={`/users/${userId}`} className=''>
        Profile
      </Link></li>{' | '}

      <li className="px-3"><Link to="/" className=''>
        <span onClick={handleLogout}>Logout</span>
      </Link></li>

    </ul>
  )


  const loggedOut = (

    <ul className="flex flex-row px-1">
      {/* if the user is not logged in... */}
      <li className="px-3"><Link to="/register" className=''>{' | '}
        Register
      </Link></li>

      <li className="px-3"><Link to="/login" className=''>
        Login
      </Link></li>
    </ul>
  )

  const loggedInMobile = (
    <>
      {/* if the user is logged in... */}

      <li className="border-b border-gray-400 my-8"><Link to='/destinations/new' className=''>
        Plan my Trip
      </Link></li>

      <li className="border-b border-gray-400 my-8"><Link to={`/users/${userId}`} className=''>
        Profile
      </Link></li>

      <li className="border-b border-gray-400 my-8"><Link to="/" className=''>
        <span onClick={handleLogout}>Logout</span>
      </Link></li>

    </>
  )


  const loggedOutMobile = (

    <>
      {/* if the user is not logged in... */}
      <li className="border-b border-gray-400 my-8"><Link to="/register" className=''>
        Register
      </Link></li>

      <li className="border-b border-gray-400 my-8"><Link to="/login" className=''>
        Login
      </Link></li>
    </>
  )


  return (
    <div className="fixed-top flex justify-between items-end w-screen h-15 max-w-100 bg-[#5094d4] text-xl font-light text-stone-50 px-5 py-2">
      {/* user always sees this section */}
      <Link to="/" className='font-bold italic'>Dream Planner</Link>
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul onClick={() => setIsNavOpen(false)} className="flex flex-col items-center justify-between">
              <li className="border-b border-gray-400 my-8"><Link to="/" className='font-bold italic'>Home</Link></li>
              <li className="border-b border-gray-400 my-8"><Link to='/destinations' className=''> Destinations</Link></li>
              <li className="border-b border-gray-400 my-8"><Link to='/hotels' className=''> Hotels</Link></li>
              <li className="border-b border-gray-400 my-8"><Link to='/about' className=''>About</Link></li>
              {currentUser ? loggedInMobile : loggedOutMobile}
            </ul>
          </div>
        </section>

        <div className="DESKTOP-MENU hidden space-x-8 lg:flex fixed-top flex justify-between items-end w-screen h-15 max-w-100 bg-[#5094d4] text-xl font-light text-stone-50 px-5 py-2">
          <ul className="flex flex-row px-1">
          <li className="px-3"><Link to="/" className='font-bold italic'>Dream Planner</Link></li>{' | '}
          <li className="px-3"><Link to='/destinations' className=''> Destinations</Link></li>{' | '}
          <li className="px-3"><Link to='/hotels' className=''> Hotels</Link></li>{' | '}
          <li className="px-3"><Link to='/about' className=''>About</Link></li>
          </ul>
          {currentUser ? loggedIn : loggedOut}

        </div>
      </nav>
      <style>{`
.hideMenuNav {
  display: none;
}
.showMenuNav {
  display: block;
  position: absolute;
  width: 50%;
  height: 100vh;
  top: 0;
  left: 50%;
  background: rgb(17, 24, 34);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
`}</style>
    </div>
  )
}

