import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Navbar from "../navbar/Navbar";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";
import { Autoplay } from "swiper/modules";

const heroSlides = [
  {
    title: "Discover Clubs Near You",
    subtitle: "Find your people, follow your passion",
    description:
      "Photography, hiking, book clubs, tech groups — explore everything around you.",
    buttonText: "Explore Clubs",
    backgroundImage: banner1,
  },
  {
    title: "Create Your Own Club",
    subtitle: "Manage events, members & activities easily",
    description:
      "ClubSphere gives you a complete dashboard to run your club professionally.",
    buttonText: "Start a Club",
    backgroundImage: banner2,
  },
    {
      title: "Plan & Attend Events Effortlessly",
      subtitle: "Smooth registration & smart notifications",
      description: "Host meetups, workshops, tournaments and let members register in one click.",
      buttonText: "Browse Events",
      backgroundImage:banner3
    }
];

const Banner = () => {
  return (
    <header className="relative w-full h-[80vh] mx-auto">
      {/* Swiper Background */}
      <Swiper
        modules={[ Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xs flex items-center px-6">
                <div className="mx-auto flex flex-col items-center bg-white/20 p-6 rounded-2xl mt-10 md:mt-0">
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    {slide.title}
                  </h2>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {slide.subtitle}
                  </h4>
                  <p className="mb-5 w-3xs text-center font-medium">
                    {slide.description}
                  </p>
                  <button className="px-6 py-2 bg-accent text-white rounded-lg active:scale-95 duration-150 shadow">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navbar (always stays on top of image) */}
      <nav className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </nav>
    </header>
  );
};

export default Banner;
