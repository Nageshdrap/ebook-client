import axios from "axios";
import { useEffect, useState } from "react";





const AdminOrders = () =>{

    const [orders , setOrders] = useState([]);
    const [orderList , setOrderList] = useState("");

    const orderStatusUpdate = async (id , newStatus) =>{
       try {
        const order_id = id;
        console.log(order_id,"nhm")
         await axios.put(`https://ebook-server-4izu.onrender.com/api/updateAdminOrder/${order_id}`, {status:newStatus});
        fetchOrders();
       } catch (error) {
         console.log("error at frontend")
       }
    }

    // const orderStatus = [{id:1,lable:'processing',value:'processing'},
    //     {id:2,lable:'shipped',value:'shipped'},
    //     {id:3,lable:'Out for Delivery',value:'Out for Delivery'},
    //     {id:4,lable:'Delivered',value:'Delivered'},
    //     {id:5,lable:'cancelled',value:'cancelled'},
    // ];

    const orderStatus = ["processing","shipped" , "Out for Delivery","Delivered","cancelled"];

    const fetchOrders =async () =>{
        const res = await axios.get('https://ebook-server-4izu.onrender.com/api/adminorders');
        setOrders(res.data);
        console.log(res.data);
    }

    useEffect(()=>{
        fetchOrders();
    },[]);

    return(
        <>
            <div className="container-fluid">

                <table className="table table-striped table-hover">
                    <thead className="position-sticky top-0">
                        <tr className="">
                            <th>User Id</th>
                            <th>Order Id</th>
                            <th>Razorpay orderId</th>
                            <th>payment Method</th>
                            <th>payment status</th>
                            <th>product</th>
                            <th>order status</th>
                            <th>Address</th>
                            <th>Grand Amount</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length === 0 ? (<tr className="text-center "><td colSpan="10">Order List is Empty</td></tr>) :(
                                orders.map((order)=>(
                                    <tr key={order._id}>
                                        <td>{order.userId}</td>
                                        <td>{order._id}</td>
                                        <td>{order.razorpayOrderId}</td>
                                        <td>{order.paymentmethod}</td>
                                        <td>{order.paymentStatus}</td>
                                        <td>{
                                                order.items?.map((item)=>(
                                                    <div key={item._id}>
                                                        <img src={item.productId.images[0]} alt="" width="170px" height="120px"/>
                                                        <div>Tittle: <p className="m-0">{item.productId.tittle}</p></div>
                                                        <div>Qty:{item.quantity}</div>
                                                        <div>price:{item.price}</div>
                                                    </div>
                                                ))
                                            }
                                        </td>
                                        <td>
                                            <select name="" id="" value={order.orderStatus}  onChange={(e)=>orderStatusUpdate(order._id , e.target.value)}>
                                                {
                                                    orderStatus.map((option) =>(
                                                        <option value={option}>{option}</option>
                                                    ))                                       
                                                }                                                
                                            </select>
                                        </td>
                                        <td>
                                            <div>Address:{order.shipping.address}</div>
                                            <div>city:{order.shipping.city}</div>
                                            <div>Dist:{order.shipping.dist}</div>
                                            <div>Phone:{order.shipping.phone}</div>
                                            <div>pincode:{order.shipping.pincode}</div>
                                            <div>State:{order.shipping.state}</div>
                                        </td>
                                        <td>
                                            <div>Grand Amount:{order.grandAmount}</div>
                                        </td>
                                        <td>
                                            <div>Date:{new Date(order.createdAt).toLocaleDateString('en-us',{
                                                year:'numeric',
                                                month:'long',
                                                day:'numeric',
                                                timeZone:'UTC'
                                            })}</div>
                                        </td>
                                        
                                    </tr>
                                ))
                            )

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default AdminOrders;