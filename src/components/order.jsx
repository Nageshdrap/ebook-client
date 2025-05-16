import { useEffect, useState } from 'react';
import './order.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import Lottie from 'lottie-react';
import emptyOrderAnimation from '../animation/emptyorder.json'
import Spinner from './spinner';





const Orders = () =>{

    const [orders , setOrders] = useState([]);
    const [loading , setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const fetchOrders = async () =>{
        setLoading(true);
        try {
             const res = await axios.get('https://ebook-server-4izu.onrender.com/api/getorders',{
            headers:{Authorization:`Bearer ${token}`},
        })
        setOrders(res.data);
        console.log(res.data);
        } catch (error) {
            console.error('fetching error failed', error);
        }finally{
            setLoading(false);
        }
       
    }
    useEffect(() =>{

        if(token){
            fetchOrders();
        }
        window.scrollTo({top:0,behavior:'smooth'});
    },[])


    return(
    <section className="orders">
        <div className='container'>
            {
                loading ? (
                     <div className="d-flex justify-content-center align-items-center mbWish" style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
                ):(
                    <>
                        {orders.length === 0 ? (<>
                             <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '500px', width: '100%' }}>
                            <Lottie animationData={emptyOrderAnimation} loop={true} style={{ height: '70%', width: '60%' }} />
                            <div className="d-flex flex-column align-items-center gap-3 mt-3">
                                <div className="fw-semibold fs-4">Your Orderlist is Empty...</div>
                                <button className="btn btn-primary" onClick={()=>navigate('/')}>Home</button>
                            </div>
                        </div>
                        </>
                
            ) :
            (<>
        
                { orders.map((order) => (
                    <>
                    <Link to={`/orderDetails?order_id=${order._id}`}  style={{textDecoration:'none',color:'black'}}>
                    <div className='d-flex align-items-center shadow'>
                    <div className='py-2 ps-3  mt-2'  >
                    <div className=' fw-semibold text-muted' style={{fontSize:'smaller'}}>Order Id:OD_{order._id}</div>
                    <div> Order Date :{
                        new Date(order.createdAt).toLocaleDateString('en-us',{
                            year:'numeric',
                            month:'long',
                            day:'numeric',
                            timeZone:'UTC'
                        })
                        }</div>
                        <div className='d-flex  gap-3 mt-2 '>
                            {
                                order.items?.map((list) =>(
                                    <div style={{width:'60px' , height:'55px'}} key={list.productId._id}>
                                        <img src={list.productId.images?.[0]} alt="book" className="img-fluid" style={{width:'100%',height:'100%'}}/>
                                    </div>
                                ))
                            }
                           
                        </div>
                        <div className='mt-2'>
                            Order status: <span className='ms-1 text-success fw-semibold'>{order.orderStatus}</span>
                        </div>
                    </div>
                    <div className='text-center'>
                    <FaAngleRight className='fs-2'/>
                    </div>
                    </div>
                    </Link>
                   </>
                ))
               
            }  
            </>)
}
                    </>
                )
            }
            
        </div>
    </section>)
}


export default Orders;