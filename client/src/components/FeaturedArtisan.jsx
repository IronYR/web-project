import { Button } from "../components/ui/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const FeaturedArtisan = () => {
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/sellers`);
        console.log(response.data);
        // Sort the response data by the number of items sold in descending order
        const sortedArtisan = response.data.sort(
          (a, b) => b.itemsSold - a.itemsSold
        );
        setArtisan(sortedArtisan);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);
  return (
    <section className="w-full py-8 md:py-10 lg:py-10" id="artisan">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Featured Artisans
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Discover unique handcrafted products from talented local artisans.
          </p>
          <Button
            className="ml-auto shrink-0 bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90"
            variant="outline"
            onClick={() => navigate(`/artisans`)}
          >
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {artisan.slice(0, 4).map((item) => (
            <div
              className="relative group grid [grid-template-areas:stack] overflow-hidden rounded-lg"
              key={item.brand._id}
              onClick={() => {
                navigate(`/sellerhome/${item.brand._id}`);
              }}
            >
              <a className="absolute inset-0 z-10" href="">
                <span className="sr-only">View</span>
              </a>
              <img
                alt="Artisanal Jewelry"
                className="[grid-area:stack] object-cover w-full aspect-[4/3] group-hover:opacity-50 transition-opacity sm:aspect-[4/3] md:aspect-[4/3]"
                height="200"
                src={item.brand.image}
                width="300"
              />
              <div className="flex-1 [grid-area:stack] bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-90 transition-opacity text-white p-6 justify-end flex flex-col gap-2">
                <h3 className="font-semibold text-lg tracking-tight">
                  {item.brand.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtisan;
