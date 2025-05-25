import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import VerticalProgressBar from "./verticalprogressBar";
import Spinner from "./spinner";



const OrderDetails = () =>{
    const [pro , setPro] = useState([]);
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get("order_id");
    const token = localStorage.getItem("token");
    const [orderSteps , setOrderSteps] = useState([]);
    const [orderData , setOrderData] = useState(null);
    const [orderStatus , setOrderStatus] = useState(false);
    const [loading , setLoading] = useState(false);
    
    const navigate = useNavigate();
    const fetchOrderDetails = async (id) =>{
        setLoading(true);
        try {
            console.log("token", token);
            const orderId = id;
            console.log(orderId);
            const res = await axios.get(`https://ebook-server-4izu.onrender.com/api/getorderDetails/${orderId}`,{
                headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
            })
            setPro(res.data);
            setOrderData(res.data);
            const status =res.data.orderStatus;
            const possibleSteps = [
                "processing",
                "shipped",
                "Out for Delivery",
                "Delivered"
            ];

            const updatedSteps = possibleSteps.map((steps) => ({
                label:steps,
                completed:possibleSteps.indexOf(steps) <= possibleSteps.indexOf(status),
            }));

            setOrderSteps(updatedSteps);

        } catch (error) {
            console.error("fetching failled");
        }finally{
            setLoading(false);
        }
       
    }

    useEffect(()=>{
        if(token){
            fetchOrderDetails(orderId);
            window.scrollTo({top:0,behavior:'smooth'});
        }
        
    },[])

    return(
    <>
     {
                    loading ? (
                         <div className="d-flex justify-content-center align-items-center " style={{ minHeight: '400px' }}>
          <Spinner />
        </div>
                    ):
                    (
                        <>

                            <div className="container">
            <div className="mt-5">
               
                <div className="bg-light mb-3 py-2 px-2">OrderId: <span className="ms-2">OD_
                    {
                        pro._id
                    }</span>
                </div>
                {
                    pro.items?.map((item,index)=>(
                        <>
                        <div className="d-flex gap-2" key={index}>
                           <div>
                            <div>
                           {
                                item.productId.tittle
                            }
                            </div>
                            <div className="mt-3">Qty:
                                {
                                    item.quantity
                                }
                            </div>
                            <div>Price:
                            {
                                    item.price
                                }
                            </div>
                           </div>
                           <div style={{width:'130px',height:'90px'}}>
                            {
                                <img src={item.productId.images[0]} alt="" onClick={()=>{navigate(`/productDetails?pid=${item.productId._id}`)}} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                            }
                           </div>
                        </div>
                        <hr />
                        </>
                    ))
                }
            </div>
            <div className="row gap-2 mt-3">
                <div className="col-sm-12 col-md-4">
                    <div className="card shadow ">
                        <div className="d-flex justify-content-between px-3 py-2" onClick={()=>setOrderStatus(!orderStatus)}><div className=" fs-5 fw-semibold">Order status</div><div style={{color:'green'}}>< FaAngleDown /></div></div>
                        
                        
                        <div className={`bg-light px-2 py-2 ${orderStatus ? "d-block" : "d-none"}`}>
                            { pro  &&
                            <VerticalProgressBar steps={orderSteps} timestamps={pro.timestamps} />}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 ">
                    <div className="card shadow">
                    <div className="d-flex justify-content-between px-3 py-2 text-center"><div className=" fs-5 fw-semibold">Payment Details</div><div>< FaAngleDown /></div></div>
                    
                    </div>
                </div>
            </div>
        </div>
                        </>
                    )
                }
        
    </>
    )
}

export default OrderDetails;