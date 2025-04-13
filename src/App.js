import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Header } from './components/header';
import { Login } from './components/login';
import { RegiserUser } from './components/register';
import { WishList } from './components/wishlist';
import { ProtectedUser } from './components/auth/ProtectedRoute';
import { Cart } from './components/cart';
import { AdminDash } from './components/adminDash';
import { InsertProduct } from './components/insertproduct';
import { InsertSubcategory } from './components/insert-subCategory';
import { ProductDisplay } from './components/productDisplay';
import { InsertCategory } from './components/insert-category';
import { Home } from './components/home';
import { ProductDetails } from './components/productDetails';
import { ProgressBar } from './components/progressBar';
import { PlaceOrder } from './components/placeOrder';
import { NavBar } from './components/nav2';
import { SearchPage } from './components/searchPage';
import Footer from './components/footer';
import { PaymentDetails } from './components/paymentDetails';
import { UserProvider } from './components/contextApi/UserContext';
import { CartProvider } from './components/contextApi/CartContext';
import EditProfile from './components/Edit-profile';
import Orders from './components/order';
import OrderDetails from './components/orderDetails';
import Confirmpage from './components/confirmpage';
import PageNotFound from './components/pagenot';
import AdminOrders from './components/adminOrders';

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
          <Routes>
              
              <Route path='/' element={< ProductDisplay />}/>
              <Route path='/productDetails' element={< ProductDetails />} />
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<RegiserUser/>}/>
              <Route path='/wishlist' element={<WishList />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route  path='/placeorder' element={< PlaceOrder/>}/>
              <Route path='/edit-profile' element={< EditProfile />} />
              <Route path='/orders' element={< Orders />} />
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
          <Footer/>
       </Router>
       </UserProvider>
       </CartProvider>
   </>
  );
}

export default App;
