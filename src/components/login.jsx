import { TextField,fullWidth,Box,Button} from "@mui/material";

import { Link, Navigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import './logpage.css';
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { NavBar } from "./nav2";
import Cookies from "js-cookie";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useUser } from "./contextApi/UserContext";
import { GoogleLogin , useGoogleOneTapLogin } from '@react-oauth/google';


export function Login({clientId}){

    const {login}= useUser();

    const navigate = useNavigate();

        const [type, setType] = useState('password');
        const[icon,setIcon] = useState(IoEyeOffOutline);
        const [user , setUser ] = useState(null);
        
        const handleGoogleSuccess = async (credentialResponse) =>{
            try {
                const res = await axios.post("https://ebook-server-4izu.onrender.com/api/auth/google",{
                    credential:credentialResponse.credential,
                })
                if(res.data.success){
                    localStorage.setItem('token', res.data.token);
                    login();
                    navigate('/');
                }
            } catch (error) {
                
            }
        }

     

        function handleIcon(){
        
                if(type === 'password'){
                    setType('text');
                    setIcon(IoEyeOutline);
                }else{
                    setType('password');
                    setIcon(IoEyeOffOutline);
                }
            }

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: async (user)=>{
        
           const res = await axios.post('https://ebook-server-4izu.onrender.com/api/login',user);
           
            if(res.data.success){
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                login();
                navigate('/');
            }else{
                toast.error(res.data.message);
                
            }
            
               
                
       
           
        }
    })


    return(
        <>
        
        <div className="container d-flex justify-content-center  align-items-center  " style={{width:'100vw',height:'100vh'}}>
        <div className="d-flex flex-column justify-content-center  p-4 shadow bg-body-tertiary logpage" >
            <form method="post" onSubmit={formik.handleSubmit} >
       
            
            <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                <TextField fullWidth type="text" id="fullWidth outlined-basic" required name="email" value={formik.values.email} label="Email or Number" variant="outlined"  autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                
            </Box>
            <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
            <TextField fullWidth type={type} id="fullWidth outlined-basic" required onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}  name="password" label="Password" variant="outlined"    slotProps={{  input: {
    endAdornment: (
      <InputAdornment position="end" onClick={handleIcon} style={{cursor:"pointer"}}>
        {icon } 
      </InputAdornment>
    ),
  },
}}/>

            </Box>
            
            <Button sx={{ width: 500, maxWidth: '100%' }} size="medium" variant="contained" type="submit">Login</Button>
            
            </form>
            <div>
                 <hr />
            </div>
            
            <GoogleLogin
                width="100%"
                onSuccess={handleGoogleSuccess}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap={false}
  flow="auth-code"
  redirectUri="https://booklean.in"
/>
        </div>
            <ToastContainer position="bottom-center" autoClose={2000} transition={Bounce} theme="dark" hideProgressBar={true}/>
        </div>
    </>
    )
}