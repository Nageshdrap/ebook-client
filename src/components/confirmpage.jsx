import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import './confirmpage.css';
import Lottie from "lottie-react";
import loadingAnimation from "../animation/cheake.json";


const Confirmpage = () =>{

    const navigate = useNavigate();

    const handleHome = () =>{
        navigate('/');
    }

    return(
        <>
                      <div className="container">

                        <div className="text-center m-auto" style={{width:'300px',height:'250px'}}>
                            <Lottie animationData={loadingAnimation} loop={true} autoPlay={true} />
                        </div>
                        <div className="text-center m-auto bg-dark text-white px-1 py-1 d-flex justify-content-evenly align-items-center mt-4 confirmtext">
                           <div style={{width:'70px'}}>                            <Lottie animationData={loadingAnimation} loop={true} autoPlay={true} />
                           </div> <div className="fw-semibold fs-4">Your order placed successfully...! </div><button className="btn btn-primary w-25" onClick={handleHome}>Home</button>
                        </div>
                        

                      </div>

        </>
    )
}

export default Confirmpage;