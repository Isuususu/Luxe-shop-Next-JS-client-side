"use client";
import React from "react";
import { useStateContext } from "../../context/StateContext";

const CategorySelector = () => {
  const { category, setCategory } = useStateContext();

  return (
    <div className="category-selector">
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
