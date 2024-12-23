import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cart";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { UserContext } from '../context/userContext';

const Bestseller = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      products: "",
      quantity: 0,
    },
  ]);
  const [cart, setCart] = useContext(CartContext);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/products`);
        const sortedProducts = response.data.sort((a, b) => b.itemsSold - a.itemsSold);
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const addToCart = (product) => {
    if(props.user && props.user.brand){
    if(props.user.brand._id===product.brand._id){
      toast.error("You can't add your own product to cart");
    }
    else if(props.user.brand === product.brand._id){
      toast.error("You can't add your own product to cart");
    }
    else{
      const productInCart = cart.find((item) => item.product._id === product._id);
      if (productInCart) {
        setCart(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        localStorage.setItem(
          "cart",
          JSON.stringify(
            cart.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          )
        );
      } else {
        setCart([...cart, { product, quantity: 1 }]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { product, quantity: 1 }])
        );
      }
      toast.success("Added to cart");
    }
  }
    else{
      const productInCart = cart.find((item) => item.product._id === product._id);
      if (productInCart) {
        setCart(
          cart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        localStorage.setItem(
          "cart",
          JSON.stringify(
            cart.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          )
        );
      } else {
        setCart([...cart, { product, quantity: 1 }]);
        localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { product, quantity: 1 }])
        );
      }
      toast.success("Added to cart");
    }
    
  };
  return (
    <section className="w-full py-12 md:py-10 lg:py-10" id ="top">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Bestsellers
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Discover our top-selling items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md"
              onClick={() => navigate("/products")}
            >
              View all
            </Button>
          </div>
        </div>
        <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="bg-white h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => { navigate(`/product/${product._id}`) }}
            >
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden ">
                <img
                  alt="Product Image"
                  className="object-cover w-full h-full"
                  height={300}
                  src={product.images}
                  style={{
                    aspectRatio: "450/300",
                    objectFit: "cover",
                  }}
                  width={450}
                />
              </div>
              <div className="pt-3 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-medium">
                    {product.discount === 0 ? (
                      <span className="text-lg">Rs. {product.price}</span>
                    ) : (
                      <div className="flex items-center">
                        <span className="line-through text-sm">
                          Rs. {product.price}
                        </span>
                        <span className="text-lg ml-3">
                          Rs. {product.price - product.discount}
                        </span>
                      </div>
                    )}
                  </span>
                  <Button
                    className="rounded-full px-2 py-2 bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from bubbling up to the parent div
                      addToCart(product);
                    }}
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Bestseller;
function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
