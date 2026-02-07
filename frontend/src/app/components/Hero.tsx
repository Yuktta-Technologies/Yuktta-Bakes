"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section
      className="full-width-section bg-brand-cream"
      aria-labelledby="hero-heading"
    >
      <div className="relative flex flex-col md:flex-row min-h-[80vh]">
        
       
      {/* Left: Text (50%) */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center pl-6 lg:pl-16 py-16">
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
        >
          <span className="text-[#3B322B]">100% Pure</span> <br />
          <span className="text-[#E48767]">Couverture Chocolate,</span> <br />
          <span className="text-[#3B322B]">Never Compound</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#7B5E57] max-w-xl mb-8 leading-relaxed">
          Discover our handcrafted brownies, cookies, and traditional laddus. Each bite is a perfect blend of premium ingredients <br />
          and time-honored recipes.
        </p>
        <Link
          href="/products"
          className="w-fit bg-brand-peach text-brand-dark font-semibold px-5 py-2.5 text-base rounded-md shadow hover:opacity-95 hover:scale-105 transform transition-transform duration-200"
        >
          Shop Now
        </Link>
      </div>




        {/* Right: Full-height diagonal carousel (50%) */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full clip-diagonal">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="hero-swiper w-full h-full"
          >
            <SwiperSlide>
              <Image
                src="/hero/brownies.jpg"
                alt="Brownies"
                fill
                className="object-cover"
                priority
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/hero/cookies.jpg"
                alt="Cookies"
                fill
                className="object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/hero/laddus.jpg"
                alt="Laddus"
                fill
                className="object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
