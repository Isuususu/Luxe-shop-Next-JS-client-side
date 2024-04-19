"use client";
import React, { Suspense, useEffect, useState } from "react";

import getProducts, { isMobileDevice } from "../lib/utils";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

//Components
import Product from "../components/ProductCard/Product";

//Swiper
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

// import required modules
import { Grid } from "swiper/modules";

export default function Index() {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getProducts();
    data.then((products) => setProducts(products));
  }, []);

  const windowWidth = window.innerWidth;
  const mobile = windowWidth < 500;

  const renderProducts = () => {
    const elements = products.map((product) => {
      return (
        product.category.find((cat) => cat === category) && (
          <SwiperSlide>
            <Product
              product={product}
              key={product._id}
              cardSmall={true}
            />
          </SwiperSlide>
        )
      );
    });
    return elements;
  };

  return (
    <div
      className={`home-container ${
        mobile === false ? "desktop__home-container" : ""
      }`}
      id="home-container"
    >
      <h2 className="home-container__headline">Best sellers</h2>
      <div className="home-container__products">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween="10rem"
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
          }}
          style={{
            "--swiper-pagination-color": "rgba(70, 7, 133, 1)",
            "--swiper-pagination-bullet-size": "14px",
          }}
        >
          {products?.map(
            (product) =>
              product.stars >= 4 && (
                <SwiperSlide key={product._id}>
                  <Product product={product} key={product._id} />
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
      <h2 className="home-container__headline">Explore our shop</h2>
      <div className="home-container__products">
        <>
          <div className="home-container__category-selector">
            <button
              className={`home-container__category-selector__button ${
                category === "All" ? "selected-cat" : ""
              }`}
              onClick={() => setCategory("All")}
            >
              All
            </button>
            <button
              className={`home-container__category-selector__button ${
                category === "Headphones" ? "selected-cat" : ""
              }`}
              onClick={() => setCategory("Headphones")}
            >
              Headphones
            </button>
            <button
              className={`home-container__category-selector__button ${
                category === "Smartphones" ? "selected-cat" : ""
              }`}
              onClick={() => setCategory("Smartphones")}
            >
              Smartphones
            </button>
            <button
              className={`home-container__category-selector__button ${
                category === "Smartwatches" ? "selected-cat" : ""
              }`}
              onClick={() => setCategory("Smartwatches")}
            >
              Smartwatches
            </button>
          </div>

          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            grid={{ rows: 2, fill: "row" }}
            modules={[Grid]}
          >
            {renderProducts()}
          </Swiper>
        </>
      </div>
    </div>
  );
}
