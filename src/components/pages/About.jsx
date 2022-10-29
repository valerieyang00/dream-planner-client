export default function About() {
    return (
        <div>
            {/* <section className="bg-gray-50 dark:bg-gray-900">  need to add back to sections if we remove dark mode implementation */}
            <section className=""> 
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold ">Our Team</h2>
                        <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">The Dream Planner App was created by this team <br></br> using Django, React, & PostgreSQL. </p>
                    </div> 
                    <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://i.imgur.com/QO2A8jc.png" alt="Valerie"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">Valerie</a>
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">Full Stack Software Engineer</span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Dashboard . CatLover . Wine . FullStack</p>  
                                <ul className="flex justify-center sm:mt-0 mt-2">
                                    <li>
                                        <a href='https://github.com/valerieyang00' target='_blank'>
                                            <img src='https://i.imgur.com/Hmzo2zq.png' className='about ' alt='github icon'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.linkedin.com/in/valeriey/' target='_blank'>
                                            <img src='https://i.imgur.com/ssvYmKe.png' className='about' alt='linkedin icon'/>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div> 

                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://i.imgur.com/BwETQyF.png" alt="Jese Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">Sean</a>
                                </h3>

                                
                                <span className="text-gray-500 dark:text-gray-400">Full Stack Software Engineer</span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">BackEnd . BugKiller . TeamPlayer</p>

                                

                                <ul className="flex space-x-2 justify-center sm:mt-0">
                                    <li>
                                        <a href='https://github.com/mousesaver' target='_blank'>
                                            <img src='https://i.imgur.com/Hmzo2zq.png' className='about' alt='github icon'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.linkedin.com/in/sean-f45/' target='_blank'>
                                            <img src='https://i.imgur.com/ssvYmKe.png' className='about' alt='linkedin icon'/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> 
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://i.imgur.com/Wg1Ro1q.png" alt="Michael Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">Prija</a>
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">Full Stack Software Engineer</span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">SCRUM . Tailwind . Crypto . NFTs . FullStack</p>
                                <ul className="flex space-x-2 justify-center sm:mt-0">
                                    <li>
                                        <a href='https://github.com/prijacash' target='_blank'>
                                            <img src='https://i.imgur.com/Hmzo2zq.png' className='about' alt='github icon'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href='https://www.linkedin.com/in/prijacash/' target='_blank'>
                                            <img src='https://i.imgur.com/ssvYmKe.png' className='about' alt='linkedin icon'/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> 
                        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src="https://i.imgur.com/h7hSF5H.png" alt="Sofia Avatar"/>
                            </a>
                            <div className="p-5">
                                <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    <a href="#">Devin</a>
                                </h3>
                                <span className="text-gray-500 dark:text-gray-400">Full Stack Software Engineer</span>
                                <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">FrontEnd . Tailwind . Spurs . Drums . Code</p>

                                <ul className="flex space-x-2 justify-center sm:mt-0">
                                    <li>
                                        <a href='https://github.com/devin-lynch' target='_blank'>
                                            <img src='https://i.imgur.com/Hmzo2zq.png' className='about' alt='github icon'/>
                                        </a>

  

                                    </li>
                                    <li>
                                        <a href='https://www.linkedin.com/in/lynch-devin/' target='_blank'>
                                            <img src='https://i.imgur.com/ssvYmKe.png' className='about' alt='linkedin icon'/>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>  
                    </div>  
                </div>
            </section>
        </div>
    )
}