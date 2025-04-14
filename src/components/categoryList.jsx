
import React, { useEffect } from 'react';

import { useState } from 'react';
import './categoryList.css';
import CloseIcon from '@mui/icons-material/Close';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { useRef } from 'react';
import axios from 'axios';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";



export function CategoryList( {page , setPage ,setRotate , rotate}){

    const sideMenu = useRef();
     
    const [category , setCategory] = useState([]);
    const [subCategory , setSubcategory] = useState([]);

    const [activeMenu , setActiveMenu] = useState(null);
    const [submenuClose , setSubmenuClose] = useState('active');

    const handleSubmenuClose = () =>{
        setSubmenuClose('inactive');
        setActiveMenu(null);
    }

    useEffect(()=>{

        const handler = (e) =>{
            if(!sideMenu.current.contains(e.target)){
                handleClose();
            }

        };
        if(page){
            document.addEventListener("mousedown",handler);
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }else{
            document.body.style.position = '';
            document.body.style.width = '';
        }
                return()=>{
                    document.removeEventListener("mousedown",handler);
                    document.body.style.position = '';
                    document.body.style.width = '';
                }


    },[page])

    function handleClose(){
        setPage('');
        setRotate(false);
    }

    useEffect(()=>{
        const fecthCategory = axios.get('https://ebook-server-4izu.onrender.com/api/category').then(res => res.data);
        const fecthSubCategory = axios.get('https://ebook-server-4izu.onrender.com/api/subcategory').then(res => res.data);
        
        Promise.all([fecthCategory , fecthSubCategory])
        .then(([categoryData , subCategoryData]) =>{
            setCategory(categoryData);
            setSubcategory(subCategoryData);
            
        })
        .catch((error)=>{
            console.error('erroe in fetching data', error);
        })
        
    },[])
    const handleMenu = (id) =>{
        setActiveMenu(activeMenu === id ? null : id);
    }
    
    return(
       <>
            {/* { (page) &&
            <div className='sidemenu ' >
                <div className=" list py-4" ref={sideMenu}>
                   
                    <span data-bs-dismiss="model" className='btn-close cross' style={{cursor:'pointer'}} onClick={handleClose} ></span>
                    <div className='mt-5'>
                    {
                        category.map((item) =>(
                            <div key={item._id} className=''>
                                <div className='ms-4 p-3 fs-2' onClick={()=>{handleMenu(item._id);setSubmenuClose('active')}} style={{cursor:'pointer',borderTop:'0.5px solid #a3a0a0'}}>{item.name}</div>
                                
                                { activeMenu === item._id && (
                                    <div className={`submenu ${submenuClose}`}>
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <div className='fs-3 p-1' style={{border:'2px solid green',width:'max-content'}} onClick={handleSubmenuClose}><FaAngleDoubleLeft className='m-2'/></div>
                                            <div className='fs-1 ms-5'>{item.name}</div>
                                        </div>
                                        <hr />
                            <ul style={{listStyle:'none',padding:0,margin:0}} >
                                {
                                    subCategory.filter( sub => sub.category === item._id).map(sublist =>(
                                        <li className='py-2 mt-2 ps-4 fs-4 ' style={{borderBottom:'0.5px solid #a3a0a0'}}  key={sublist._id}>{sublist.name}</li>
                                        
                                    ))
                                }
                            </ul>
                            </div>
                                )}
                            </div>
                            
                            
                        ))
                    }
                   </div>
                   <div className='sub-footer m-3'>
                    <div className='d-flex justify-content-between'>
                    <div><FaFacebookSquare className='' style={{fontSize:'45px'}}/></div>
                   <div><FaInstagram className='' style={{fontSize:'45px',cursor:'pointer'}}/></div>
                   </div>
                   </div>
                  </div>
            </div>} */}
            {
               page && 
                <>
                    <div className="overlays"></div>
                    <div className="categorymenu p-3" ref={sideMenu}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-center fw-semibold"><h2>C A T E G O R Y</h2></div>
                            <div className='fs-3 p-1' style={{border:'2px solid green',width:'max-content',cursor:'pointer'}} onClick={handleClose} ><FaAngleDoubleLeft className='m-1'/></div>
                        </div>
                            <hr />
                        <div>
                        {
                        category.map((item) =>(
                            <div key={item._id} className=''>
                                <div className='ms-4 p-3 fs-2' onClick={()=>{handleMenu(item._id);setSubmenuClose('active')}} style={{cursor:'pointer',borderBottom:'0.5px solid #a3a0a0'}}>{item.name}</div>
                                
                                { activeMenu === item._id && (
                                    <div className={`submenu ${submenuClose}`}>
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <div className='fs-3 p-1' style={{border:'2px solid green',width:'max-content'}} onClick={handleSubmenuClose}><FaAngleDoubleLeft className='m-2'/></div>
                                            <div className='fs-1 ms-5'>{item.name}</div>
                                        </div>
                                        <hr />
                            <ul style={{listStyle:'none',padding:0,margin:0}} >
                                {
                                    subCategory.filter( sub => sub.category === item._id).map(sublist =>(
                                        <li className='py-2 mt-2 ps-4 fs-4 ' style={{borderBottom:'0.5px solid #a3a0a0'}}  key={sublist._id}>{sublist.name}</li>
                                        
                                    ))
                                }
                            </ul>
                            </div>
                                )}
                            </div>
                            
                            
                        ))
                    }
                        </div>
                        </div>
                </>
            }
        </>
    )
}