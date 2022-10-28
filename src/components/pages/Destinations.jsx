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

    // ORIGINAL LAYOUT
    // const renderPage = destinations.map((destination, idx) => {
    //       return (
    //         <ul key={`${destination.id}-${idx}`}>
    //             <Link to={`/destinations/${destination.id}`}><h2 className='font'>{destination.name}</h2></Link>
    //             <small className='font'>{destination.username}</small>
    //             <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='rounded-3xl border-4 destinations' width='400px'/></Link>
    //         </ul>
    //     )

    // })

    // RESPONSIVE CARD HOVER
    // const renderPage = destinations.map((destination, idx) => {
    //     return (
    //         <div className='container'>
    //             <div className="box">
    //                 <div className="imgBox">
    //                     <img src={destination.photo} alt={destination.name}/>
    //                 </div>
    //                 <div className="content">
    //                     <h2>{destination.name}<br></br>
    //                     <span>{destination.username}</span></h2>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // })

    // CARDS
    const renderPage = destinations.map((destination, idx) => {
        return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg card hover:scale-110">
              <ul key={`${destination.id}-${idx}`}>
                  <Link to={`/destinations/${destination.id}`}><img src={destination.photo} alt={destination.name} className='' width='400px'/></Link>
                  <Link to={`/destinations/${destination.id}`}><div className="font-bold text-xl mb-2">{destination.name}</div></Link>
                  <small className="text-gray-700 text-base">{destination.username}</small>
              </ul>
          </div>
        )
    })   

    return (

        <div className='grid grid-cols-4 gap-4 mx-4 my-5'>
            {msg}
            {renderPage}
        </div>

        
    )
}



