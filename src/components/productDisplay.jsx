import axios from "axios";
import { useEffect, useState } from "react";
import { Grid2, Box ,Stack } from '@mui/material';
import { palette } from '@mui/material';
import { Button } from '@mui/material';


import Products from "./products";









export function ProductDisplay(){

    let [product,setproduct] = useState([]);
    let [arrayKeywords, setArrayKeywords] = useState([]);

        function LoadProducts(){
            axios.get('http://127.0.0.1:4500/api/product')
            .then(Res =>{
                setproduct(Res.data);
               
            });
        }

            useEffect(()=>{
                LoadProducts();
                
            },[])
            
 

    return(
        <>
            <Products product={product} />
        </>
    )

}