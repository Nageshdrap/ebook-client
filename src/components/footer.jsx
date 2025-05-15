import './footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useUser } from './contextApi/UserContext';

const Footer = () =>{

    const navigate = useNavigate();
    const {login} = useUser();

    const [userData , setUserData] = useState({
        bookname:'',
        deptname:'',
        number:''
    });
    const [userLogin ,setUserLogin] = useState({
        email:''
    });
    const [emailError,setEmailError] = useState('');

    const UserInfo = (e) =>{
        setUserData({...userData , [e.target.name]:e.target.value});
    };

    const handleFotterSubmit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if(token){
                toast.success('you already logged in');
            }else{
                if(!userLogin.email){
                    setEmailError('Email is required');
                    return;
                }
                if(!emailError){
                    const res = await axios.post('https://ebook-server-4izu.onrender.com/api/easylogin',userLogin);
                    if(res.data.success){
                        toast.success('Logged in successful');
                        localStorage.setItem('token',res.data.token);
                        login();
                        navigate('/');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }else{
                        toast.error(res.data.message);
                    }
                }
            }
        } catch (error) {
            console.error('logged in failed');
        }
    }

    const handleUserInfo = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('https://ebook-server-4izu.onrender.com/api/send-email',userData);
            if(res.data.success){
                toast.success('message sent successfully',{
                    autoClose: 2000
                });
            setUserData({
                bookname:'',
                deptname:'',
                number:''
            });
            }
        } catch (error) {
            toast.error('failed to send message',{
                autoClose: 2000
            });
        }
    }

    return(
        <>
        <footer className='mt-3'>
            <div className="container-fluid  text-white pt-4">
                <section id='Blog'>
                    <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center">
                    <div>
                        <h1 className=''>BookTurn</h1> 
                    </div>
                    <div className='d-flex justify-content-evenly m-auto mb-3 w-50 'style={{fontSize:'25px'}}>
                        <div className=''><FaFacebook /></div>
                        <a href="https://www.instagram.com/bookturn_?utm_source=qr&igsh=MWxoYmE1ZTRrZ3RjNA=="><div><FaInstagram /></div></a>
                        <div><FaTwitter /></div>
                    </div>
                    <form onSubmit={handleFotterSubmit}>
                    <div className="search-container1 container">
                        <div className="input-wrapper1">
                            <input type="text" placeholder="Email" name='email' onChange={(e)=>{
                                const value = e.target.value;
                                setUserLogin({...userLogin,[e.target.name]:value});
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if(!emailRegex.test(value)){
                                    setEmailError('Please enter a valid email address');
                                }else{
                                    setEmailError('');
                                }
                            }
                                
                            } className="search-input1" />
                            {
                                emailError && (
                                    <p className="mb-0 fw-semibold" style={{color:'red',fontSize:'12px',marginTop:'4px'}}>{emailError}</p>
                                )
                            }
                        </div>
                        <button className="search-button1" type='submit'>Login</button>
                    </div>
                    </form>
                    </div>
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                         <form className='footerform' onSubmit={handleUserInfo}>  
                        <div className='mb-2'>
                   <label for="inputPassword5" class="form-label fw-semibold">If any book required just tell us..</label>
                        <input type="text" id="inputPassword5" name='bookname' value={userData.bookname} onChange={UserInfo} class="form-control" aria-describedby="passwordHelpBlock" placeholder='Book name...'/>
                        </div> 
                        <div className='mb-2'>
                        <input type="text" id="inputPassword5" name='deptname' value={userData.deptname} onChange={UserInfo} class="form-control" aria-describedby="passwordHelpBlock" placeholder='Deparment/stream/year...'/>
                        </div>
                        <div className='mb-2 d-flex gap-2'>
                        <input type="text" id="inputPassword5" name='number' value={userData.number} class="form-control" onChange={UserInfo} aria-describedby="passwordHelpBlock" placeholder='Mobile number/Whatsup number'/>
                        <input type="submit" className='btn  btn-success w-100'/>

                        </div>  
                        </form> 
                        </div>
                        <div className="col-md-3 col-lg-3 footerlist text-center">
                            <img src={"Bookturncrop.png"} alt="logo" className='footerlogo'/>
                        </div>
                    </div>
                </section>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-5 col-lg-5">
                    <h2 className=''>Links</h2>
                            <hr className='text-danger  mb-1' style={{border:'2px solid white'}}/>
                            <div className='footerlistitem'>
                            <Link to="/" className='text-light' style={{textDecoration:'none'}}><li>Home</li></Link>
                            <li>Wishlist</li>
                            <li>Cart</li>
                            <li>Blog</li>
                            <li>Contact Us</li>
                            </div>
                    </div>
                   <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 '>
                   <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button fw-semibold bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            What is Bookturn?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>Bookturn </strong> is an online bookstore where you can discover, explore, and purchase books across a wide range of genres. Whether you're into fiction, non-fiction, academic reads, or the latest bestsellers, Bookturn offers a seamless shopping experience with curated selections, secure checkout, and fast delivery — all from the comfort of your home.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button fw-semibold collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        How Bookturn helps reader?
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <strong>Bookturn.</strong>  helps readers by making book discovery simple and enjoyable. We offer personalized recommendations, detailed book descriptions, and reader reviews to help you find your next great read. Whether you're a student, a casual reader, or a bookworm, Bookturn connects you with the right books — all while saving you time and effort with a smooth online shopping experience.
                                    </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                    <button class="accordion-button fw-semibold collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Why should I choose Bookturn over other bookstores?
                                    </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <strong>Bookturn</strong>  is built with readers in mind. We focus on quality, affordability, and convenience. With competitive prices, exclusive deals, and a user-friendly interface, we make it easier for you to find and enjoy the books you love. Plus, our responsive support and fast delivery mean you can shop with confidence every time.
                                    </div>
                                    </div>
                                </div>
                            </div>
                      
                   </div>
                   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">

                   </div>
                </div>
               
               
            </div>
            <div className='footer-bottom mt-2 bg-dark text-white text-center p-2'>
                    <div className="brand fw-bold " style={{fontSize:'1.2rem', color:'#55e11a'}}>BookTurn</div>
                    <Link to='/term'style={{textDecoration:'none'}}><div className='text-light'><span className='me-2'>Term & condition</span>/<span className='ms-2'>Policy</span></div></Link>
                    <div className='copyright' style={{fontSize:'smaller'}}>&copy;2025 All rights reserved</div>
                </div>

        </footer>

        </>
    )
}

export default Footer;