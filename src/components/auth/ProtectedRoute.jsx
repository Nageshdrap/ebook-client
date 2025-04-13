import { Navigate, Outlet } from "react-router-dom";




export function ProtectedUser(){

        var userIslogged = localStorage.getItem('userLogin');
        console.log(userIslogged);
    return(
        <>
           { userIslogged? <Outlet/> : <Navigate to={"/login"} />}
        </>
    )
}