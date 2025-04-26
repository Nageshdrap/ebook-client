import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Grid2, Box ,Stack } from '@mui/material';
import { palette } from '@mui/material';
import { Button } from '@mui/material';
import Loader from "./loader";


// import Products from "./products";
const Products = lazy(()=> import('./products'));









export function ProductDisplay(){

    let [product,setproduct] = useState([]);
    let [arrayKeywords, setArrayKeywords] = useState([]);

       async function LoadProducts(){
           await axios.get('https://ebook-server-4izu.onrender.com/api/product')
            .then(Res =>{
                setproduct(Res.data);
               
            });
        }

            useEffect(()=>{
                LoadProducts();
                window.scrollTo({top:0,behavior:'smooth'});
            },[])
            
 

    return(
        <>
        <Suspense fallback={<Loader loading={true}/>}>
            <Products product={product} />
        </Suspense>
        </>
    )

}