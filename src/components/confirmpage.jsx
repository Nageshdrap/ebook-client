import { Link } from "react-router-dom";
import { Alert } from "./Alert";
import './confirmpage.css';



const Confirmpage = () =>{
    return(
        <>
                       <div className="container-fluid" style={{width:'100vw', height:"100vh"}}> <img src={"/images/confirm.avif"} alt="empty" className="img-fluid" style={{width:'100%', height:'100%',objectFit:'contain'}}/></div>
                       <div className="text-center conorder">
                       <div className="bg-dark container-fluid py-3 text-light slide-up-div m-auto">Your order placed successfully <span className="ms-3"> <Link className="text-decoration-none" to="/">GOTO HOME</Link></span></div>
                       </div>

        </>
    )
}

export default Confirmpage;