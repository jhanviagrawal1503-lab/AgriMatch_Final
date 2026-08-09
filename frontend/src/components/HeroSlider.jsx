import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HeroSlider.css";

import hero from "../assets/hero.jpg";
import recommendations from "../assets/recommendations.jpg";
import about from "../assets/about.jpg";

const slides = [
  {
    title: "Grow Smarter.\nChoose Better.",
    description:
      "Discover crops and agri-input shops with personalized recommendations based on community ratings and smart tag matching.",
    button: "Browse Listings",
    link: "/listings",
    image: hero,
  },

  {
    title: "AI Powered\nRecommendations",
    description:
      "Find the best crops based on your soil type, season and budget using AI.",
    button: "Get Recommendations",
    link: "/recommendations",
    image: recommendations,
  },

  {
    title: "About\nAgriMatch",
    description:
      "Connecting farmers with verified suppliers through intelligent recommendations.",
    button: "Learn More",
    image: about,
  },
];

function HeroSlider() {
  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-container">
              <div className="hero-left">
                <h1>
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h1>

                <p>{slide.description}</p>

                {slide.button === "Learn More" ? (
                  <button onClick={handleLearnMore}>
                    {slide.button}
                  </button>
                ) : (
                  <Link to={slide.link}>
                    <button>{slide.button}</button>
                  </Link>
                )}
              </div>

              <div className="hero-right">
                <img
                  src={slide.image}
                  alt="Hero"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;