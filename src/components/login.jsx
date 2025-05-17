import { TextField, Box, Button, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import './logpage.css';
import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contextApi/UserContext";
import { useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(IoEyeOffOutline);

  // Toggle password visibility
  function handleIcon() {
    if (type === 'password') {
      setType('text');
      setIcon(IoEyeOutline);
    } else {
      setType('password');
      setIcon(IoEyeOffOutline);
    }
  }

  // Manual Google Login button handler
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("https://ebook-server-4izu.onrender.com/api/auth/google", {
          credential: tokenResponse.access_token,
        });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          login();
          navigate('/');
        }
      } catch (err) {
        console.error("Google login error:", err);
      }
    },
    onError: () => {
      console.error('Google Login Failed');
    },
    flow: 'implicit',
  });

  // Google One Tap Login
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const res = await axios.post("https://ebook-server-4izu.onrender.com/api/auth/google", {
          credential: credentialResponse.credential,
        });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          login();
          navigate('/');
        }
      } catch (error) {
        console.error('One Tap Login Failed:', error);
      }
    },
    onError: () => {
      console.error('One Tap Login Error');
    },
  });

  // Formik setup for email/password login
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (user) => {
      const res = await axios.post('https://ebook-server-4izu.onrender.com/api/login', user);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        login();
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
        <div className="d-flex flex-column justify-content-center p-4 shadow bg-body-tertiary logpage">
          <div className="d-flex gap-3 align-items-center m-auto mb-4">
            <img src="Bookturncrop.ico" alt="logo" width="35" height="30" />
            <h1 className="fs-3 fw-semibold">𝙱𝚘𝚘𝚔𝚝𝚞𝚛𝚗</h1>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
              <TextField
                fullWidth
                required
                type="text"
                name="email"
                label="Email or Number"
                variant="outlined"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>

            <Box sx={{ width: 500, maxWidth: '100%' }} className="mb-3">
              <TextField
                fullWidth
                required
                type={type}
                name="password"
                label="Password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" onClick={handleIcon} style={{ cursor: "pointer" }}>
                      {icon}
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Button
              sx={{ width: 500, maxWidth: '100%' }}
              size="medium"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>

          <hr className="mb-1" />

          <p style={{ fontSize: 'smaller' }}>
            Don't have an account?
            <Link to='/register' className="ms-3" style={{ textDecoration: 'none' }}>Sign up</Link>
          </p>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FaGoogle />}
            onClick={loginWithGoogle}
            sx={{
              mt: 2,
              borderColor: '#ccc',
              color: '#333',
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#aaa',
              },
            }}
          >
            Sign in with Google
          </Button>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          transition={Bounce}
          theme="dark"
          hideProgressBar={true}
        />
      </div>
    </>
  );
}
