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

  

  const handleWishlist = async () => {
    if (console.log("nag true",inWishlist)) {
      await removeWishlist(item._id);
      toast("Removed from wishlist");
      if(fromWishlist){
        removeWishlist(item._id);
      }
    } else {
      await addWishlist(item._id);
      toast("Added to wishlist");
    }
  };
  useEffect(()=>{
    setInWishlist(isInWishlist(item._id));
  },[wishlist , item._id]);

  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 product1 bg-light">
      <div className="p-1 product" style={{ height: 'max-content' }}>
        <div className="m-auto proimg" style={{ width: '200px', height: '280px' }}>
          <Link to={`/productDetails?pid=${item._id}`}>
            <LazyImage src={item.images} alt={"book"} />
          </Link>
          <i
            className="wishicon fs-1 fw-semibold"
            onClick={handleWishlist}
            style={{ color: inWishlist ? "red" : "gray", cursor: "pointer" }}
          >
            {inWishlist ? <FaHeart fill="red"/> : <FaRegHeart />}
          </i>
        </div>

        <Link style={{ textDecoration: 'none' }} to={`/productDetails?pid=${item._id}`}>
          <tittle className="mb-1 text-success">{item.tittle}</tittle>
        </Link>

        <div className="d-flex gap-2 my-2">
          <div className="text-muted text-decoration-line-through">&#8377;{item.mrp}</div>
          <div className="bg-success text-white px-2 rounded-pill text-center" style={{ fontSize: 'smaller', paddingTop: '2px' }}>
            {item.discount}% Off
          </div>
          <div className="fw-bold">&#8377;{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
