import { TextField,fullWidth,Box,Button} from "@mui/material";
import './logpage.css';
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { InputAdornment } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import React from "react";
import  axios  from "axios";
import * as yup from 'yup';

export function RegiserUser(){

    const [type, setType] = useState('password');
    const[icon,setIcon] = useState(IoEyeOffOutline);
    const [ctype, setcType] = useState('password');
    const[cicon,setcIcon] = useState(IoEyeOffOutline);
    const navigate = useNavigate();


    function handleIcon(){

        if(type === 'password'){
            setType('text');
            setIcon(IoEyeOutline);
        }else{
            setType('password');
            setIcon(IoEyeOffOutline);
        }
    }
    function handleCicon(){

        if(ctype === 'password'){
            setcType('text');
            setcIcon(IoEyeOutline);
        }else{
            setcType('password');
            setcIcon(IoEyeOffOutline);
        }
    }
   
        const formik = useFormik({
           initialValues:{
            uname:'',
            email:'',
            phone:'',
            password:'',
            cpassword:''
           },
           validationSchema:yup.object({
            uname:yup.string().required('user name must required').min(4,'user name should have morethan 4 charector'),
            email:yup.string().lowercase().email().required('Email id must required'),
            phone:yup.number().typeError("That doesn't look like a phone number").required('A phone number is required').min(8).integer('A phone number canot include decimal part'),
            password:yup.string().required('password should required').min(4,'password must have morethan 4 charecter'),
            cpassword:yup.string().oneOf([yup.ref('password'),null],'Both password should match')
           }),
           onSubmit:(users) => {
            console.log(users);
           const login = axios.post(`http://127.0.0.1:4500/api/register`,users);
            navigate('/login');
           }
           
          
        });
       

       

        return(
            <>
                <div className="container d-flex justify-content-center  align-items-center  " style={{width:'100vw',height:'100vh'}}>
                <div className="d-flex flex-column justify-content-center p-4 bg-body-tertiary logpage" >
                    <form method="post" onSubmit={formik.handleSubmit} >
                <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                        <TextField  type="text" fullWidth  id="fullWidth outlined-basic" name="uname" label="User Name" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.uname}/>
                        {formik.touched.uname && formik.errors.uname ?
                        <div className="text-danger">
                        {
                            formik.errors.uname
                        }
                    </div>:null
}
                    </Box>
                    
                    <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                        <TextField fullWidth type="text" id="fullWidth outlined-basic"  name="email" value={formik.values.email} label="Email or Number" variant="outlined"  autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ?
                        <div className="text-danger">
                        {
                           formik.errors.email
                        }
                        </div>:null
}
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                        <TextField fullWidth type="text" id="fullWidth outlined-basic"  name="phone" value={formik.values.number} label="Number" variant="outlined"  autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.phone && formik.errors.phone ?
                        <div className="text-danger">
                        {
                           formik.errors.phone
                        }
                        </div>:null
}
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                    <TextField fullWidth type={type} id="fullWidth outlined-basic" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}  name="password" label="Password" variant="outlined"    slotProps={{  input: {
            endAdornment: (
              <InputAdornment position="end" onClick={handleIcon} style={{cursor:"pointer"}}>
                {icon } 
              </InputAdornment>
            ),
          },
        }}/>
        <div className="text-danger">{
            }</div>
                    </Box>
                    <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
                        <TextField fullWidth type={ctype} id="fullWidth outlined-basic" value={formik.values.cpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="cpassword" label="confirm Password" variant="outlined"    slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" onClick={handleCicon} style={{cursor:"pointer"}}>
                {cicon } 
              </InputAdornment>
            ),
          },
        }}/>
        <div className="text-danger">{formik.errors.cpassword}</div>
                       
                    </Box> 
                    <Button sx={{ width: 500, maxWidth: '100%' }} size="medium" variant="contained" type="submit">Register</Button>
                    <hr width="100%"/>
                    <div className="container d-flex justify-content-between ">
                        <span className="text-muted">you have an account?</span>
                        <Button variant="outlined" size="medium" onClick={()=>{
                            navigate('/login');
                            console.log('clicked');
                        }}>Login</Button>

                    </div>
                    </form>
                </div>

                </div>
            </>
        )
}





