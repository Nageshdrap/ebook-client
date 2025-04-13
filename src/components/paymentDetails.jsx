import { useState } from "react";
import './paymentDetails.css';



export function PaymentDetails(){

        const [selectedOption , setSelectedOption] = useState("cash");
        const handlePayment = () =>{

        }

    return(
        <>
            <div className="payment-options container mt-5 d-flex flex-column">
      <div
        className={`option ${selectedOption === "cash" ? "selected" : ""} `}
        onClick={() => setSelectedOption("cash")}
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
 <div className="text-end" style={{height:'70px'}}>
 <button className="btn btn-warning  mt-3 text-white py-2 w-50 fs-4" style={{borderRadius:'10px'}} onClick={()=>{handlePayment("cod")}}>paynow</button></div>
):(
    <div className="text-end">
    <button className="btn btn-warning  mt-3 text-white py-2 w-50 fs-4" style={{borderRadius:'10px'}} onClick={()=>{handlePayment("cod")}}>paynow</button></div>

)}
    </div>
        </>
    )
}


