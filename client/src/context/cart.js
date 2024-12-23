import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({children}) {
  const [cart,setCart] = useState([]);
  useEffect(()=>{
    const existingCart = localStorage.getItem('cart');
    if(existingCart){
      setCart(JSON.parse(existingCart));
    }
  },[])
  return (
    <CartContext.Provider value={[cart,setCart]}>
      {children}
    </CartContext.Provider>
  );
}