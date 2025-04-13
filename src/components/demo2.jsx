import { useState } from "react"
import { Email } from "./email";
import { Mobile } from "./mobile";






export function Demo2(){

            const [email , setEmail] = useState();

            function handleEmail(){
                return(
                    <>
                    
                    </>
                )
                
            }
            function handleMob(){
                setEmail(<Mobile/>)
            }

    return(
        <>
            <div className="container d-felx justify-content-start ">
                <button className="btn btn-success" onClick={handleEmail}>email</button>
                <button className="btn btn-warning" onClick={handleMob}>Mobile No.</button>

            </div>
            <div className="container-fluid">
                {email}
            </div>
        </>
    )
}