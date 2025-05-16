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
                        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '500px', width: '100%' }}>
                            <Lottie animationData={emptyAnimation} loop={true} style={{ height: '70%', width: '60%' }} />
                            <div className="d-flex flex-column align-items-center gap-3 mt-3">
                                <div className="fw-semibold fs-4">Your Wishlist is Empty...</div>
                                <button className="btn btn-primary">Home</button>
                            </div>
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