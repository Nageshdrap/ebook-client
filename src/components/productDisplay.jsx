import axios from "axios";
import { useEffect, useState } from "react";
import { Grid2, Box ,Stack } from '@mui/material';
import { palette } from '@mui/material';
import { Button } from '@mui/material';


import Products from "./products";









export function ProductDisplay(){

    let [product,setproduct] = useState([]);
    let [arrayKeywords, setArrayKeywords] = useState([]);

       async function LoadProducts(){
            axios.get('https://ebook-server-4izu.onrender.com/api/product')
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
            <Products product={product} />
        </>
    )

}