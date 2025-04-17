import { Link } from "react-router-dom";
import { Alert } from "./Alert";
import './confirmpage.css';
import Lottie from "lottie-react";
import loadingAnimation from "../animation/cheake.json";


const Confirmpage = () =>{
    return(
        <>
                      <div className="container">

                        <div style={{width:'300px',height:'250px'}}>
                            <Lottie animationData={loadingAnimation} loop={true} autoPlay={true} />
                        </div>
                        <div className="text-center m-auto bg-success text-white">
                            Your order placed successfully <button className="btn btn-outline-warning">Go to order</button>
                        </div>
                        <div>
                            <button className="btn btn-primary">Continue purchase</button>
                        </div>

                      </div>

        </>
    )
}

export default Confirmpage;