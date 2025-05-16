import { useEffect, useState } from "react";
import { useWishlist } from "./contextApi/WishlistContext"
import ProductCard from "./ProductCard"
import Spinner from "./spinner";
import Lottie from "lottie-react";
import emptyAnimation from '../animation/emptyWish.json';
import './wishlist.css';


const WishlistCom = () =>{
    
    const {wishlist , loading}= useWishlist();
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[])
    return(
        <>{
            loading ? (
                <div className="d-flex justify-content-center align-items-center mbWish" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
            ):(
                 <div className="container mbWish">
                {
                    wishlist?.length === 0 ? (
                        <div className="position-relative" style={{height:'500px',width:'100vw',display:'flex',justifyContent:'center'}}>
                            <Lottie animationData={emptyAnimation} loop={true} style={{height:'90%',width:'80vw'}}/>
                            <div className="position-absolute m-auto bottom-0 bg-dark text-white container" style={{}}><div className="fw-semibold fs-4">Your Wishlist Empty... </div><button className="btn btn-primary w-25" >Home</button></div>
                        </div>
                    ):
                    (
                        <div className="row">
                    {
                        wishlist.map((item ,index)=>(
                            <ProductCard item={item} key={index} fromWishlist={true}/>
                        ))
                    }
                </div>
                    ) 
                }
                
            </div>
            )
        }
           
        </>
    )
}


export default WishlistCom;