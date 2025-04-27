import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import './searchPage.css';
import Loader from "./loader";
// import Products from "./products";
const Products = lazy(()=> import('./products'));



export function SearchPage(){

    const [product , setProduct] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchSearch =async () =>{
           try {
            console.log(query);
            const {data} =await axios.get(`https://ebook-server-4izu.onrender.com/api/search?q=${query}`);
             setProduct(data);
           } catch (error) {
                console.error("error in fetching");
           }
            
        }
        
        if(query) fetchSearch();
    },[query])

    return(
        <>
            <div className="mB">
                <p className="text-muted">Result search for "{ query }"</p>
                {
                    product.length === 0 ? (<><div className=" text-center"><div className="fs-1 fw-semibold">product not found</div><div className="btn btn-primary py-2 px-3 mt-3" onClick={()=>navigate('/')} style={{width:'max-content'}}>Home</div></div></>):(<Suspense fallback={<Loader loading={true}/>}><Products product={product}/></Suspense>)
                }
                
            </div>
        </>
    )
}