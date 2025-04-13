import { Link } from "react-router-dom"




const PageNotFound = () =>{
    return(
        <>
            <div className="container">Page not found <Link to="/admin" className="text-decoration-none">GO TO HOME</Link> </div>
        </>
    )
}


export default PageNotFound;