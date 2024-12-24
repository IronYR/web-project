import Pot from "../assets/pot.png"
import Textile from "../assets/textile.png"
import Woodwork from "../assets/woodwork.png"
import Leatherwork from "../assets/leather.png"
import { useNavigate } from "react-router-dom";
const Categories =()=> {
  const navigate = useNavigate();

  
  return (
    <section className="pt-12 md:pt-16 lg:pt-10 pb-5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 md:mb-10 lg:mb-12 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Shop By Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg bg-white p-4 transition-all hover:scale-105 dark:bg-gray-950 cursor-pointer" onClick={() => navigate(`/products?category=handicrafts`)}>
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
              <img src={Pot} className = "h-10 w-10"/>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Handicrafts</h3>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-4 transition-all hover:scale-105 dark:bg-gray-950 cursor-pointer " onClick={() => navigate(`/products?category=textile`)}>
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
              <img src={Textile} className="h-10 w-10" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Textiles/Traditional Apparel</h3>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-4 transition-all hover:scale-105 dark:bg-gray-950 cursor-pointer" onClick={() => navigate(`/products?category=organic`)}>
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
              <img src={Woodwork} className="h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Organic Products</h3>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-white p-4 transition-all hover:scale-105 dark:bg-gray-950 cursor-pointer" onClick={() => navigate(`/products?category=education`)}>
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50">
              <img src={Leatherwork} className="h-10 w-10" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Educational Services</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Categories;

