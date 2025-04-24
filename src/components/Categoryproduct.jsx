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

    useEffect(()=>{
        const fetchCategorylist = async () =>{
            console.log(category , subcategory);
            const res = await axios.get('https://ebook-server-4izu.onrender.com/api/categorylist',{
                params:{
                    category:category,
                    subcategory:subcategory,
                },
            });
            setProduct(res.data);
            console.log(res.data);
        }
        
        fetchCategorylist();
    },[subcategory,category])

    return(
        <>
            <Products product={product} />
        </>
    )
}


export default CategoryProduct;