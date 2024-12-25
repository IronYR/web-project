import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Bestseller from "../components/Bestseller";
import FeaturedArtisan from "../components/FeaturedArtisan";
import Socials from "../components/Socials";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
const Landing = () => {
  const {user} = useContext(UserContext)
  return (
    <div>
      <Navbar
        links={[
          {button: false, path: "#top", name: "Top Picks"},
          {button: false, path: "#artisan", name: "Featured Artisans"},
          {button: false, path: "#testimonial", name: "Testimonials"},
          {butotn: false, path: "/resources", name: "Skill Building Resources"},
          { button: true, path: "/login", btn_name: "Login" },
          { button: true, path: "/register", btn_name: "Register" },

        ]}
      />
      <Hero/>
      <Categories />
      <Bestseller user={user} />
      <FeaturedArtisan />
      <Socials />
      <Testimonial />
      <Footer/>
    </div>
  );
};
document.body.removeAttribute("class");
export default Landing;