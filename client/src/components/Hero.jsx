import { useNavigate } from 'react-router-dom';
import HeroImg from '../assets/hero_img.png';
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex w-full items-center justify-center ">
      <div className="container grid grid-cols-1 items-center gap-6 md:grid-cols-2 mt-8">
        <div className="space-y-4">
          <div className="space-y-4 text-center z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              Made with ♥️ by Local Artisans
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover unique, handcrafted products made by local artisans in
              your community.
            </p>
            <button
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              onClick={() => navigate("/products")}
            >
              View products
            </button>
          </div>
        </div>
        <img
  alt="Hero Image"
  className="mx-auto w-full h-full rounded-xl object-cover bg-primary"
  src={HeroImg}
/>

      </div>
    </section>
  );
};
export default Hero;
