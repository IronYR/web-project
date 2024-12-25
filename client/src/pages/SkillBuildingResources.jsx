import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg from "../assets/hero_img.png";
import RuralImg from "../assets/ruralwomen1.jpeg";
const SkillBuildingResources = () => {
  const videos = [
    {
      title: "Empowering Rural Women through Skill Development Program",
      link: "https://www.youtube.com/embed/fwGOdsEMYaw?si=zgUHqzFxGUdLTZTQ",
    },
    {
      title:
        "Workshop for Digital literacy& skill building of rural women entrepreneurs Central University Jammu",
      link: "https://www.youtube.com/embed/PYDpCjn79vw?si=_qiPA8jbiQkQjzFm",
    },
    {
        title: "An e-commerce marketplace for women in Pakistan",
        link:"https://www.youtube.com/embed/X7jl_U6yl4Q?si=WJYbTqGhGCKc0UjI"
    },
    {
        title: "How to Start E-Commerce Business? | Best Tips by Hafiz Ahmed",
        link: "https://www.youtube.com/embed/GbZ0E4X23S0?si=34peLmCtDE1OHnz_",
    }
  ];
  return (
    <div>
      <Navbar
        links={[
          //   {button: false, path: "#top", name: "Top Picks"},
          //   {button: false, path: "#artisan", name: "Featured Artisans"},
          //   {button: false, path: "#testimonial", name: "Testimonials"},
          { button: true, path: "/login", btn_name: "Login" },
          { button: true, path: "/register", btn_name: "Register" },
          //   { button: false, path: "/skill-building", name: "Skill Building Resources" }, // New link for the skill building page
        ]}
      />
      <section className="flex w-full items-center justify-center">
        <div className="container grid grid-cols-1 items-center gap-6 md:grid-cols-2 mt-8">
          <img
            alt="Hero Image"
            className="mx-auto w-full h-full rounded-xl object-cover bg-primary"
            src={RuralImg}
          />
          <div className="space-y-4">
            <div className="space-y-4 text-center z-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Skill Building Resources for Rural Women Entrepreneurs
              </h1>
            </div>
          </div>
        </div>
      </section>
      <main className="container flex-grow p-6">
        <div className="flex flex-col justify-center items-center">
          <p className="mb-6 text-2xl text-gray-700">
            This page is dedicated to providing valuable resources for rural
            women entrepreneurs. Here, you will find a curated list of YouTube
            videos and online blogs that offer insights, tips, and inspiration
            to help you in your entrepreneurial journey.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-2">YouTube Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {videos.map((video) => (
            <iframe
              key={video.link}
              className="w-full h-64"
              src={video.link}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>
        <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">From the blog</h1>

        <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1707667838819-3b999acb2e6f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Empowering Women: The Role of Community Support
                    </a>
                    
                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>

            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1524600569259-cc92f4b8c495?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Building Skills for Rural Women Entrepreneurs
                    </a>

                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>

            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Success Stories: Women Entrepreneurs in Villages
                    </a>

                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 25 November 2020</span>
                </div>
            </div>

            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Strategies for Empowering Women in Rural Areas
                    </a>

                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 30 September 2020</span>
                </div>
            </div>

            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        Creating Opportunities: Women in Business
                    </a>

                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 13 October 2019</span>
                </div>
            </div>

            <div class="lg:flex">
                <img class="object-cover w-full h-56 rounded-lg lg:w-64" src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" class="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                        The Impact of Microloans on Women Entrepreneurs
                    </a>
                    
                    <span class="text-sm text-gray-500 dark:text-gray-300">On: 20 October 2019</span>
                </div>
            </div>
        </div>
    </div>
</section>
      </main>
      <Footer />
    </div>
  );
};

export default SkillBuildingResources;
