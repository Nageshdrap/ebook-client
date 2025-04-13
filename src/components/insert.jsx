import { useFormik } from "formik"




export function Insert(){

    const formik = useFormik({
        initialValues:{
            tittle:"",
            photos:[]

        },
        onSubmit:(product)=>{
            console.log(product)
        }
    })

    return(
       

        <>

            <form onSubmit={formik.handleSubmit} method="post" enctype="multipart/form-data">
                <input type="text"  onChange={formik.handleChange} onBlur={formik.handleBlur} name="tittle"/>
                <input type="file"  onChange={formik.handleChange} onBlur={formik.handleBlur} name="photo" multiple accept="image*/"/>
            </form>
        </>
    )
}