import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { Formik, useFormik,Form } from "formik";
import axios from "axios";




export function Reg(){

   const validate =  values =>{
        let errors = {}

        if(!values.email){
            errors.email = 'required'
        }else{
            errors.email = null
        }

        return errors
    }
   

 const formik = useFormik({
    initialValues:{
        email:'',
        number:''
    },
    onSubmit:  (users) =>{
        console.log(users);
        axios.post(`http://127.0.0.1:4000/users`,users);
        alert('user login');
    }
    
   
  
    
 })
 


    return(
        <>
            <div className="mt-5">
               
               <form onSubmit={formik.handleSubmit} method="post">
               <input type="text" placeholder="enter email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
               <div className="text-danger">{formik.errors.email}</div>
               <input type="text" placeholder="number" onChange={formik.handleChange} onBlur={formik.handleBlur}  name="number"/>
               <div className="text-danger">{formik.errors.number}</div>
               <input type="submit" value="submit" />
               </form>
               
            </div>
        </>
    )
}





