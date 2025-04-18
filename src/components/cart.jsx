import { NavBar } from "./nav2";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import './cart.css';
import { FaAngleDoubleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { width } from "@mui/system";
import { AiOutlineDelete } from "react-icons/ai";
import { PlaceOrder } from "./placeOrder";
import { useCart } from "./contextApi/CartContext";





export function Cart({cartOpen , setCartOpen}){

   const { fetchCarts} = useCart();

    const navigate = useNavigate();

    const [cartItem , setCartItem] = useState([]);

    
    const PlaceOrder = () =>{
        setCartOpen(false);
        navigate('/placeorder');
    }

    function handleCart(){
        setCartOpen(false);
    }
    const fetchCart = async () =>{
        try {
            
            const { data } = await axios.get('https://ebook-server-4izu.onrender.com/cart/cartitems',{
                headers:{Authorization : `Bearer ${localStorage.getItem("token")}`},
            });
            console.log(data.cart.items);
            // setCartItem(data.cart.items || []);
            // fetchCarts();
        } catch (error) {
            console.error("fetch cart failed");
        }
    }

    const removeCart = async (id)=>{
        const productId = id;

        const { data } = await axios.delete(`https://ebook-server-4izu.onrender.com/cart/remove/${productId}`,{
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
 
        });
        setCartItem(data.items);
        fetchCarts();
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
           const { data } =await axios.put(`https://ebook-server-4izu.onrender.com/cart/update/${productId}` , {quantity:newQuantity},{
                
                    headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
            
            setCartItem(data.cart.items || []);
           


           
        } catch (error) {
            console.error("Error updaating quantity", error);
        }
    }

    useEffect(()=>{

        fetchCart();

        if(cartOpen){
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }else{
            document.body.style.position = '';
            document.body.style.width = '';
        }
        
        return () =>{
            document.body.style.position = '';
            document.body.style.width = '';
        }
    },[cartOpen])
    return(
        <>
            <div className="overlay">  
            
            </div>
            <div className="cart-item p-3">
                   <div className="d-flex justify-content-between align-items-center">
                        <div className="text-center fw-semibold"><h2>C A R T</h2></div>
                        <div className='fs-3 p-1' style={{border:'2px solid green',width:'max-content',cursor:'pointer'}} onClick={handleCart} ><FaAngleDoubleRight className='m-1'/></div>
                        
                   </div>
                   <hr />
                   {    cartItem &&
                        cartItem.length === 0 ? (
                            <div>
                            <pre><h3 className="fw-semibold emptytext text-center mt-3">C A R T   I S   E M P T Y</h3></pre>
                            <div className="text-center mt-5 bounce-img"><img src={"/images/cartempty.webp"} alt="empty" width="190"/></div>
                            </div>
                        ):(
                            cartItem.map((item,index)=>{
                                
                                 
                               return (
                                <div key={index} className="cart-content">
                                <div className="containern shadow gap-4 d-flex flex- justify-content-between p-2 mt-2 color-black" >
                                    <div style={{width:'130px', height:'100%', border:'1px solid grey'}}>
                                        <img src={item.productId.images?.[0]} className="image-fluid" alt="book"  style={{width:'100%',height:'100%',cursor:'pointer',objectFit:'cover'}}/>
                                    </div>
                                    <div className="productn">
                                        <p className="mb-1 mt-0" >{item.productId.tittle}</p>
                                        <div className="mb-1">{item.productId.price}</div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className="d-flex  align-items-center p-0" style={{border:'2px solid green'}}>
                                            <button className="px-2 bg-white " style={{height:'100%',width:'100%'}} disabled={item.quantity <= 1} onClick={()=>updateQuantity(item.productId._id , item.quantity - 1 )}>-</button>
                                            <input className="form-control text-center mx-1" style={{width:'50px',border:'none'}} value={item.quantity} readOnly></input>
                                            <button className="px-2 bg-white"  onClick={()=>updateQuantity(item.productId._id , item.quantity + 1)}>+</button>
                                            </div>
                                            <div className="p-2" style={{cursor:'pointer'}}>
                                                <AiOutlineDelete className="fs-4 " onClick={()=>removeCart(item.productId._id)}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                </div>
                            )})
                        )
                   }
                   <div className="cart-footer ">
                    { cartItem.length === 0 ? (null):(<div> <div className="d-flex justify-content-between px-3">
                            <h3>Subtotal</h3>
                            <h3>&#8377; {subTotal().toFixed(2)}</h3>
                        </div>
                        <div className="cart-place  text-center" style={{cursor:'pointer'}} onClick={PlaceOrder}>Place Order</div>
                        </div>
                    )}
                       
                        
                   </div>
                </div>
           
         
        </>
    )
}