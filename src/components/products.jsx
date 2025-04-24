import { Link, useNavigate } from "react-router-dom";
import './productDisplay.css';
import { IoIosHeartEmpty } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";




const Products = ({product}) =>{
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const [wishColor , setWishColor] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [likedItems , setLikedItems] = useState([]);


    const WishList =async (id) =>{
        const productId = id;
        if(token){
            const updatedLikedItems = likedItems.includes(productId);

            if(updatedLikedItems){
               const res = await axios.delete(`https://ebook-server-4izu.onrender.com/api/wishlist/${productId}`,{
                    headers:{Authorization: `Bearer ${token}`}
                });
                const updateLiked = likedItems.filter((id)=> id !== productId);
                setLikedItems(updateLiked);
                toast.success(res.data.msg);

            }else{
                const res = await axios.post('https://ebook-server-4izu.onrender.com/api/wishlist',{productId},{
                    headers:{Authorization: `Bearer ${token}`}
                });
                const updateLiked = [...likedItems,productId];
                setLikedItems(updateLiked);
                toast.success(res.data.msg);
            }
            
        }else{
            navigate('/login');
        }
    }
    const fetchWishlist = async () =>{
        const res = await axios.get('https://ebook-server-4izu.onrender.com/api/wishlist',{
            headers:{Authorization:`Bearer ${token}`}
        });
        setWishlist(res.data);
        console.log(res.data);
        setLikedItems(res.data.map((item) => item._id));
    }
    useEffect(()=>{
        if(token){
            fetchWishlist();
        }
        window.scrollTo({top:0,behavior:'smooth'});
    },[]);
    return(
        <>
                 <div className="container mP">
                <div className="row">
                    { product.map((item,index)=>(
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 product1  bg-light" key={index}>
                        
                        <div className="p-1 product" to={`productDetails/${item._id}`} style={{height:'max-content'}}>
                        <div className="m-auto proimg" style={{maxWidth:'400px',maxHeight:'400px'}}><Link to={`/productDetails?pid=${item._id}`} style={{maxWidth:'400px',maxHeight:'400px'}}><img src={ item.images} alt="book" className="img-fluid" style={{width:'100%',height:'100%'}}/></Link><i className={`wishicon fs-1 fw-semibold `} style={{}} onClick={()=>WishList(item._id)}>< IoIosHeartEmpty fill={likedItems.includes(item._id)? "red" : ""} /></i></div>
                            
                            <Link className="" style={{textDecoration:'none'}} to={`/productDetails?pid=${item._id}`}><tittle className="mb-1 text-success">{item.tittle}</tittle></Link>
                            <div className="d-flex gap-2 my-2"><div className="text-muted text-decoration-line-through ">&#8377;{item.mrp}</div><div className="bg-success text-white px-2 rounded-pill text-center" style={{fontSize:'smaller',alignItems:'center',paddingTop:'2px'}}>{item.discount}% Off</div><div className="fw-bold">&#8377;{item.price}</div></div>
                            
                        </div>
                        
                    </div>
                  ))  }                       
                </div>    
            </div>
            <ToastContainer position="bottom-center" autoClose={2000} transition={Bounce} theme="dark" hideProgressBar={true} closeButton={false} style={{marginBottom:'10px'}}/>

        </>
    )
}


export default Products;