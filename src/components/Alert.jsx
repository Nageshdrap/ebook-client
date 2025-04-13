import { useEffect } from "react";
import './Alert.css';




export function Alert({message , onClose , duration=3000,icon}){

    useEffect(()=>{
        const timer = setTimeout(()=>{
            onClose();
        },duration);

        return()=>clearTimeout(timer);
    },[onClose , duration]);

    return(
        <>
            <div className="custom-alert w-75"><span className="alert-icon me-3">{icon}</span>{message}</div>
        </>
    )
}