import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Grid2, Box ,Stack } from '@mui/material';
import { palette } from '@mui/material';
import { Button } from '@mui/material';
import Loader from "./loader";
import Pagination from "./pagination";


// import Products from "./products";
const Products = lazy(()=> import('./products'));









export function ProductDisplay(){

    let [product,setproduct] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(1);
    const [seed , setSeed] = useState(Math.random().toFixed(2));
    let [arrayKeywords, setArrayKeywords] = useState([]);

       async function LoadProducts(){
           await axios.get(`https://ebook-server-4izu.onrender.com/api/product?page=${page}?seed=${seed}`)
            .then(Res =>{
                setproduct(Res.data.products);
               setTotalPage(Res.data.totalPage);
               setSeed(Res.data.seed);
            });
        }

            useEffect(()=>{
                LoadProducts();
                window.scrollTo({top:0,behavior:'smooth'});
            },[page])
            
 

    return(
        <>
        <Suspense fallback={<Loader loading={true}/>}>
            <Products product={product} />
            <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        </Suspense>
        </>
    )

}