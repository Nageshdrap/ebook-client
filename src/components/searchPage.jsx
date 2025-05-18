import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import './searchPage.css';
import Loader from "./loader";
import Spinner from "./spinner";
import ProductList from "./ProductList";
import Lottie from "lottie-react";
import emptyAnimation from '../animation/emptyWish.json';
// import Products from "./products";
const Products = lazy(()=> import('./products'));



export function SearchPage(){

    const [loading , setLoading] = useState(false);
    const [product , setProduct] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchSearch =async () =>{
            setLoading(true);
           try {
            console.log(query);
            const {data} =await axios.get(`https://ebook-server-4izu.onrender.com/api/search?q=${query}`);
             setProduct(data);
           } catch (error) {
                console.error("error in fetching");
           }finally{
            setLoading(false);
           }
            
        }
        
        if(query) fetchSearch();
    },[query])

    return(
        <>
            <div className="mB">
                
                {
                    loading ? (
                         <div className="d-flex justify-content-center align-items-center mbWish" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
                    ):(
                        <>
                            {
                                product.length === 0 ? (
                                     <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '500px', width: '100%' }}>
                            <Lottie animationData={emptyAnimation} loop={true} style={{ height: '70%', width: '60%' }} />
                            <div className="d-flex flex-column align-items-center gap-3 mt-3">
                                <div className="fw-semibold fs-4">Product Not Found...!</div>
                                <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
                            </div>
                        </div>
                                ):(<>
                                    <p className="text-muted ">Result search for "{ query }"</p>
                                    <ProductList product={product}/>
                                </>
                                )
                            }
                        </>
                    )
                }
                
            </div>
        </>
    )
}