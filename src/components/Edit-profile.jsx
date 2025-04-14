import { useEffect, useState } from 'react';
import './edit-profile.css';
import axios from 'axios';
import { Alert } from './Alert';





const EditProfile = () =>{

    const [user , setUser] = useState([]);
    const [editname , setEditName] = useState(false);
    const [editnum , setEditNum] = useState(false);
    const [alertMessage , setAlertMassege] = useState('');
    const [icons , setIcons] = useState('');

    const handleChange = (e) =>{
        const { name , value} = e.target;
        setUser((prev) => {
            return {
                ...prev ,[name]:value 
            };
        })
        console.log(user);
    }
    const userSave = async () =>{
        const res = await axios.put('https://ebook-server-4izu.onrender.com/api/login/update',user , {
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
        })
        setAlertMassege(res.data.msg);
        setEditName(false);
        setEditNum(false);
    }

    useEffect( ()=>{
        const fetchUser = async () =>{
        const res = await axios.get(`https://ebook-server-4izu.onrender.com/api/user`,{
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
 
        });
        setUser(res.data.user);
        
    }
    fetchUser();
    },[])
    return(
        <>
            <div className="container edit-profile" >
                <div className='profile-info'>
                    <div className="mb-3">
                        <div><label for="exampleFormControlInput1" class="form-label" className='fw-semibold mb-2'>Enter FullName</label>{editname ? <span className='ms-5 text-primary fw-semibold ' style={{cursor:'pointer'}} onClick={()=>setEditName(false)}>cancel</span> : <span className='ms-5 text-primary fw-semibold cursor-pointer' style={{cursor:'pointer'}} onClick={()=>setEditName(true)}>edit</span>}</div>
                        <div className='d-flex gap-3'><input type="text" value={user.uname} name='uname' className={`form-control `} id="exampleFormControlInput1" placeholder="your name" style={{height:'45px', borderRadius:'1',width:'70%'}} disabled={!editname} onChange={(e)=>handleChange(e)}/>
                        <span className={`btn btn-primary px-4 ${editname? 'd-block': 'd-none'}`} onClick={userSave}>Save</span></div>
                    </div>
                    <div className="mb-3">
                        <div><label for="exampleFormControlInput1" class="form-label" className='fw-semibold mb-2'>Enter Email'</label></div>
                        <div className='d-flex gap-3'><input type="email" value={user.email} className={`form-control `} id="exampleFormControlInput1" placeholder="Email" style={{height:'45px', borderRadius:'1',width:'70%'}} disabled readOnly/></div>
                    </div>
                    <div className="mb-3">
                        <div><label for="exampleFormControlInput1" class="form-label" className='fw-semibold mb-2'>Enter Mobile No.</label>{editnum ? <span style={{cursor:'pointer'}} className='ms-5 text-primary fw-semibold cursor-pointer' onClick={()=>setEditNum(false)}>cancel</span> : <span style={{cursor:'pointer'}} className='ms-5 text-primary fw-semibold cursor-pointer' onClick={()=>setEditNum(true)}>edit</span>}</div>
                        <div className='d-flex gap-3'><input type="text" value={user.phone} name='phone' className={`form-control `} id="exampleFormControlInput1" placeholder="your Number" style={{height:'45px', borderRadius:'1',width:'70%'}} disabled={!editnum} onChange={(e)=>handleChange(e)}/>
                        <span className={`btn btn-primary px-4 ${editnum? 'd-block': 'd-none'}`} onClick={userSave}>Save</span></div>
                    </div>
                </div>
            </div>
             {
                            alertMessage && (
                                <Alert message={alertMessage} icon={icons} onClose={()=> setAlertMassege('')} />
                            )
                        }
        </>
    )
}

export default EditProfile;