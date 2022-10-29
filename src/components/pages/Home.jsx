import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import 'tw-elements';

export default function Home() {

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

    // CARDS
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
        <div>
            <br></br>
            <div className='flex justify-center'>
                <div id="carouselExampleCaptions" className='carousel slide relative w-full w-7/12 drop-shadow-lg'  data-bs-ride="carousel">
                    <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-2">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    <div className="carousel-inner relative w-full overflow-hidden">
                        <div className="carousel-item active relative float-left w-full">
                            <img
                                src="https://www.savoredjourneys.com/wp-content/uploads/2017/03/osaka-castle.jpg"
                                // className="block w-full h-96 object-cover align-middle"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>

                        <div className="carousel-item relative float-left w-full">
                            <img
                                src="https://www.savoredjourneys.com/wp-content/uploads/2017/03/osaka-castle.jpg"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>

                        <div className="carousel-item relative float-left w-full">
                            <img
                                src="https://travelpassionate.com/wp-content/uploads/2019/03/Scenic-summer-view-of-the-Old-Town-architecture-with-Elbe-river-embankment-in-Dresden-Saxony-Germany-Image-min-800x534.jpg"
                                // className="block w-full h-96 object-cover align-middle"
                                className="aspect-video block w-full object-cover align-middle"
                                alt="..."
                            />
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
   
            </div>




                <div className="text-xl mt-5 ">
                    Most Popular Destinations
                </div>

            <div className="flex justify-center">
                <div className="flex justify-center w-7/12 grid grid-cols-4 gap-4 mx-4 my-5 justify-items-center">
                    {renderPage}
                </div>
            </div>
        </div>
    )
}
