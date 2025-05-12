import axios from "axios";
import { Cart } from "./cart";
import { ProgressBar } from "./progressBar";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import './placeorder.css';
import { color } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import Coupons from "./coupons";




export function PlaceOrder(){

    const navigate = useNavigate();

    const [step ,setStep] = useState(0);
    const [selectedOption , setSelectedOption] = useState("cash");
    const [cartItem , setCartItem] = useState(null);
    const [loading , setLoading] = useState(false);
    const [coupon , setCoupon] = useState("");
    const [total , setTotal] = useState(0);
    const [couponData , setCouponData] = useState("");
    const [phoneError , setPhoneError] = useState("");
    const [pincodeError,setPincodeError] = useState("");

    const [shippingCharge, setShippingCharge] = useState(0);
    const freeShippingPincodes = ["760001","760002","760004","760005","760008","760009","760010"];
    const extraShippingCharge = 25;
    const [orderData , setOrderData] = useState({
        shipping:{
            address:"",
            state:"",
            dist:"",
            city:"",
            phone:"",
            pincode:""
        },payment:{
            method:""
        },
        items:[]
    });
    const [checkInput , setCheckInput] = useState({checkbox1:false , checkbox2:false});
    

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            handleCoupon();
        }
    }

    const handleCoupon =async () =>{
        if(coupon){
        const res = await axios.post('https://ebook-server-4izu.onrender.com/api/coupon',{couponCode:coupon , totalCost:total});
        // setCouponData(res.data);
        // toast.error(res.data.msg);
        if(res.data.success){
            setCouponData(res.data);
            toast.success(res.data.msg);
            console.log(res.data);
        }else{
            setCoupon(" ");
            toast.error(res.data.msg);
        }
    }else{
        toast.error('required coupon code');
    }
    }



    const fetchCart = async () =>{
        try {
            
            const { data } = await axios.get('https://ebook-server-4izu.onrender.com/cart/cartitems',{
                headers:{Authorization : `Bearer ${localStorage.getItem("token")}`},
            });
            setCartItem(data.cart.items || []);
            setTotal(data.total);
            console.log(" on page ", data.items);
        } catch (error) {
            console.error("fetch cart failed");
        }
    }

    const removeCart = async (id , coupons)=>{
        const productId = id;

        const { data } = await axios.delete(`https://ebook-server-4izu.onrender.com/cart/remove/${productId}`,{
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
 
        });
        setCartItem(data.cart.items);
        fetchCart();
    }

    const subTotal =() =>{
        return cartItem.reduce((total , item)=> total += (item.productId?.price || 0 )* (item.quantity || 0),0);
    }
   
            // if(cartItem){
            // var total =cartItem.reduce((total , item) => total += (item.productId?.price || 0 )* (item.quantity || 0),0);
            
            // }
    
    
    const updateQuantity = async (productId , newQuantity , coupons) =>{
        
        try {
          setCartItem(cartItem => 
            cartItem.map((item)=>
                productId === item.productId._id ? {...item , quantity: newQuantity} : item
            )
          );
           const {data} =await axios.put(`https://ebook-server-4izu.onrender.com/cart/update/${productId}` , {quantity:newQuantity , couponValue:coupons},{
                
                     headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
            });
             setCartItem(data.cart.items || []);
            setTotal(data.total);
            
            if(coupon){
                setCouponData(data);
            }
            
             console.log(data);
             
            

           
        } catch (error) {
            console.error("Error updaating quantity", error);
        }
    }

    const handleCheck = (e) =>{ 
        const {name , checked} = e.target;
        setCheckInput((prev) => ({...prev , [name]:checked}))

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!phoneError){
            setStep(step+1);
        }
        
    }
    const validatePhone = (phone) =>{
        const phoneRegEx = /^[0-9]{10}$/;
        if(!phone) return "phone number is required";
        if(!phoneRegEx.test(phone)) return "Phone number must be 10 digits";
        return "";
    }
    const validatePincode = (pincode) => {
    const pinRegEx = /^[0-9]{6}$/;
    if (!pincode) return "Pincode is required";
    if (!pinRegEx.test(pincode)) return "Pincode must be 6 digits";
    if (!freeShippingPincodes.includes(pincode)) return `Shipping to ${pincode} incurs an extra ₹${extraShippingCharge}`;
    return ""; // valid
};

    const handlePayment = async (method) =>{

        setOrderData({...orderData,payment:method});
        const cartData = {
            shipping : orderData.shipping,
            items:cartItem.map(item => ({
                productId : item.productId._id,
                quantity : item.quantity,
                price : item.productId.price
            })),
            totalAmount :cartItem.reduce((total , item) => total += (item.productId?.price || 0 )* (item.quantity || 0),0),
            grandAmount:cartItem.reduce((total , item) => total += (item.productId?.price || 0 )* (item.quantity || 0),0) - (couponData?.discountAmount || 0 ) + shippingCharge,
            couponCode:coupon || null,
            paymentmethod: method
        };
        console.log("grand", cartData.grandAmount );
        try {
            if(method === "cod" ){
                 await axios.post('https://ebook-server-4izu.onrender.com/api/order' , cartData ,{
                    headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}

                 });
                //  setStep(3);
                navigate('/confirmpage');
                 toast.success("Your order placed successfully");
                return;
            }else{
                setLoading(true);
                const { data } =  await axios.post('https://ebook-server-4izu.onrender.com/api/order' , cartData ,{
                    headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}

                 });
                 console.log("razorpay" , data);
                 
             
                 setTimeout(()=>{
                    setLoading(false);
                 },3000);

                 handleRazorpayPayment(data);
               
            }
           
        } catch (error) {
            console.log(error);
        }
    }
    const handleRazorpayPayment = (data) =>{
        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount:data.order.amount ,
            currency:data.order.currency,
            order_id:data.order.id,
            name:'Bookturn',
            image: "https://www.bookturn.in/Bookturncrop.ico",
            handler: async (response) =>{
                try {
                   const verifyData = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature:response.razorpay_signature
                   };
                   const verifyRes = await axios.post('https://ebook-server-4izu.onrender.com/api/verify-payment', verifyData);
                   setLoading(true);
                   setTimeout(()=>{
                    setLoading(false);
                   },3000)
                   if(verifyRes.data.success){
                    setLoading(true);
                   setTimeout(()=>{
                    setLoading(false);
                    // setStep(3);
                    navigate("/confirmpage");
                    toast.success("your order placed");
                   },2000)
                   
                   }else{
                        alert("payment failled");
                   }
                } catch (error) {
                    
                }
            },
            theme:{
                color:"#4caf50",
            },
            modal:{
                ondismiss:function(){
                    alert("payment cancelled");
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }
    useEffect(()=>{
        fetchCart();
        // if(cartItem){
        //     const calculatedTotal = cartItem.reduce((total , item) => total += (item.productId?.price || 0 )* (item.quantity || 0),0);
        //     setTotal(calculatedTotal);
        //     console.log(calculatedTotal,'nag');
        // }
        window.scrollTo({top:0,behavior:'smooth'});
    },[step])

    return(
        <>
            <div className="mt-4 mb">
                <ProgressBar step={step} />
                <div>
                {
                    step === 0 && (
                        <form onSubmit={handleSubmit}>
                        <div className=" d-flex  justify-content-between align-items-center" style={{width:'100%'}}>
                        <div className="m-auto address p-0" >
                            <div className=" d-flex justify-content-start align-items-center bg-primary text-white py-2 text-center  w-100"><div className="bg-white px-2 py-1 text-black ms-2 me-4">1</div><div className="fw-semibold fs-5">DELIVERY ADDRESS</div></div>
                            <div className="mt-2 mb-2 px-2">
                                <label for="exampleFormControlInput1" className="form-label">Mobile number/Whatsapp</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg:9653254215" value={orderData.shipping.phone} name="phone" onChange={(e)=>{
                                    const value = e.target.value;
                                    if(/^[0-9]{0,10}$/.test(value)){
                                        setOrderData({...orderData, shipping : {...orderData.shipping , phone : e.target.value}});
                                        setPhoneError(validatePhone(value));
                                    }
                                }} autoComplete="off"  required/>
                                {
                                    phoneError && (
                                        <p className="mb-0 fw-semibold" style={{color:'red',fontSize:'12px',marginTop:'4px'}}>{phoneError}</p>
                                    )
                                }
                            </div>
                            <div className="mb-2 px-2">
                                <label for="exampleFormControlInput1" className="form-label">address</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg:street/line" name="address" onChange={(e)=>{setOrderData({...orderData, shipping : {...orderData.shipping , address : e.target.value}})}} required/>
                            </div>
                            <div className="mb-2 px-2 ">
                                        <label for="exampleFormControlInput1" className="form-label">City/Village</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg: Berhampur" name="city" onChange={(e)=>{setOrderData({...orderData, shipping : {...orderData.shipping , city : e.target.value}})}} required/>
                                    </div>
                            <div className="row mb-2 px-2">
                                <div className="col">
                                    <div className=" ">
                                        <label for="exampleFormControlInput1" className="form-label">State</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg: Odisha" name="state" onChange={(e)=>{setOrderData({...orderData, shipping : {...orderData.shipping , state : e.target.value}})}} required/>
                                    </div>
                                </div>
                                <div className="col">
                                <div className=" ">
                                        <label for="exampleFormControlInput1" className="form-label">Dist.</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder=" eg: Ganjam" name="dist" onChange={(e)=>{setOrderData({...orderData, shipping : {...orderData.shipping , dist : e.target.value}})}} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 px-2">
                                <label for="exampleFormControlInput1" className="form-label">Pincode/Postel code</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="eg:760009" name="pincode" value={orderData.shipping.pincode} onChange={(e)=>{
                                    const pin = e.target.value;
                                    if(/^[0-9]{0,6}$/.test(pin)){
                                        setOrderData({...orderData, shipping : {...orderData.shipping , pincode : e.target.value}});
                                        setPincodeError(validatePincode(pin));
                                    }
                                    if(!freeShippingPincodes.includes(pin)){
                                        setShippingCharge(extraShippingCharge);
                                    }else{
                                        setShippingCharge(0);
                                    }
                                }} required/>
                                {
                                    pincodeError && (
                                        <p className="mb-0 fw-semibold" style={{color:'red',fontSize:'12px',marginTop:'4px'}}>{pincodeError}</p>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-between gap-2 mt-3 mb-2 align-items-center">
                                <button className="py-2 ms-2 bg-success text-white" disabled={step === 0} onClick={()=>{setStep(step-1)}}>Back</button>
                                <button type="submit" className="py-2 me-2 bg-primary text-white" >Next</button>
                            </div>
                        </div>
                        </div>
                        </form>
                    )
                }
                {
                    step === 1 && <div>
                        <div className="m-auto review mb ">
                        <div className=" d-flex justify-content-start align-items-center bg-primary text-white py-2 text-center  w-100"><div className="bg-white px-2 py-1 text-black ms-2 me-4">2</div><div className="fw-semibold fs-5">ORDER SUMMERY</div></div>
                            {
                                cartItem.length === 0 && <div className=" bg-warning-subtle py-2 text-center " style={{alignItems:'center'}}><p className="mt-2">Your cart is Empty <Link to='/'>Go to Home</Link>Add product into a cart</p></div>
                            }
                           { cartItem.map((item,index)=>{
                                                                                                                 
return (
<div key={index} className="mt-4">
<div className="containern gap-4 d-flex   color-black" >
    <div style={{width:'130px', height:'100%', border:'1px solid grey'}}>
        <img src={ item.productId.images?.[0]} className="image-fluid" alt="book"  style={{width:'100%',height:'100%',cursor:'pointer'}}/>
    </div>
    <div>
        <p className="mb-1">{item.productId.tittle}</p>
        <div className="d-flex gap-2 my-2"><div className="text-muted text-decoration-line-through ">&#8377;{item.productId.mrp}</div><div className="bg-success text-white px-2 rounded-pill text-center" style={{fontSize:'smaller',alignItems:'center',paddingTop:'2px'}}>{item.productId.discount}% Off</div><div className="fw-bold">&#8377;{item.productId.price}</div></div>

        <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center" style={{border:'2px solid green'}}>
            <button className="px-2 bg-white " style={{height:'100%',width:'100%'}} disabled={item.quantity <= 1} onClick={()=>updateQuantity(item.productId._id , item.quantity - 1, coupon )}>-</button>
            <input className="form-control text-center mx-1" style={{width:'50px',border:'none'}} value={item.quantity} readOnly></input>
            <button className="px-2 bg-white" onClick={()=>updateQuantity(item.productId._id , item.quantity + 1 , coupon)}>+</button>
            </div>
            {/* <div className="p-2" style={{cursor:'pointer'}}>
                <AiOutlineDelete className="fs-4 " onClick={()=>removeCart(item.productId._id,coupon)}/>
            </div> */}
        </div>
    </div>
                                                                
</div>
<hr />
</div>)})}

                          <div>

                        </div> 
                        <div  className=" d-flex justify-content-start align-items-center bg-primary text-white py-2 text-center  w-100"><div className="bg-white px-2 py-1 text-black ms-2 me-4">2.1</div><div className="fw-semibold fs-5">PRICE DETAILS</div></div>
                        <div className="pricedet">
                                 <div className="shadow d-flex align-items-center subprice shadow mt-3 p-2" style={{height:'45px',border:'2px solid green'}}>
                                                                <input type="text" placeholder="Apply coupon code..." value={coupon} onChange={(e)=>setCoupon(e.target.value)} onKeyDown={handleKeyDown} style={{width:'100%',border:'none',outline:'none'}}/>
                                                                <FaArrowRight className="ms-2" onClick={handleCoupon} style={{cursor:'pointer'}}/>
                                                            </div>
                            <div className="text-start  card  subprice shadow mt-3 p-2 fw-semibold" >
                                <div className="row  ">
                                    <div className="col " style={{fontSize:'smaller'}}>Subtotal : </div>
                                    <div className="col " style={{fontSize:'smaller'}}>&#8377; {total.toFixed(2)}</div>
                                </div>
                                { couponData &&
                                <div className="row">
                                    <div className="col text-success " style={{fontSize:'smaller'}}>You save:</div>
                                    <div className="col  fw-lighter text-success">&#8377; -{couponData.discountAmount}</div>
                                </div>}
                                <div className="row">
                                    <div className="col " style={{fontSize:'smaller'}}>Delivery charge:</div>
                                    <div className="col "   style={{fontSize:'smaller'}}>&#8377;{
                                            shippingCharge > 0 ? `${shippingCharge}` : "Free"
                                        }</div>
                                </div>
                                <hr />
                                { couponData? (
                                <div className="row ">
                                    <div className="col fw-semibold">Grand Total:</div>
                                    <div className="col fw-semibold color-green">&#8377; {parseFloat(total.toFixed(2))-(couponData?.discountAmount || 0) + (shippingCharge)}</div>
                                </div>) : (
                                    <div className="row ">
                                    <div className="col fw-semibold">Grand Total:</div>
                                    <div className="col fw-semibold color-green">&#8377; {parseFloat(total.toFixed(2)) + (shippingCharge)}</div>
                                </div>
                                )
}                                           
<ToastContainer position="bottom-center" autoClose={2000} transition={Bounce} theme="dark" hideProgressBar={true} closeButton={false} style={{marginBottom:'10px'}}/>

                            </div>
                        </div>
                        { cartItem.length !== 0 &&
                        <div className="text-end py-2 mt-3 bg-white"><button className="py-3 bg-success text-white" onClick={()=>{setStep(step+1)}}>Continue</button></div>}
                        </div>
                    </div>
                }
                {
                    step === 2 && <div>
                        { loading && <div className="loader-container "><span className="loader"></span></div>} <div className="payment  m-auto">
                                        <div className=" d-flex justify-content-start align-items-center bg-primary text-white py-2 text-center "><div className="bg-white px-2 py-1 text-black ms-2 me-4">3</div><div className="fw-semibold fs-5">PAYMENT DETAILS</div></div>
                                        <div className="payment-options payment container mt-5 d-flex flex-column">
      <div
        className={`option ${selectedOption === "cash" ? "selected" : ""} `}
        onClick={() => setSelectedOption("cash")} style={{height:'70px'}}
      >
        <input
          type="radio"
          name="payment"
          checked={selectedOption === "cash"}
          readOnly
        />
        <span>Cash on Delivery</span>
      </div>
      <div
        className={`option ${selectedOption === "online" ? "selected" : ""}`}
        onClick={() => setSelectedOption("online")} style={{height:'70px'}}
      >
        <input
          type="radio"
          name="payment"
          checked={selectedOption === "online"}
          readOnly
        />
        <span>Phonepe/UPI</span>
      </div>
      {(selectedOption === "cash") ? (                            
        <div className="text-end">
    <button className="btn btn-primary  mt-3 text-white py-2 w-50 fs-4" style={{borderRadius:'1px'}} onClick={()=>{handlePayment("cod")}}>Confirm order</button></div>
):(
    <div className="text-end">
    <button className="btn btn-success  mt-3 text-white py-2 w-50 fs-4" style={{borderRadius:'1px'}} onClick={()=>{handlePayment("rozarpay")}}>Paynow</button></div>

)}
    </div>
                       
       


                    </div></div>
                }
                {
                    step === 3 && <> 
                    
            <ToastContainer position="bottom-center" autoClose={2000} transition={Bounce} theme="dark" hideProgressBar={true}/>
            

           <div className="container-fluid" style={{width:'100%', height:"100%"}}> <img src={"/images/confirm.avif"} alt="empty" className="img-fluid" style={{width:'100%', height:'100%',objectFit:'contain'}}/></div>

           <div className="container bg-dark text-white py-3">Your order placed successfully <span className="ms-3"><Link className="text-decoration-none" to="/">GOTO HOME</Link></span> </div>
                    
                    </>
                    
                }
                </div>
            </div>
        </>
    )
}