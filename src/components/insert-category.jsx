import { useState } from "react"
import axios from "axios";
import { Alert } from "./Alert";
import { FaRegThumbsUp } from "react-icons/fa";

export function InsertCategory(){

    const [value,setvalue] = useState('');
    const [alertMessage , setAlertMassege] = useState('');
    const [icons,setIcons] = useState();

    const handleAdd = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", value);

        await axios.post('http://127.0.0.1:4500/api/category', formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        setvalue('');
        setAlertMassege("category added successfully");
        setIcons(FaRegThumbsUp);
       
    }


    return(
        <>
            <input type="text" value={value} onChange={(e)=> setvalue(e.target.value)} />
            <button className="btn btn-warning" onClick={handleAdd}>Add category</button>

            {
                alertMessage && (
                    <Alert message={alertMessage} icon={icons} onClose={()=> setAlertMassege('')} />
                )
            }
        </>
    )
}