import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";





const CartContext = createContext();

export const CartProvider = ({children}) =>{

    const [cartItems , setCartItems] = useState([]);

    const fetchCarts =async () =>{
        const { data } = await axios.get('https://ebook-server-4izu.onrender.com/cart/cartitems',{
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`},
        });
        setCartItems(data.cart.items || []);
    }

    useEffect(()=>{
        // const token = localStorage.getItem('token');
        // if(token){
        //     fetchCarts();
        // }
    },[]);

    return(
        <CartContext.Provider value={{cartItems,setCartItems,fetchCarts}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);