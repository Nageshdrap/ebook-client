import { useState } from 'react';
import './demo.css';
import { FaRegEye ,FaRegEyeSlash } from "react-icons/fa";





export function Demo(){

            const [type , setType] = useState('password');
            const [icons , setIcons] = useState(FaRegEyeSlash);

            function handleToggle(){
                console.log('clicked');
                if(type === 'password'){
                    setType('text');
                    setIcons(FaRegEye);
                }
                else{
                    setType('password');
                    setIcons(FaRegEyeSlash);
                }
            }

    return(
        <>
           <div className="container d-flex justify-content-between text" style={{width:'300px'}}>
            <input type={type} style={{width:'80%'}} />  
            <div>
                <div onClick={handleToggle} style={{width:'20%'}} className='p-3'> { icons  }</div>
            </div>
           </div>
        </>
    )
}