import './header.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { useState } from 'react';
import { CategoryList } from './categoryList';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { RegiserUser } from './register';
// import { Cart } from './cart';
import Loader from './loader';
import { IoCartOutline } from "react-icons/io5";
import axios from 'axios';
import { useUser } from './contextApi/UserContext';
import { IoIosHeartEmpty } from "react-icons/io";
import { useCart } from './contextApi/CartContext';
import { googleLogout } from '@react-oauth/google';
import Spinner from './spinner';
import Coupon from './Coupon';
import { IoHomeOutline } from "react-icons/io5";

const Cart = lazy(()=> import('./cart'));






export function Header(){ 

    const {cartItems , setCartItems} = useCart();

    const {userData , setUserData} = useUser();

    const navigate = useNavigate();

        const [page , setPage] = useState();
        const [rotate , setRotate] = useState(false);
        const [userIcon , setUserIcon] = useState(false);
        const [logout , setLogout] = useState(false);
        const [cartOpen , setCartOpen] = useState(false);
        const [searchValue , setSearchValue] = useState('');
        const [loading , setLoading] = useState(false);
        const [visible , setVisible] = useState(true);
        const prevScrollY = useRef(0);
        let arrowRotate = rotate? 'active' : null;

        const menuref = useRef();

        const handleLogin = () =>{
            setUserIcon(false);
            setLoading(true);
            setTimeout(()=>{
                setLoading(false);
                navigate('/login');
            },2000);
        }
       
        const handleSearch = () =>{
            if(searchValue.trim()){
                navigate(`/searchpage?q=${searchValue}`);
            }
            setSearchValue("");
        }
        const handleOrders = () =>{
            setUserIcon(false);
            navigate('/orders');
        }
  
        const handleEdit = () =>{
            setUserIcon(false);
            navigate('/edit-profile');
        }


        const handleLogout = () =>{
            googleLogout();
            localStorage.removeItem('token');
            setLoading(true);
            setUserIcon(false);
            setCartItems([]);
            setTimeout(()=>{
                navigate('/');
                setLoading(false);
                setUserData('');
                
            },2000)
        };
        
        const handleWishlist = () =>{
            setUserIcon(false);
            navigate('/wishlist');
        }
        const handleHome = () =>{
             setUserIcon(false);
            navigate('/');
        }
        useEffect(()=>{
           
            
                let handler = (e)=>{
                   if(!menuref.current.contains(e.target)){
                        setUserIcon(false);
                   }
                };
                const handleScroll = () =>{
                    const curScrollPos = window.scrollY;
                    console.log("scrool",curScrollPos);
                    
                    if(curScrollPos === 0){
                        setVisible(true);
                    }else if( curScrollPos > prevScrollY.current){
                        setVisible(false);
                    }else{
                        setVisible(true);
                    }
                    prevScrollY.current = curScrollPos;
                    
                };
                handleScroll();
                document.addEventListener("mousedown",handler);
                document.addEventListener("scroll",handleScroll);
                return()=>{
                    document.removeEventListener("mousedown",handler);
                    document.removeEventListener("scroll",handleScroll);
                }

                
        },[]);
        
        const userInfo = localStorage.getItem('token');
            
    return(
    <>
        <Loader loading={loading}/>
        <header className={`container-fluid d-flex justify-content-between align-items-center text-dark py-3 bg-light shadow ${visible? "visible" : "hidden "}`}>
            <div className='d-flex gap-2'>
                <div>
        <a class="navbar-brand" href="/">
      <img src={"Bookturncrop.ico"} alt="brandlogo" width="30" height="28" />
    </a>
    </div>
    <h1 className='text-center fs-3' style={{alignItems:'center'}}>BookTurn.</h1>
    </div>
            <nav className="bg-light ">
            
                {/* <div className=" searchbox d-flex justify-content-between">
                    <div className='fs-6 d-flex align-items-center text-dark text-center px-1 ps-2 fw-semibold  dropbox text-light' style={{cursor:'pointer'}} onClick={()=> {setPage(true);setRotate(true);}}>categories<span className={`m-2 arrow ${arrowRotate} `}><IoIosArrowDown /></span></div>
                    <input type="text" placeholder='search Books name or class...' className='p-3' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}></input>
                    <div className='searchicon fs-2  d-flex align-items-center px-2' onClick={handleSearch}><SearchOutlinedIcon /></div>
                </div> */}
                <div className="search-container d-flex justify-content-between">
      
                    <div className="category-dropdown" onClick={()=> {setPage(true);setRotate(true);}}>
                        <span>Category</span>
                        <span className={`icon arrow ${arrowRotate} `}><IoIosArrowDown /></span>
                    </div>
                    <div className="search-input">
                        <input type="text" placeholder="Search for Books...." value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}/>
                    </div>
                    <div className="search-button " onClick={handleSearch}>
                        <div><SearchOutlinedIcon /></div>
                        
                    </div>
                </div>
            </nav>
            <div className='d-flex justify-content-between align-items-center user-menu'>
                { (!userData) ?
                (<AccountCircleSharpIcon  className='mx-2 fs-2' onClick={()=> setUserIcon(!userIcon)} style={{cursor:'pointer'}}/>):(<div className='bg-warning shadow text-center text-white me-2 d-flex justify-content-center align-items-center edit' onClick={()=> setUserIcon(!userIcon)} style={{width:'30px',height:'34px',borderRadius:'5px',cursor:'pointer'}}> <div className=''>{userData.uname.substring(0,1).toUpperCase() || userData.email.substring(0,1).toUpperCase()}</div></div>)}
                <Link to="/wishlist" className='text-decoration-none text-dark'><IoIosHeartEmpty className='mx-2 text-decoration-none fs-2' /></Link>
                <div className='position-relative' style={{cursor:'pointer'}} onClick={() => setCartOpen(true)}><IoCartOutline className='mx-2 fs-2 fw-semibold' />{ cartItems && <span className='position-absolute   translate-middle qunti px-2  bg-danger border border-light rounded-circle text-white'>{cartItems.length}</span>}</div>
                <div className={ ` user-info bg-light p-4 text-center shadow ${ userIcon? 'active' : 'inactive'  } `} ref={menuref} style={{borderRadius:'10px'}}>
{                       (!userInfo)?  <div className='d-flex justify-content-between align-items-start'><p className='fw-semibold'>New customer?</p><Link to="/register">sign in</Link></div>:<p  className='fw-semibold'> welcome to Bookturn</p>}
                            <ul className='w-100 list-group'>
                            { (userInfo)? <li className='d-flex justify-content-start align-items-center' style={{cursor:'pointer'}} onClick={handleEdit}><FaRegUser className='fs-5 '/><div className=' ms-3 fw-semibold'>Edit profile</div></li>:<li className='d-flex justify-content-start align-items-center'><FaRegUser className='fs-5 '/><div className=' ms-3 fw-semibold'>Edit profile</div></li>}
                                <li className='d-flex justify-content-start align-items-center' style={{cursor:'pointer'}} onClick={handleWishlist}><FaRegHeart className='fs-5 '/><div className=' ms-3 fw-semibold'>Wishlist</div></li>
                                <li className='d-flex justify-content-start align-items-center' style={{cursor:'pointer'}} onClick={handleOrders}><IoBagCheckOutline className='fs-5 '/><div className='fw-semibold ms-3'>Orders</div></li>
                                <li className='d-flex justify-content-start align-items-center' style={{cursor:'pointer'}} onClick={handleHome}><IoHomeOutline className='fs-5 '/><div className='fw-semibold ms-3'>Home</div></li>
                                <hr></hr>
                            </ul>
                            {   (!userInfo)?
                            <Button variant="outlined" size="medium" className='w-100' onClick={()=>{
                                        handleLogin()
                                        }}>Login</Button>:<Button variant="outlined" size="medium" className='w-100' onClick={handleLogout}>Logout</Button>

                                    }
                        </div>
                            </div>
                        </header>
        {
            page && (<CategoryList page={page} setPage={setPage} rotate={rotate} setRotate={setRotate}/>)
        }
        {
            cartOpen && ( <Suspense fallback={<Spinner />}>< Cart cartOpen={cartOpen} setCartOpen={setCartOpen} /> </Suspense>)
        }
       
        
        {/* <div className={ ` user-info bg-light p-4 text-center ${ userIcon? 'active' : 'inactive'  } `} ref={menuref}>
{         (!userInfo)?  <div className='d-flex justify-content-between align-items-start'><p className='fw-semibold'>New customer?</p><Link to="/register">sign in</Link></div>:<p  className='fw-semibold'> welcome to BookLean</p>}
            <ul className='w-100 list-group'>
             { (userInfo)? <li className='d-flex justify-content-start align-items-center' onClick={handleEdit}><FaRegUser className='fs-5 '/><div className=' ms-3 fw-semibold'>Edit profile</div></li>:<li className='d-flex justify-content-start align-items-center'><FaRegUser className='fs-5 '/><div className=' ms-3 fw-semibold'>Edit profile</div></li>}
                <li className='d-flex justify-content-start align-items-center' onClick={handleWishlist}><FaRegHeart className='fs-5 '/><div className=' ms-3 fw-semibold'>Wishlist</div></li>
                <li className='d-flex justify-content-start align-items-center' onClick={handleOrders}><IoBagCheckOutline className='fs-3 '/><div className='fw-semibold ms-3'>Orders</div></li>
                <li className='d-flex justify-content-start align-items-center'><IoSettingsOutline className='fs-3 '/><div className='fw-semibold ms-3'>Setting</div></li>
                <hr></hr>
            </ul>
            {   (!userInfo)?
            <Button variant="outlined" size="medium" className='w-100' onClick={()=>{
                           handleLogin()
                        }}>Login</Button>:<Button variant="outlined" size="medium" className='w-100' onClick={handleLogout}>Logout</Button>

                    }
        </div> */}

    
    </>
    )
}