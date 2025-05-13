import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Grid2, Box ,Stack } from '@mui/material';
import { palette } from '@mui/material';
import { Button } from '@mui/material';
import Loader from "./loader";
import Pagination from "./pagination";
import Spinner from "./spinner";


// import Products from "./products";
const Products = lazy(()=> import('./products'));









export function ProductDisplay(){

    let [product,setproduct] = useState([]);
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(1);
    const [seed , setSeed] = useState(Math.random().toFixed(2));
    let [arrayKeywords, setArrayKeywords] = useState([]);
    const [loading,setLoading] = useState(false);

       async function LoadProducts(){
        setLoading(true)
        try {
            await axios.get(`https://ebook-server-4izu.onrender.com/api/product?page=${page}?seed=${seed}`)
            .then(Res =>{
                setproduct(Res.data.products);
               setTotalPage(Res.data.totalPage);
               setSeed(Res.data.seed);
            });
        } catch (error) {
            console.log('error fetching', error);
        }finally{
            setLoading(false);
        }
           
        }

            useEffect(()=>{
                LoadProducts();
                window.scrollTo({top:0,behavior:'smooth'});
            },[page])
            
 

    return(
        <>
        {
            loading ? (
                 <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '400px' }} // Reserve height to prevent footer jump
        >
                <Spinner />
                </div>
            ):(
                <Suspense fallback={<Loader loading={true}/>}>
            <Products product={product} />
            <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        </Suspense>
            )
        }
        
        </>
    )

}