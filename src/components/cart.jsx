import { NavBar } from "./nav2";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import './cart.css';
import { FaAngleDoubleRight } from "react-icons/fa";
import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { width } from "@mui/system";
import { AiOutlineDelete } from "react-icons/ai";
import { PlaceOrder } from "./placeOrder";
import { useCart } from "./contextApi/CartContext";
import Loader from "./loader";
import Spinner from "./spinner";
import './buttonanimation.css';

const Cart = ({cartOpen , setCartOpen}) => {

   const { fetchCarts} = useCart();
   const navigate = useNavigate();

   const [cartItem , setCartItem] = useState([]);
   const [quantity , setQuantity] = useState(0);
   const [loading , setLoading] = useState(false);

   const cartMenu = useRef();
   const debounceTimers = useRef({});

   const PlaceOrder = () =>{
       setCartOpen(false);
       navigate('/placeorder');
   }

   function handleCart(){
       setCartOpen(false);
   }

   const fetchCart = async () =>{
        setLoading(true);
       try {
           const { data } = await axios.get('https://ebook-server-4izu.onrender.com/cart/cartitems',{
               headers:{Authorization : `Bearer ${localStorage.getItem("token")}`},
           });
           setCartItem(data.cart.items || []);
           fetchCarts();
       } catch (error) {
           console.error("fetch cart failed");
       }finally{
        setLoading(false);
       }
   }

   const removeCart = async (id)=>{
    setLoading(true);
    try {
         const productId = id;
       const { data } = await axios.delete(`https://ebook-server-4izu.onrender.com/cart/remove/${productId}`,{
           headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
       });
       setCartItem(data.cart.items);
       fetchCarts();
    } catch (error) {
        console.log("remove failed",error);
    }finally{
        setLoading(false);
    }
      
   }

   const subTotal =() =>{
       return cartItem.reduce((total , item)=> total += (item.productId?.price || 0 )* (item.quantity || 0),0);
   }

   const updateQuantity = async (productId , newQuantity) =>{
       try {
         setCartItem(cartItem => 
           cartItem.map((item)=>
               productId === item.productId._id ? {...item , quantity: newQuantity} : item
           )
         );
          const { data } =await axios.put(`https://ebook-server-4izu.onrender.com/cart/update/${productId}` , {quantity:newQuantity , couponValue:null}, {
               headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
          });
        //   setCartItem(data.cart.items || []);
          fetchCarts();
       } catch (error) {
           console.error("Error updating quantity", error);
       }
   }

   const handleDebouncedUpdate = (productId, newQuantity) => {
       if (debounceTimers.current[productId]) {
           clearTimeout(debounceTimers.current[productId]);
       }
       debounceTimers.current[productId] = setTimeout(() => {
           updateQuantity(productId, newQuantity);
           delete debounceTimers.current[productId];
       }, 500);
   };

   useEffect(()=>{
       fetchCart();
       const handler = (e) =>{
           if(!cartMenu.current.contains(e.target)){
               setCartOpen(false);
           }
       };

       if(cartOpen){
           document.addEventListener("mousedown",handler);
           document.body.style.position = 'fixed';
           document.body.style.width = '100%';
       }else{
           document.body.style.position = '';
           document.body.style.width = '';
       }

       const setViewportHeight = () =>{
           const vh = window.innerHeight * 0.01;
           document.documentElement.style.setProperty("--vh",`${vh}px`);
       };
       setViewportHeight();
       window.addEventListener("resize" , setViewportHeight);

       return () =>{
           document.removeEventListener("mousedown",handler);
           window.removeEventListener("resize",setViewportHeight);
           document.body.style.position = '';
           document.body.style.width = '';
       }
   },[cartOpen])

   return(
       <>
           <div className="overlay"></div>
           <div className="cartmenu" ref={cartMenu}>
           <div className="cart-item p-3"  style={{height:"calc(var(--vh,1vh)*100)"}}>
           <Suspense fallback={< Loader loading={true}/>}>
               <div className="d-flex justify-content-between align-items-center">
                   <div className="text-center fw-semibold"><h2>C A R T</h2></div>
                   <div className='fs-3 p-1' style={{border:'2px solid green',width:'max-content',cursor:'pointer'}} onClick={handleCart} ><FaAngleDoubleRight className='m-1'/></div>
               </div>
               <hr />
                {
                    loading ? (<Spinner />):(<>
                    
                        {    cartItem && cartItem.length === 0 ? (
                   <div>
                   <pre><h3 className="fw-semibold emptytext text-center mt-3">C A R T   I S   E M P T Y</h3></pre>
                   <div className="text-center mt-5 bounce-img"><img src={"/images/cartempty.webp"} alt="empty" width="190"/></div>
                   </div>
               ):(
                   <div className="cart-content">{
                   cartItem.slice().reverse().map((item,index)=>{
                       return (
                           <div key={index} >
                           <div className="containern shadow gap-4 d-flex flex- justify-content-between p-2 mt-2 color-black" >
                <div style={{width:'130px', height:'100%', border:'1px solid grey'}}>
                    <Link to={`/productDetails?pid=${item.productId._id}`}>
                                   <img src={item.productId.images?.[0]} className="image-fluid" alt="book"  style={{width:'100%',height:'100%',cursor:'pointer',objectFit:'cover'}}/>
                                  </Link> 
                               </div>

                               <div className="productn">
                                   <p className="mb-1 mt-0" >{item.productId.tittle}</p>
                                   <div className="d-flex gap-2 my-2">
                                       <div className="text-muted text-decoration-line-through ">&#8377;{item.productId.mrp}</div>
                                       <div className="bg-success text-white px-2 rounded-pill text-center" style={{fontSize:'smaller',alignItems:'center',paddingTop:'2px'}}>{item.productId.discount}% Off</div>
                                       <div className="fw-bold">&#8377;{item.productId.price}</div>
                                   </div>

                                   <div className="d-flex justify-content-between align-items-center mt-3">
                                       <div className="d-flex  align-items-center p-0" style={{border:'2px solid green'}}>
                                           <button className="px-2 bg-white " style={{height:'100%',width:'100%'}} disabled={item.quantity <= 1} onClick={() => handleDebouncedUpdate(item.productId._id, item.quantity - 1)}>-</button>
                                           <input className="form-control text-center mx-1" style={{width:'50px',border:'none',outline:'none',boxShadow:'none'}} value={item.quantity} readOnly></input>
                                           <button className="px-2 bg-white"  onClick={() => handleDebouncedUpdate(item.productId._id, item.quantity + 1)}>+</button>
                                       </div>
                                       <div className="p-2" style={{cursor:'pointer'}}>
                                           <AiOutlineDelete className="fs-4 " onClick={()=>removeCart(item.productId._id)}/>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           </div>
                       )})
                   } </div>
               )}
                    
                    </>)
                }
               
               <div className="cart-footer ">
                   { cartItem.length === 0 ? (null):(
                       <div className="d-flex justify-content-start gap-2 text-center"> 
                           <div className=" " style={{width:'35%'}}>
                               <div className="fw-semibold text-underline-dark">Subtotal</div>
                               <div>&#8377; {subTotal().toFixed(2)}</div>
                           </div>
                           <button className="cart-place text-center button-animation" style={{cursor:'pointer',width:'60%',padding:'10px 0',textAlign:'center'}} onClick={PlaceOrder}>Place Order</button>
                       </div>
                   )}
               </div>
           </Suspense>
           </div>
           </div>
       </>
   )
}

export default Cart;
