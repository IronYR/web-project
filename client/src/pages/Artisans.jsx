import React from "react";
import Navbar from "../components/Navbar";
import ArtisanCard from "../components/ArtisanCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Artisans() {
  
  const [artisans, setArtisans] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      const response = await axios.get(`/sellers`);
      setArtisans(response.data);
    };
    fetchProductData();
  }, []);
  return (
    <div>
      <Navbar
        links={[
          { button: true, path: "/login", btn_name: "Login" },
          { button: true, path: "/register", btn_name: "Register" },
        ]}
      />
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Our Talented Artisans
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
            {artisans.map((artisan) => (
              <ArtisanCard artisan={artisan}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}