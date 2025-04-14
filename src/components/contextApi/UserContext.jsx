import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const UserContext = createContext();


export const UserProvider = ({children}) =>{
    const [userData , setUserData] = useState(null);
    

    const fetchUser = async () =>{
        const res =await axios.get(`https://ebook-server-4izu.onrender.com/api/user`,{
                
            headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
    });
    setUserData(res.data.user.uname);
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');

        if(token){
            fetchUser();
        }
    },[]);

    const login = () =>{
        fetchUser();
        
    }

    return(
        <UserContext.Provider value={{userData , setUserData , login}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);