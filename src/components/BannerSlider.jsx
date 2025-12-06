import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import { Navigation, EffectFade, Autoplay } from "swiper/modules";

const promiseData = fetch("/bannerData.json").then((res) => res.json());

export default function BannerSlider() {
  const data = use(promiseData);

  return (
    <div className="w-full h-[450px] md:h-[520px] rounded-xl overflow-hidden shadow-2xl">
      <Swiper
        navigation
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, EffectFade, Autoplay]}
        className="h-full"
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative h-full w-full group">
              {/* Background Image */}
              <img
                src="https://deep-violet-p3vvsful2o-35otwgof6d.edgeone.dev/coolbackgrounds-particles-stellar.png"
                alt={item.title}
                className="h-full w-full object-cover scale-110 group-hover:scale-125 transition-all duration-[2500ms] ease-[cubic-bezier(.19,1,.22,1)]"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"></div>

              {/* Floating Glassmorphism Card */}
            
              <div
                className="absolute left-10 top-1/2 -translate-y-1/2 max-w-lg p-7
    bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-3xl
    transform transition-all duration-700"
              >
                {/* BOOK IMAGE ON TOP (fixed, no hover movement) */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-40 object-cover rounded-xl mb-5 shadow-2xl border border-white/20"
                />

                {/* TITLE */}
                <h2
                  className="text-4xl md:text-5xl font-extrabold mb-4
      bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 
      animate-gradient-move 
      text-transparent bg-clip-text drop-shadow-2xl"
                >
                  {item.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-lg text-gray-200 mb-6 leading-relaxed drop-shadow-xl">
                  {item.description}
                </p>

                {/* BUTTON */}
                <a
                  href="/all-books"
                  className="relative px-7 py-3 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl 
      overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10">View All Books</span>
                  <span
                    className="absolute top-0 left-0 w-full h-full bg-white/20 
      translate-x-[-100%] hover:translate-x-[200%] 
      transition-transform duration-[700ms] rotate-[20deg]"
                  ></span>
                </a>
              </div>

              {/* Parallax Soft Light Effect */}
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none 
                bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 
                transition-all duration-700"
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
