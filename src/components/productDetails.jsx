import axios from "axios";
import React, { lazy, Suspense, useEffect, useState }   from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './productDetails.css';
import Cookies from "js-cookie";
import API from "./api";
// import { Cart } from "./cart";
import './button-shrink.css';
import { useCart } from "./contextApi/CartContext";
import Loader from "./loader";
import Spinner from "./spinner";
import Cart from "./cart";




export function ProductDetails(){

    const { fetchCarts} = useCart();

    const navigate = useNavigate();
   
    const location = useLocation();
    const searchparams = new URLSearchParams(location.search);
    const productid = searchparams.get('pid');
    const [product , setProduct] = useState([]);
    const [image , setImage] = useState(null);
    const [tokenValue , setTokenValue] = useState('');
    const [cartOpen , setCartOpen] = useState(false);
    const [isShrunk , setIsShrunk] = useState(false);
    const [loading , setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
  async  function  loadProductDetails(id){
    setLoading(true);
    try {
         await axios.get(`https://ebook-server-4izu.onrender.com/api/productdetails/${id}`)
        .then(Res =>{
           setProduct(Res.data);
   });
    } catch (error) {
        console.error("product details failed");
    }finally{
        setLoading(false);
    }
      
   }
    
   async function addCart(id){
    setButtonLoading(true);
    try {
        const productId = id;
        console.log(productId);
        const token = localStorage.getItem('token');
        if( token){
           const res = await axios.post('https://ebook-server-4izu.onrender.com/cart/add',{ productId , quantity:1 },{
                headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
           });
           fetchCarts();
             setCartOpen(true);
        }else{
            navigate('/login');
        }
    } catch (error) {
        alert('falied');
    }finally{
        setButtonLoading(false);
    }
       
   }

   const handlewish = () =>{
        setIsShrunk(true);

        setTimeout(()=>{setIsShrunk(false)},200)
   }
   
    useEffect(()=>{
            if(productid){
                loadProductDetails(productid);
            }
           
            window.scrollTo({top:0,behavior:'smooth'});  
    },[productid ])
    
        
    return(
        <>
        {
            loading?( <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '500px' }} // Reserve height to prevent footer jump
        >
                <Spinner />
                </div> ):(
                <>
                     {  product && (
            <>
             
            <section className="container mB">
            <div className="row  gy-1">
                <div className="col-sm-12  col-md-1 pt-4 text-center thumbnil-img " >
                    {
                        product.images && product.images > 1 &&(
                        product.images.map((img , index) =>(
                            <div key={index} className="mb-3 p-2" style={{width:'80px', height:'80px', border:'1px solid grey'}}>
                                <img src={ img} className="" alt="book1" onClick={()=>{setImage(img.images)}} style={{width:'100%',height:'100%',cursor:'pointer'}}/>
                                </div>
                        )))
                    }
                </div>
                <div className="col-sm-12 col-md-4 p-4 text-center" >
                    <div>
                        {
                            image? (  product.images && product.images.length > 0 && (
                                <img src={image} alt="book" className="img-fluid" style={{maxHeight:'400px', objectFit:'contain'}}/>

                            )):( product.images && product.images.length > 0 && (
                                <img src={product.images[0]} alt="book" className="img-fluid" style={{maxHeight:'400px', objectFit:'contain'}}/>
                            ))
                          
                        }
                    </div>
                    <div className="w-100 mt-4 d-flex justify-content-between">
  <button
    className={`py-3 cart bg-dark text-white shrink-button ${isShrunk ? 'shrink-animation' : ''}`}
    onClick={() => addCart(productid)}
    style={{ cursor: 'pointer', width: '48%' }}
    disabled={buttonLoading}
  >
    {buttonLoading ? (
      <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
    ) : 'Buy Now'}
  </button>

  <button
    className={`py-3 wish shrink-button ${isShrunk ? 'shrink-animation' : ''}`}
    style={{ cursor: 'pointer', width: '48%' }}
    onClick={() => addCart(productid)}
    disabled={buttonLoading}
  >
    {buttonLoading ? (
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    ) : 'Add Cart'}
  </button>
</div>

                    
                </div>
                <div className="col-sm-12 desc px-3 col-md-6" >
                
                    <div className="mb-2  fs-4 fw-semibold">{product.tittle}</div>
                    <div className="d-flex gap-2 my-2"><div className="text-muted text-decoration-line-through ">&#8377;{product.mrp}</div><div className="bg-success text-white px-2 rounded-pill text-center" style={{fontSize:'smaller',alignItems:'center',paddingTop:'2px'}}>{product.discount}% Off</div><div className="fw-bold">&#8377;{product.price}</div></div>

                    <div className="container bg-secondary-subtle py-2 fw-semibold" >SPECIFICATION</div>
                    <div className="px-2 mt-2"><pre className="m-0">Author  :   {product.author}</pre></div>
                    <div className="px-2 mb-2"><pre className="m-0">Type  :   Paperback</pre></div>

                    <div className="container bg-secondary-subtle py-2 fw-semibold" >DESCRIPTION</div>
                    <div className="m-0 p-2">{product.description}</div>
                    <div className="container mt-3">
                        <div className="text-center">
                            <img src={"/images/free_shipping.webp"} className="img-fluid" alt="" />
                        </div>
                        
                    </div>
                </div>
            </div>
            </section>
            </>
)}
                </>
            )
        }
       
       {
                cartOpen && (< Cart cartOpen={cartOpen} setCartOpen={setCartOpen}/>)
        
        }
 
      </>
     

    )
}


