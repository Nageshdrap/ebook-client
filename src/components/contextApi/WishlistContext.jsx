import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";




const WishlistContext =createContext();

export const WishlistProvider = ({children}) =>{
    const [wishlist , setWishlist] = useState([]);
    const [loading , setLoading] = useState(false);

    const fetchWishlist = async () =>{
        setLoading(true);
        try {
            const res = await axios.get('https://ebook-server-4izu.onrender.com/api/getwishlist',{
                 headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
            setWishlist(res.data);
            console.log("suuu",res.data);
        } catch (error) {
            console.error("failed to fetch wishlist" , error);
        }finally{
            setLoading(false);
        }
    };

    const addWishlist = async( productId) =>{
        try {
            await axios.post('https://ebook-server-4izu.onrender.com/api/addwishlist',{productId},{
                headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
            fetchWishlist();
        } catch (error) {
            console.error("failed to add wishlist", error);
        }
    };

    const removeWishlist = async (productId) =>{
        setLoading(true);
        try {
            await axios.delete(`https://ebook-server-4izu.onrender.com/api/deletewishlist/${productId}`,{
                                  headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}               
            });
            setWishlist(prev => prev.filter(item => item._id !== productId));
        } catch (error) {
            console.error('remove wishlist failed',error);
        }finally{
            setLoading(false);
        }
    };

   const isInWishlist = (productId) => {
  return Array.isArray(wishlist) && wishlist.some((item) => {
    return String(item._id) === String(productId);
  });
};

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            fetchWishlist();
        }else{
            setWishlist([]);
        }
        
    },[]);

    return (
        <WishlistContext.Provider value={{wishlist , addWishlist , removeWishlist , isInWishlist,loading ,fetchWishlist , clearWishlist: () => setWishlist([]),}}>{children}</WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);