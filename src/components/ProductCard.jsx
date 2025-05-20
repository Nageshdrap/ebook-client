// ProductCard.jsx
import { Link, useNavigate } from "react-router-dom";
import './productDisplay.css';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "./contextApi/WishlistContext";
import { toast, Bounce, ToastContainer } from "react-toastify";


const ProductCard = ({ item , fromWishlist}) => {
  const { addWishlist, removeWishlist, isInWishlist , wishlist } = useWishlist();
  const [inWishlist , setInWishlist] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  const handleWishlist = async (itemId) => {
    if(token){
      const originalState = inWishlist;
    setInWishlist(!inWishlist)
    try {
      if (originalState) {
      await removeWishlist(itemId);
      if(fromWishlist){
        removeWishlist(itemId);
      }
    } else {
      await addWishlist(itemId);
    }
    } catch (error) {
      setInWishlist(originalState);
    }
    }else{
      navigate('/login');
    }
    
    
  };
  useEffect(()=>{
    if(token){
      setInWishlist(isInWishlist(item._id));
    }
    
  },[wishlist , item._id]);

  return (
    <div className="col-6 col-md-4 col-lg-3 product1 bg-light">
      <div className="p-1 product" style={{ height: 'max-content' }}>
        <div className="m-auto proimg" style={{ maxWidth: '200px', maxHeight: '280px' }}>
          <Link to={`/productDetails?pid=${item._id}`}>
            <LazyImage src={item.images} alt={"book"} />
          </Link>
          <div 
            className="wishicon"
            onClick={()=>handleWishlist(item._id)}
            style={{ color: inWishlist ? "red" : "black", cursor: "pointer",backgroundColor:'white' }}
          >
            {inWishlist ? <FaHeart /> : <FaRegHeart />}
          </div>
          <div
            className="offer2">
              <div className="bg-dark text-white px-2 rounded-pill text-center" style={{ fontSize: 'smaller', paddingTop: '2px' }}>
              {item.discount}% Off
              </div>
          </div>
        </div>

        <div className="mt-2" style={{width:'100%'}}>
  <Link to={`/productDetails?pid=${item._id}`} style={{ textDecoration: 'none' }}>
    <div className="text-success fw-semibold ptittle" style={{  width:'100%' ,wordBreak:'break-word' }}>
      {item.tittle}
    </div>
  </Link>
</div>


        <div className="d-flex gap-2 my-2">
          <div className="text-muted text-decoration-line-through">&#8377;{item.mrp}</div>
          <div className="bg-success text-white px-2 rounded-pill text-center offer" style={{ fontSize: 'smaller', paddingTop: '2px' }}>
            {item.discount}% Off
          </div>
          <div className="fw-bold">&#8377;{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
