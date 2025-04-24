import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "./products";



const CategoryProduct = () =>{

    const [product,setProduct] = useState([]);
    // const location = useLocation();
    // const searchparams = new URLSearchParams(location.search);
    // const productid = searchparams.get('pid');

    const location = useLocation();
    const searchparams = new URLSearchParams(location.search);
    const category = searchparams.get('category');
    const subcategory = searchparams.get('subcategory');

    useEffect(async ()=>{
        const res = await axios.get('https://ebook-server-4izu.onrender.com/api/categorylist',{category , subcategory});
        setProduct(res.data);
    },[])

    return(
        <>
            <Products product={product}/>
        </>
    )
}


export default CategoryProduct;