import {useState, useEffect } from 'react';

export default function Hotels() {

    const [searchInput, setSearchInput] = useState("Barcelona")
    const [search, setSearch] = useState(searchInput)

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }
 
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(searchInput)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search City:</label>
                <input                 
                type="text"
                name="search"
                id="search"
                placeholder="Enter city name..."
                value={searchInput}
                onChange={handleSearch}
                required
                />
                <button type='submit'>Submit</button>
            </form>
            <iframe 
                src={`https://hatlastravel.com/widget/hotels?place=${search}&partner=1261`}
                style={{height:"700px", width:"100%", margin:"auto", display:"block", overflow:"hidden", border:"none", marginTop:"10rem"}}></iframe> 
        </div>
    )
}