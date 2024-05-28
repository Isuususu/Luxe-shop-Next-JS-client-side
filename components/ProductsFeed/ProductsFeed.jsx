"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Product from "../ProductCard/Product";
import { useStateContext } from "@/context/StateContext";

const ProductsFeed = ({ products }) => {
  const { category } = useStateContext();
  console.log(products);

  return (
    <div className="home-container__products">
      <swiper-container
        key="products-swiper"
        slides-per-view="2"
        space-between="20"
        grid="true"
        grid-fill="row"
        grid-rows="2"
        pagination="true"
        style={{
          "--swiper-pagination-top": "46%",
          "--swiper-pagination-bullet-size": "15px",
          "--swiper-pagination-inactive-bullet-size": "5px",
          "--swiper-pagination-color": "rgba(70, 7, 133, 1) 0%",
        }}
      >
        <AnimatePresence mode="sync">
          {products.map((product) => {
            return (
              product.category.find((cat) => cat === category) && (
                //Slides below have to have a different id than those above
                //hence 'sec' is added
                <swiper-slide key={`${product._id}sec`}>
                  <Product
                    product={product}
                    key={`${product._id}sec`}
                    cardSmall={true}
                  />
                </swiper-slide>
              )
            );
          })}
        </AnimatePresence>
      </swiper-container>
    </div>
  );
};

export default ProductsFeed;
