import axios from "axios";
import { useEffect, useRef, useState } from "react"





export function InsertProduct(){

    const [tittle,setTittle] = useState('');
    const [image , setImage] = useState([]);

    const [keyword , setKeyword] = useState('');
    const [values , setValues] = useState([]);

    const [auther ,setAuthor] = useState('');
    const [desc , setDesc] = useState('');
    const [price , setPrice] = useState('');
    const [category , setCategory] = useState([]);
    const [subCategory , setSubcategory] = useState([]);

    const [valueCategory , setValueCategory] = useState('');
    const [valueSubcategory , setValueSubcategory] = useState('');

    const handleFile = (e)=>{
        setImage(e.target.files);
        console.log(image);
    }
    const handleTittle = (e)=>{
        setTittle(e.target.value);
        console.log(tittle);
    }
    const handleAdd = () =>{

        if(keyword.trim() !== ''){
            setValues([...values, keyword]);
            setKeyword('');
            console.log(values);
        }
      

  
        
    }
    
    const handleSubmit =  async (e)=>{
        console.log("hello");
        e.preventDefault();
        const formData = new FormData();
        formData.append('tittle', tittle);
        formData.append('keyword',JSON.stringify(values));
        Array.from(image).forEach(item => {
            formData.append('files',item)
        });
        formData.append('author', auther);
        formData.append('description', desc);
        formData.append('price', price);
        formData.append('category', valueCategory);
        formData.append('subcategory', valueSubcategory);





     await axios.post('https://ebook-server-4izu.onrender.com/api/insert-product', formData,{
            headers:{
                'Content-Type':'multipart/form-data'

            }
        })
    }

    useEffect(()=>{

        const fecthCategory = axios.get('https://ebook-server-4izu.onrender.com/api/category').then(res => res.data);
        const fecthSubCategory = axios.get('https://ebook-server-4izu.onrender.com/api/subcategory').then(res => res.data);
        
        Promise.all([fecthCategory , fecthSubCategory])
        .then(([categoryData , subCategoryData]) =>{
            setCategory(categoryData);
            setSubcategory(subCategoryData);
            
        })
        .catch((error)=>{
            console.error('erroe in fetching data', error);
        })
        

    },[])


    return(
        <>
            <div className="d-flex flex-column">
                
                    <input type="text" onChange={handleTittle} name="tittle"></input>
                    <input type="text" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} /> 
                    <button className="btn btn-success" onClick={handleAdd}>add</button>
                    <input type="file" onChange={handleFile} multiple name='files'></input>
                    <label htmlFor="">Author</label>
                    <input type="text" placeholder="" onChange={(e) => setAuthor(e.target.value)}/>
                    <label htmlFor="">Description</label>
                    <input type="text" placeholder="" onChange={(e) => setDesc(e.target.value)}/>
                    <label htmlFor="">price</label>
                    
                    <input type="text" placeholder="" onChange={(e)=> setPrice(e.target.value)}/>
                    <br />
                    <select name="" id="" onChange={(e)=>{ setValueCategory(e.target.value)}}>
                        <option value="">select category</option>
                        {
                            category.map((item , index) =>(
                                <option key={index} value={item._id}>{item.name}</option>
                            ))
                        }
                    </select>
                    <br />
                    <select name="" id="" onChange={(e)=> setValueSubcategory(e.target.value)}>
                        <option value="" >select subcategory</option>
                            {
                               valueCategory &&
                               ( subCategory.filter( sub => sub.category === valueCategory).map((item , index) =>(
                                    <option key={index} value={item._id}>{item.name}</option>
                                )))
                            
                            }
                    </select>
                    <br />
                    <input type="submit" onClick={handleSubmit}/>
               
                <div>
                    {
                        values.map((val , index)=>(
                            <div key={index}>
                                    {val}
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                valueCategory && (
                    <>
                        {valueCategory}
                    </>
                )
            }
        </>
    )
}