"use client";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import Product from "../ProductCard/Product";
import { useStateContext } from "@/context/StateContext";

const ProductsFeed = ({ products }) => {
  const { category } = useStateContext();
  console.log(products);

  useEffect(() => {
    const container = document.getElementById("products-container");
    const matchingProducts = products.filter((item) =>
      item.category.find((cat) => cat === category)
    );
    console.log(matchingProducts);
    console.log("Matching products length", matchingProducts.length);
    if (matchingProducts.length <= 2) {
      container.classList.add("products-container--transition");
    } else {
      console.log("Removing transition classname");
      container.classList.remove("products-container--transition");
    }
  }, [category]);

  const matchingCategory = products.filter((product) =>
    product.category.find((cat) => cat === category)
  );

  return (
    <div className="home-container__products" id="products-container">
      <AnimatePresence mode="popLayout">
        {matchingCategory.map((product) => (
          <Product
            key={product._id}
            product={product}
            smallCard={true}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductsFeed;
