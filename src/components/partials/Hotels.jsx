import {useState, useEffect } from 'react';

export default function Hotels() {

    const [search, setSearch] = "los angeles"
    const [iframeSrc, setiframeSrc] = `https://hatlastravel.com/widget/hotels?place=${search}&partner=1261`

 
    const handleSubmit = (e) => {
        e.preventDefault()
        setiframeSrc(`https://hatlastravel.com/widget/hotels?place=${search}&partner=1261`)
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
                />
                <button type='submit'>Go</button>
            </form>
            <iframe 
                src={iframeSrc}
                style={{height:"400px", width:"100%", margin:"auto", display:"block", overflow:"hidden", border:"none"}}></iframe> 
        </div>
    )
}