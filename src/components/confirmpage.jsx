import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import './confirmpage.css';
import Lottie from "lottie-react";
import loadingAnimation from "../animation/cheake.json";
import { useEffect } from "react";


const Confirmpage = () =>{

    const navigate = useNavigate();

    const handleHome = () =>{
        navigate('/');
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[])

    return(
        <>
                      <div className="container">
                        <div className="text-center m-auto confirmimage" style={{width:'100%',height:'500px',backgroundImage:'url("/images/confirmnew.jpg")',backgroundSize:'cover',backgroundPosition:'center'}}>
                        <div className="text-center m-auto " style={{width:'300px',height:'250px'}}>
                            <Lottie animationData={loadingAnimation} loop={true} autoPlay={true} />
                        </div>
                        <div className="text-center m-auto bg-dark text-white px-1 py-1 d-flex justify-content-evenly align-items-center mt-5 confirmtext">
                           <div className="" style={{width:'70px'}}>                            <Lottie animationData={loadingAnimation} loop={true} autoPlay={true} />
                           </div> <div className="fw-semibold fs-4">Your order placed successfully...! </div><button className="btn btn-primary w-25" onClick={handleHome}>Home</button>
                        </div>
                        </div>

                      </div>

        </>
    )
}

export default Confirmpage;