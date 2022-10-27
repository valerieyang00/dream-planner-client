export default function Hotels() {

    const city = "los angeles"
    return (


        <div>
            <iframe 
                src={`https://hatlastravel.com/widget/hotels?place=${city}&partner=1261`} 

                style={{height:"400px", width:"100%", margin:"auto", display:"block", overflow:"hidden", border:"none"}}></iframe> 
        </div>
    )
}