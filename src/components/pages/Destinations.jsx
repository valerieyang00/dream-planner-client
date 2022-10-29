import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Destinations() {

    const [msg, setMsg] = useState("")
    const [destinations, setDestinations] = useState([])

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
                setDestinations(allDestinations)                           
            }catch(err) {
                console.warn(err)
                if(err.response) {
                    setMsg(err.response.data.msg)
                }
            }
        }
        getDestinations()
    },[])


    const renderPage = destinations.map((destination, idx) => {
        return (
  
          <div className="max-w-sm rounded overflow-hidden shadow-lg card transform transition duration-500 hover:scale-110 mx-1 my-1" >
              <ul key={`${destination.id}-${idx}`} className="mb-3">
                  <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='350px'/></Link>
                  <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mt-2">{destination.name}</div></Link>
                  <small className="text-gray-700 italic text-base">{destination.username}'s Dream</small>
              </ul>
          </div>

        )
    })   

    return (

        <div className='grid grid-cols-4 gap-4 mx-4 my-5 justify-items-center'>
            {msg}
            {renderPage}
        </div>

        
    )
}




