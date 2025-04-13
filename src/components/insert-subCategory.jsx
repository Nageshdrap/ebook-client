import axios from "axios";
import { useEffect, useState } from "react"





export function InsertSubcategory(){

    const [category,setCategory] = useState([]);
    const [subcategory , setSubcategory] = useState('');
    const [Category , setcategory] = useState('');
    const [alertMessage , setAlertMassege] = useState('');
    const [selects,setSelect] = useState('');

    function loadCategory(){

            axios.get('http://127.0.0.1:4500/api/category')
            .then((res)=>{
                setCategory(res.data);
               
            })
    }
    const initialValue = {
        name:'',
        category:''
    }
    const [formData , setFormData] = useState(initialValue);

    const handleChange = (e) =>{
        const { name , value} = e.target;
        setFormData((prevData)=>({
             ...prevData , [name]:value
            
        }));
    }

  async function  handleSubmit(e){
        e.preventDefault();
       

        await axios.post('http://127.0.0.1:4500/api/subcategory', formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        setFormData(initialValue);
        
        
        
    }
    
    useEffect(()=>{

        loadCategory();
    },[])

    return(
        <>
            <div>
            <label>select subcategory</label>
                <input type="text" value={formData.name} name="name" onChange={handleChange}/>
                
                <label>select category</label>
                <select name="category" value={formData.category} id="" onChange={handleChange}>
                    <option value=''>select subcategory</option>
                    {
                        category.map((val,index) =>(
                            <option value={val._id} key={index}>{val.name}</option>
                        ))
                    }
                </select>
                <button onClick={handleSubmit} className="btn btn-primary">submit</button>
            </div>
        </>
    )
}