import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "./products";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import Spinner from "./spinner";



const CategoryProduct = () =>{

    const [product,setProduct] = useState([]);
    const [loading , setLoading] = useState(false);
    // const location = useLocation();
    // const searchparams = new URLSearchParams(location.search);
    // const productid = searchparams.get('pid');

    const location = useLocation();
    const searchparams = new URLSearchParams(location.search);
    const category = searchparams.get('category');
    const subcategory = searchparams.get('subcategory');

    useEffect(()=>{
        const fetchCategorylist = async () =>{
            setLoading(true);
            try {
                console.log(category , subcategory);
            const res = await axios.get('https://ebook-server-4izu.onrender.com/api/categorylist',{
                params:{
                    category:category,
                    subcategory:subcategory,
                },
            });
            setProduct(res.data);
            console.log(res.data);
            } catch (error) {
                console.error("category list failed", error);
            }finally{
                setLoading(false);
            }
            
        }
        
        fetchCategorylist();
    },[subcategory,category])

    return(
        <>
            {
                
            loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
            ):(<ProductList product={product} />)
            }
          
        </>
    )
}


export default CategoryProduct;