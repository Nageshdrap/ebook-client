import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import './searchPage.css';
import Products from "./products";



export function SearchPage(){

    const [product , setProduct] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    useEffect(()=>{
        const fetchSearch =async () =>{
           try {
            console.log(query);
            const {data} =await axios.get(`http://127.0.0.1:4500/api/search?q=${query}`);
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
                <Products product={product}/>
            </div>
        </>
    )
}