import './footer.css';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () =>{

    return(
        <footer className='mt-3'>
            <div className="container-fluid  text-white pt-4">
                <div className="row ">
                    <div className="col-xs-12 col-sm-12 col-md-4 text-center">
                    <div>
                        <h3>BookLean</h3> 
                    </div>
                    <div className='d-flex justify-content-evenly m-auto mb-3 w-50 'style={{fontSize:'25px'}}>
                        <div className=''><FaFacebook /></div>
                        <div><FaInstagram /></div>
                        <div><FaTwitter /></div>
                    </div>
                    <div className="search-container1 container">
                        <div className="input-wrapper1">
                            <input type="text" placeholder="Email" className="search-input1" />
                        </div>
                        <button className="search-button1">Login</button>
                    </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4">
                        <h3 className='text-center'>Contact Us</h3>
                        <div className='d-flex flex-column align-items-center'>
                            <div><span className='me-3' style={{fontSize:'25px'}}><FaLocationDot /></span>Gandhi nagar,s-11,Berhampur</div>
                            <div><span className='me-3' style={{fontSize:'25px'}}><MdOutlineMail /></span>NAGESHACHARY2@gmail.com</div>
                            <div className='text-start'><span className='me-3 ' style={{fontSize:'25px'}}><FaWhatsapp /></span>+91 9692331146</div>
                        </div>
                    </div>
                    <div className="col">
                        
                    </div>
                </div>
               
               
            </div>
            <div className='footer-bottom mt-2 bg-dark text-white text-center p-2'>
                    <div className="brand fw-bold " style={{fontSize:'1.2rem', color:'#3498db'}}>BookLean</div>
                    <div className='copyright ' style={{fontSize:'smaller'}}>&copy;2025 All rights reserved</div>
                </div>
        </footer>
    )
}

export default Footer;