"use client";
import React from "react";
import Product from "../ProductCard/Product";
// Import Swiper styles
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const Bestsellers = ({ products }) => {
  return (
    <div className="home-container__products">
      <swiper-container
        key="bestsellers-swiper"
        autoplay="true"
        slides-per-view="1"
        centered-slides="true"
        space-between="10rem"
      >
        {products?.map(
          (product) =>
            product.stars >= 4 && (
              <swiper-slide key={product._id}>
                <Product product={product} key={product._id} />
              </swiper-slide>
            )
        )}
      </swiper-container>
    </div>
  );
};

export default Bestsellers;
