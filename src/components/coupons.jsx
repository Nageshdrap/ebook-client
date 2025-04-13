
import { FaArrowRight } from "react-icons/fa";




const Coupons = () =>{

    return(
        <>
                <div className="shadow d-flex align-items-center subprice shadow mt-3 p-2" style={{height:'45px',border:'2px solid green'}}>
                                <input type="text" placeholder="Apply coupon code..."  style={{width:'100%',border:'none',outline:'none'}}/>
                                <FaArrowRight className="ms-2" style={{cursor:'pointer'}}/>
                            </div>
        </>
    )
}

export default Coupons;