"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";
import { useMotionValueEvent, useScroll } from "framer-motion";

const CategorySelector = () => {
  const { category, setCategory } = useStateContext();

  // //Handling navbar top animation
  // const { scrollY } = useScroll();
  // // mobile === false && { container: ref }
  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const navbarTop = document.getElementById("category-selector");
  //   console.log(latest);

  //   if (latest >= 100) {
  //     navbarTop.classList.add("category-bar-transition");
  //   }
  //   // else {
  //   //   navbarTop.classList.remove(" ");
  //   // }
  // });

  return (
    <div className="category-selector" id="category-selector">
      <button
        className={`category-selector__button ${
          category === "All" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("All")}
      >
        All
      </button>
      <button
        className={`category-selector__button ${
          category === "Headphones" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Headphones")}
      >
        Headphones
      </button>
      <button
        className={`category-selector__button ${
          category === "Smartphones" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Smartphones")}
      >
        Smartphones
      </button>
      <button
        className={`category-selector__button ${
          category === "Smartwatches" ? "selected-cat" : ""
        }`}
        onClick={() => setCategory("Smartwatches")}
      >
        Smartwatches
      </button>
    </div>
  );
};

export default CategorySelector;
