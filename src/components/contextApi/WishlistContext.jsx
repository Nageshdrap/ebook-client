import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";




const WishlistContext =createContext();

export const WishlistProvider = ({children}) =>{
    const [wishlist , setWishlist] = useState([]);

    const fetchWishlist = async () =>{
        try {
            const res = await axios.get('https://ebook-server-4izu.onrender.com/api/getwishlist',{
                 headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
            setWishlist(res.data);
        } catch (error) {
            console.error("failed to fetch wishlist" , error);
        }
    };

    const addWishlist = async( productId) =>{
        try {
            await axios.post('https://ebook-server-4izu.onrender.com/api/addwishlist',{
                                 headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
            fetchWishlist();
        } catch (error) {
            console.error("failed to add wishlist", error);
        }
    };

    const removeWishlist = async (productId) =>{
        try {
            await axios.delete(`https://ebook-server-4izu.onrender.com/api/removewishlist/${productId}`,{
                                  headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}               
            });
            setWishlist(prev => prev.filter(item => item.productId._id !== productId));
        } catch (error) {
            console.error('remove wishlist failed',error);
        }
    };

    const isInWishlist = (productId) => {
  return Array.isArray(wishlist) && wishlist.some((item) => {
    const id = item?.productId?._id || item?.productId;
    return id === productId;
  });
};

    useEffect(()=>{
        fetchWishlist();
    },[]);

    return (
        <WishlistContext.Provider value={{wishlist , addWishlist , removeWishlist , isInWishlist}}>{children}</WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);