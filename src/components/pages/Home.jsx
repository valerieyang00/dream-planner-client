import 'tw-elements';

export default function Home() {




    return (
        <div>
            Home 🏡      
            <div id="carouselExampleIndicators" class="carousel slide relative" data-bs-ride="carousel">
                <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                    <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
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
                <div class="carousel-inner relative w-full overflow-hidden">
                    <div class="carousel-item active  w-full">
                    <img
                        src="https://www.savoredjourneys.com/wp-content/uploads/2017/03/osaka-castle.jpg"
                        class="flex w-45 h-45"
                        alt="Wild Landscape"
                    />
                    </div>
                    <div class="carousel-item  w-full">
                    <img
                        src="https://www.frommers.com/system/media_items/attachments/000/856/538/s980/Paros2-crop.jpg?1464917118"
                        class="flex w-45 h-45"
                        alt="Camera"
                    />
                    </div>
                    <div class="carousel-item  w-full">
                    <img
                        src="https://travelpassionate.com/wp-content/uploads/2019/03/Scenic-summer-view-of-the-Old-Town-architecture-with-Elbe-river-embankment-in-Dresden-Saxony-Germany-Image-min-800x534.jpg"
                        class="flex w-45 h-45"
                        alt="Exotic Fruits"
                    />
                    </div>
                </div>
                <button
                    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
