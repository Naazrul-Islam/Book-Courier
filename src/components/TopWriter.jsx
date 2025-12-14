import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

const writers = [
  {
    id: 1,
    name: "Paulo Coelho",
    image: "https://i.ibb.co.com/xS6YBktR/coelho-main-900x675.jpg",
    bio: "Brazilian lyricist and novelist, best known for 'The Alchemist'.",
  },
  {
    id: 2,
    name: "James Clear",
    image: "https://i.ibb.co.com/B2qSQSyF/6641ebb951f46f7eae1fcd5b-large-GLS23-Headshot-James-Clear-Branded-colour-Print.jpg",
    bio: "Author of 'Atomic Habits', expert in habits and personal development.",
  },
  {
    id: 3,
    name: "Alex Michaelides",
    image: "https://i.ibb.co.com/TqDyWT3n/thumbnail-Alex-Michaelides-1880-7-MB-copy.jpg",
    bio: "British-Cypriot author of bestselling psychological thrillers.",
  },
  {
    id: 4,
    name: "J.K. Rowling",
    image: "https://i.ibb.co.com/Jj0r5SgS/J-K-Rowling-square.png",
    bio: "British author, creator of the Harry Potter series.",
  },
];

export default function TopWriter() {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Soft glowing shapes */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-700/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <h2
          className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-move drop-shadow-lg"
        >
          Our Top Writers
        </h2>
        <p className="text-gray-300 mb-12 text-lg md:text-xl">
          Meet the brilliant minds behind your favorite books.
        </p>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={window.innerWidth < 768 ? 1.2 : 3}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="w-full py-10 px-10 gap-2"
        >
          {writers.map((writer) => (
            <SwiperSlide
              key={writer.id}
              className="bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-gray-700
                shadow-2xl overflow-hidden max-w-xs cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:-translate-y-3 hover:shadow-purple-500/50 mx-15"
            >
              {/* Author Image */}
              <div className="relative">
                <img
                  src={writer.image}
                  alt={writer.name}
                  className="w-full h-72 object-cover rounded-t-3xl hover:scale-105 transition-transform duration-500"
                />
                {/* Glowing overlay for modern effect */}
                <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 hover:opacity-70 transition-all duration-500"></div>
              </div>

              {/* Author Info */}
              <div className="p-5 text-center">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {writer.name}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {writer.bio}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
