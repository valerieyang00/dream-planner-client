import 'tw-elements';

export default function Home() {




    return (
        <div>
                
            <div id="carouselExampleIndicators" className="carousel slide flex my-20 justify-center" data-bs-ride="carousel">
                <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                    ></button>
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner relative h-[50vh] ">
                    <div className="carousel-item active h-[50vh]">
                    <img
                        src="https://www.savoredjourneys.com/wp-content/uploads/2017/03/osaka-castle.jpg"
                        className="object-cover w-45 h-45"
                        alt=""
                    />
                    </div>
                    <div className="carousel-item h-[50vh]">
                    <img
                        src="https://www.frommers.com/system/media_items/attachments/000/856/538/s980/Paros2-crop.jpg?1464917118"
                        className="object-cover w-45 h-45"
                        alt=""
                    />
                    </div>
                    <div className="carousel-item h-[50vh]">
                    <img
                        src="https://travelpassionate.com/wp-content/uploads/2019/03/Scenic-summer-view-of-the-Old-Town-architecture-with-Elbe-river-embankment-in-Dresden-Saxony-Germany-Image-min-800x534.jpg"
                        className="object-cover w-45 h-45"
                        alt=""
                    />
                    </div>
                </div>
                <button
                    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
