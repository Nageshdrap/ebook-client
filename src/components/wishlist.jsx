import { useWishlist } from "./contextApi/WishlistContext"
import ProductCard from "./ProductCard"




const WishlistCom = () =>{
    const {wishlist}= useWishlist();
    return(
        <>
            <div className="container">
                {
                    wishlist.length === 0 ? (<p>Wishlist Empty</p>):
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
        </>
    )
}


export default WishlistCom;