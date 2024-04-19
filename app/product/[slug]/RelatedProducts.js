"use client";
import React from "react";

import Product from "../../../components/ProductCard/Product";

//Swiper
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import the Swiper styles

const RelatedProducts = ({ products }) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      autoplay={true}
      speed={500}
      loop={true}
      cssMode={true}
    >
      {products.map((item) => (
        <SwiperSlide key={item._id}>
          <Product key={item._id} product={item} cardSmall={true} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedProducts;
