import logo from './logo.svg';
import React, { lazy, Suspense } from 'react'; 
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import { Header } from './components/header';
import Footer from './components/footer';
import { UserProvider } from './components/contextApi/UserContext';
import { CartProvider } from './components/contextApi/CartContext';
// import { Login } from './components/login';
const Login = lazy(()=> import('./components/login'));
// import { RegiserUser } from './components/register';
const RegiserUser = lazy(()=> import('./components/register'));
// import { WishList } from './components/wishlist';
const WishList = lazy(()=> import('./components/wishlist'));
// import { ProtectedUser } from './components/auth/ProtectedRoute';
// import { Cart } from './components/cart';
const Cart = lazy(()=> import('./components/cart'));
// import { AdminDash } from './components/adminDash';
const AdminDash = lazy(()=> import('./components/adminDash'));
// import { InsertProduct } from './components/insertproduct';
const InsertProduct = lazy(()=> import('./components/insertproduct'));
// import { InsertSubcategory } from './components/insert-subCategory';
const InsertSubcategory = lazy(()=> import('./components/insert-subCategory'));
// import { ProductDisplay } from './components/productDisplay';
const ProductDisplay = lazy(()=> import('./components/productDisplay'));
// import { InsertCategory } from './components/insert-category';
const InsertCategory = lazy(()=> import('./components/insert-category'));
// import { Home } from './components/home';
// import { ProductDetails } from './components/productDetails';
const ProductDetails = lazy(()=> import('./components/productDetails'));
// import { ProgressBar } from './components/progressBar';
// import { PlaceOrder } from './components/placeOrder';
const PlaceOrder = lazy(()=> import('./components/placeOrder'));
// import { NavBar } from './components/nav2';
// import { SearchPage } from './components/searchPage';
const SearchPage = lazy(()=> import('./components/searchPage'));

// import { PaymentDetails } from './components/paymentDetails';

// import EditProfile from './components/Edit-profile';
const EditProfile = lazy(()=> import('./components/Edit-profile'));
// import Orders from './components/order';
const Orders = lazy(()=> import('./components/order'));
// import OrderDetails from './components/orderDetails';
const OrderDetails = lazy(()=> import('./components/orderDetails'));
// import Confirmpage from './components/confirmpage';
const Confirmpage = lazy(()=> import('./components/confirmpage'));
// import PageNotFound from './components/pagenot';
const PageNotFound = lazy(()=> import('./components/pagenot'));
// import AdminOrders from './components/adminOrders';
const AdminOrders = lazy(()=> import('./components/adminOrders'));
// import Term from './components/term';
const Term = lazy(()=> import('./components/term'));
// import CategoryProduct from './components/Categoryproduct';
const CategoryProduct = lazy(()=> import('./components/Categoryproduct'));


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
       <CartProvider>
      <UserProvider>
       <Router>
          <Header/>
          <Suspense fallback={<p>Loading..</p>}>
          <Routes>
              
              <Route path='/' element={< ProductDisplay />}/>
              <Route path='/productDetails' element={< ProductDetails />} />
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<RegiserUser/>}/>
              <Route path='/wishlist' element={<WishList />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='/products' element={<CategoryProduct />} />
              <Route  path='/placeorder' element={< PlaceOrder/>}/>
              <Route path='/edit-profile' element={< EditProfile />} />
              <Route path='/orders' element={< Orders />} />
              <Route path='/term' element={< Term />} />
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
          <Footer/>
       </Router>
       </UserProvider>
       </CartProvider>
   </>
  );
}

export default App;
