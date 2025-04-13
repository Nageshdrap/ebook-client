import { useState } from "react";







export function Spread(){

    const [details , setDetails] = useState([{
        email:'',
        number:''

    }])

    function handleSub(e){
            const {name , value} = e.target;
            setDetails((prev)=>{
                return {
                    ...prev,[name]:value
                };
            })
            console.log(details);
    }



    return(
        <>
            <div className="container">
                <label htmlFor="">email</label>
                <input type="text" name="Email" onChange={(e)=>handleSub(e)}/>
                <label htmlFor="" >number</label>
                <input type="text" name="mobile" onChange={(e)=>handleSub(e)} />
            </div>
        </>
    )
}