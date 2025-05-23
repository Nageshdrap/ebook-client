import logo from './logo.svg';
import React, { lazy, Suspense } from 'react'; 
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import { Header } from './components/header';
import WishlistCom from './components/wishlist';
import Footer from './components/footer';
import { ProductLine } from './components/productline';
import { UserProvider } from './components/contextApi/UserContext';
import { CartProvider } from './components/contextApi/CartContext';
import { Login } from './components/login';
// const Login = lazy(()=> import('./components/login'));
import { RegiserUser } from './components/register';
// const RegiserUser = lazy(()=> import('./components/register'));

import { ProtectedUser } from './components/auth/ProtectedRoute';
// import { Cart } from './components/cart';

import { AdminDash } from './components/adminDash';
// const AdminDash = lazy(()=> import('./components/adminDash'));
import { InsertProduct } from './components/insertproduct';
// const InsertProduct = lazy(()=> import('./components/insertproduct'));
import { InsertSubcategory } from './components/insert-subCategory';
// const InsertSubcategory = lazy(()=> import('./components/insert-subCategory'));

// const ProductDisplay = lazy(()=> import('./components/productDisplay'));
import { InsertCategory } from './components/insert-category';
// const InsertCategory = lazy(()=> import('./components/insert-category'));
// import { Home } from './components/home';
import { ProductDetails } from './components/productDetails';
// const ProductDetails = lazy(()=> import('./components/productDetails'));
import { ProgressBar } from './components/progressBar';
import { PlaceOrder } from './components/placeOrder';
// const PlaceOrder = lazy(()=> import('./components/placeOrder'));
import { NavBar } from './components/nav2';
import { SearchPage } from './components/searchPage';
// const SearchPage = lazy(()=> import('./components/searchPage'));

// import { PaymentDetails } from './components/paymentDetails';

import EditProfile from './components/Edit-profile';
// const EditProfile = lazy(()=> import('./components/Edit-profile'));
import Orders from './components/order';
// const Orders = lazy(()=> import('./components/order'));
import OrderDetails from './components/orderDetails';
// const OrderDetails = lazy(()=> import('./components/orderDetails'));
import Confirmpage from './components/confirmpage';
// const Confirmpage = lazy(()=> import('./components/confirmpage'));
import PageNotFound from './components/pagenot';
// const PageNotFound = lazy(()=> import('./components/pagenot'));
import AdminOrders from './components/adminOrders';
// const AdminOrders = lazy(()=> import('./components/adminOrders'));
import Term from './components/term';
// const Term = lazy(()=> import('./components/term'));
import CategoryProduct from './components/Categoryproduct';
import Offer from './components/Offer';
import Spinner from './components/spinner';

import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistProvider } from './components/contextApi/WishlistContext';
import ContactUs from './components/ContactUs';
// const CategoryProduct = lazy(()=> import('./components/Categoryproduct'));
// const WishList = lazy(()=> import('./components/wishlist'));
import Cart from './components/cart';


function App() {
  return (
    <>
       {/* <Routes> */}
          {/* <Route path='/' element={<Home />}/> */}
          
          

          
            
          {/* </Route> */}
          {/* <Route path='cart' element={<ProtectedUser />}> */}
            
          {/* </Route> */}
          {/* <Route path='admin' element={< AdminDash/>}> */}
            {/* <Route path='insert-product/:id' element={< InsertProduct />}/> */}
            {/* <Route path='insert-category/:id' element={< InsertCategory />}/> */}
            {/* <Route path='insert-Subcategory/:id' element={< InsertSubcategory />}/> */}
          {/* </Route> */}
          
       {/* </Routes> */}
       <WishlistProvider>
       <CartProvider>
      <UserProvider>
       <Router>
        <div className='d-flex flex-column min-vh-100'>
       <Offer />
          <Header/>
          
          <main className='flex-grow-1'>
          <Suspense fallback={<p>Loading..</p>}>
          <Routes>
              
              <Route path='/' element={< ProductLine />}/>
              
              <Route path='/productDetails' element={< ProductDetails />} />
              
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<RegiserUser/>}/>
              <Route path='/wishlist' element={<WishlistCom />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='/products' element={<CategoryProduct />} />
              <Route  path='/placeorder' element={< PlaceOrder/>}/>
              <Route path='/edit-profile' element={< EditProfile />} />
              <Route path='/orders' element={< Orders />} />
              <Route path='/term' element={< Term />} />
              <Route path='/contact' element={< ContactUs />} />
              {/* <Route  path='/placeorder' element={< PaymentDetails />}/> */}
              <Route path='/orderDetails' element={< OrderDetails />} />
              <Route path='/searchpage' element={<SearchPage/>} />
              <Route path='/confirmpage' element={< Confirmpage />} />
              <Route path='admin' element={< AdminDash/>}>
              <Route path='*' element={< PageNotFound />}  />
            <Route path='insert-product/:id' element={< InsertProduct />}/>
            <Route path='insert-category/:id' element={< InsertCategory />}/>
            <Route path='insert-Subcategory/:id' element={< InsertSubcategory />}/>
            <Route  path='admin-orders/:id' element={< AdminOrders />} />
          </Route>
          </Routes>
          </Suspense>
          </main>
          <Footer/>
          <ToastContainer position="bottom-center" autoClose={2000} transition={Bounce} theme="dark" hideProgressBar={true} closeButton={true} toastStyle={{maxWidth:'400px'}} style={{marginBottom:'10px'}}/>
          </div>
       </Router>
       </UserProvider>
       </CartProvider>
       </WishlistProvider>
   </>
  );
}

export default App;
