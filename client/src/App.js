import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Artisans from "./pages/Artisans.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext.jsx";
import ValidationFailure from "./pages/ValidationFailure.jsx";
import Profile from "./pages/Profile.jsx";
import { CartProvider } from "./context/cart";
import { Shoppingcart } from "./pages/Shoppingcart";
import ProductCatalog from "./pages/ProductCatalog";
import SellerDash from "./pages/SellerDash";
import SellerHome from "./pages/SellerHome";
import Landing from "./pages/Landing";
import ProductDetails from "./pages/ProductDetails.jsx";
import OrderInfo from "./pages/OrderInfo.jsx";
import { SellerRegistration } from "./pages/SellerRegistration.jsx";
import AddProduct from "./pages/AddProduct";
import ProductInfo from "./pages/ProductInfo.jsx";
import SellerCatalog from "./pages/SellerCatalog.jsx";
axios.defaults.baseURL = `http://localhost:8000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>

    
    <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
    <UserContextProvider>
    <CartProvider>
    <Routes>
    <Route path='/' element={<Landing/>}
      />
      <Route path='/login' element={<Login/>}
      />
      <Route path='/register' element={<Register/>}
      />
      <Route
            path="/verify/:id/:expirationTimestamp"
            element={<EmailVerify />}
          />
      <Route 
      path="/ResetPassword"
       element={<ResetPassword />} />
      <Route
        path="/ForgotPassword/:id/:token"
        element={<ForgotPassword />}
      />
      <Route
        path="/google/auth/ValidationFailure"
        element={<ValidationFailure />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/shoppingcart"
        element={<Shoppingcart />}
        />
        <Route
        path="/dash"
        element={<SellerDash />}
      />
      <Route
        path="/products"
        element={<ProductCatalog/>}
      />
      <Route path="/sellerhome/:id" element={<SellerHome />} />
      <Route
        path="/order/:id"
        element={<OrderInfo/>}
        />
        <Route
        path="/seller-register"
        element={<SellerRegistration/>}
      />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
        path="/orders/:id"
        element={<OrderInfo/>}
      />
        <Route
        path="/seller/products"
        element={<ProductInfo/>}
      />
      <Route
        path="/seller/add"
        element={<AddProduct/>}
      />
      <Route path="/artisans" element={<Artisans />} />
      <Route path="/product/seller/:id" element={<SellerCatalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    

    {/*  example 
    <Route
            path="/verify/:id/:expirationTimestamp"
            element={<EmailVerify />}
          /> */}
          </CartProvider>
    </UserContextProvider>

    </>
  );
}
document.body.removeAttribute("class");
export default App;
