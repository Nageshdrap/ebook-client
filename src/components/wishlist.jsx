import { useState } from "react";
import { useWishlist } from "./contextApi/WishlistContext"
import ProductCard from "./ProductCard"
import Spinner from "./spinner";
import Lottie from "lottie-react";
import emptyAnimation from '../animation/emptyWish.json';
import './wishlist.css';


const WishlistCom = () =>{
    
    const {wishlist , loading}= useWishlist();
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
                        <div className="container" style={{height:'100%',objectFit:'contain'}}>
                            <Lottie animationData={emptyAnimation} loop={true} />
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