import { Link, Outlet, useParams } from "react-router-dom";
import { NavBar } from "./nav2";
import './admindash.css';






export function AdminDash(){

    const parms = useParams();
    const id = parms.id;

    return(
        <>
        <NavBar/>
            <div className=" d-flex w-100 align-items-start bg-light adminlist">
            <Link to="insert-product/1" className="btn btn-light w-100">Insert product</Link>

                <Link to="insert-category/2" className="btn btn-light w-100">Insert category</Link>
                <Link to="insert-Subcategory/3" className="btn btn-light w-100">Insert Subcategory</Link>
                <Link to="admin-orders/4" className="btn btn-light w-100">Orders</Link>
                <Link to="paymentDetails" className="btn btn-light w-100">payment</Link>
            </div>
            { (id === "1")?
            <div className="d-flex justify-content-center align-items-center w-100 h-100  ">
                <div className="dash bg-light mt-3 p-4"><Outlet/></div>
            </div>:null
            }
            {
                (id === "2")?
                <div className="d-flex justify-content-center align-items-center w-100 h-100  ">
                <div className=" bg-light mt-3 p-4"><Outlet/></div>
            </div>:null
            }
            {
                (id === '3')?
                <div className="d-flex justify-content-center align-items-center w-100 h-100  ">
                <div className=" bg-light mt-3 p-4"><Outlet/></div>
            </div>:null
            }
            {
                (id === '4') && 
                <div className=" ">
                <div className=" bg-light mt-3 "><Outlet/></div>
            </div>
            }
        </>
    )
}