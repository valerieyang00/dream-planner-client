import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import Carousel from "../partials/Carousel"
import 'tw-elements';

export default function Home() {

    const [msg, setMsg] = useState("")
    const [destinations, setDestinations] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    useEffect(() => {

        const getDestinations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/`)
                const users = response.data
                const allDestinations = []
                users.forEach((user) => {
                    user.destinations.forEach((destination) => {
                        destination["username"] = user["username"]
                        allDestinations.push(destination)
                    })
                })
                const subDestinations = allDestinations.slice(0, 4)
                setDestinations(subDestinations)                           
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestinations()
    },[])
    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth)
  
        window.addEventListener('resize', handleResize)
  
        return _ => window.removeEventListener('resize', handleResize)
      }, [windowSize])
  
      const isWide = windowSize > 1536
      const isThird = windowSize > 1280
      const isHalf = windowSize > 1024
      const isSmall = windowSize > 768
      const isPhone = windowSize > 640

    // CARDS
    const renderPage = destinations.map((destination, idx) => {
        return (
            <div key={`${idx}-${destination.id}`}className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110 mx-1 my-1" >
                <ul className="mb-3">
                    <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='350px'/></Link>
                    <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mt-2">{destination.name}</div></Link>
                    <small className="text-gray-700 italic text-base">{destination.username}'s Dream</small>
                </ul>
            </div>

        )
    })   

    return (
        <div className={`relative flex flex-col overflow-x-hidden`}>
            <div className={`flex ${!isWide ? 'flex-col-reverse' : ''} pt-16`}>
              <div className={`relative w-screen ${isWide ? 'mt-40 self-end' : `mt-[-4rem] pb-[2rem] justify-center`} px-[${isThird && !isWide ? `mx-auto` : '0rem'}]`}>
                <Carousel isWide={isWide} />
              </div>
            </div>
            <div className="text-xl">
                Most Popular Destinations
            </div>
            <div className="flex justify-center">
                <div className={`flex justify-center w-7/12 grid ${isPhone ? 'grid-cols-4' : 'grid-cols-1'} gap-4 mx-4 my-5 justify-items-center`}>
                    {renderPage}
                </div>
            </div>
        </div>  
    )
}
