import { useEffect, useState } from "react"
import { NavBar } from "./nav2"
import { Link, useNavigate } from "react-router-dom";
import Products from "./products";
import axios from "axios";
import './wishlist.css';
import Spinner from "./spinner";




export function WishList(){

    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [product , setProduct] = useState([]);

    const fetchWishProduct = async () =>{
        setLoading(true);
        try {
             const res = await axios.get('https://ebook-server-4izu.onrender.com/api/wishlist',{
            headers:{Authorization:`Bearer ${token}`}
        });
        setProduct(res.data.list);
        console.log("mm",res.data.list);
        } catch (error) {
            console.error('fetch wishlist error');
        }finally{
            setLoading(false);
        }
       
        
    }

    useEffect(()=>{
        if(token){
            fetchWishProduct();
        }else{
            navigate('/login');
        }
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);


    return(
       <>
       {
         loading ? (
                 <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '400px' }} // Reserve height to prevent footer jump
        >
                <Spinner />
                </div>
            ):(<>
                 {
            product.length === 0 ? (<div className="emptywish container bg-light px-3 py-2 fw-semibold ">E M P T Y  <span className="ms-3">  W I S H L I S T </span><Link to="/" className="text-decoration-none ms-3" style={{cursor:'pointer'}}>G O T O H O M E</Link></div>):
            (
                <Products product={product}/> 
            ) 
        }
          
          </>
            )
       }
       
       </>
    )
}