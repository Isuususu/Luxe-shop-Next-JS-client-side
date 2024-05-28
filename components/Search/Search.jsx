"use client";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";

import { urlFor } from "../../lib/client";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";
import getProducts from "../../lib/utils";
import {
  searchBlur,
  searchListAppear,
} from "../../styles/animations";

const Search = ({ mobile }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getProducts();
    data.then((products) => setProducts(products));
  }, []);

  Search.displayName = "Search";

  const { searchBar, setSearchBar } = useStateContext();

  const [matchingProducts, setMatchingProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  //Close searchbar when user clicks anywhere on the page
  useEffect(() => {
    const input = document.getElementById("search-input");
    const handleWindowClick = (event) => {
      if (searchBar && !event.target.closest(".search-field")) {
        setSearchBar(false);
        setMatchingProducts([]);
        input.value = null;
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [searchBar]);

  //Handling matching products whenever input is changed
  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchQuery(inputValue);
    const productName = products.filter((product) => {
      const words = product.name.toLowerCase().split(" ");
      return words.some((word) => word.startsWith(inputValue));
    });
    setMatchingProducts(productName);
    if (!inputValue) {
      setMatchingProducts([]);
    }
  };

  //Highlight matching letters
  const highlightMatch = (name, searchTerm) => {
    if (!searchTerm) {
      return null;
    }
    const parts = name.split(new RegExp(`(${searchTerm})`, "gi"));
    console.log(parts);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearchBar = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent immediate closing
    setSearchBar(true);
  };

  const handleListElementClick = () => {
    const input = document.getElementById("search-input");
    setSearchBar(false);
    setMatchingProducts([]);
    input.value = null;
  };

  //Prevent form submitting
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {searchBar && (
          <motion.div
            className={`blur ${
              mobile === false ? "desktop__blur" : ""
            }`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchBlur}
          ></motion.div>
        )}
      </AnimatePresence>
      <form
        className={`search-form `}
        id="search-form"
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <AnimatePresence mode="wait">
          {searchBar && (
            <motion.ul
              key="search-bar"
              className="search-field"
              variants={searchListAppear}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {matchingProducts.length < 1 && (
                <p>Nothing here yet...</p>
              )}

              {matchingProducts.map((item) => (
                <Link
                  href={`/product/${item.slug.current}`}
                  onClick={handleListElementClick}
                  key={item._id}
                >
                  <motion.li
                    className="search-field__item"
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Image
                      src={urlFor(item.image[0]).toString()}
                      className="search-field__item__thumbnail"
                      alt=""
                      fill
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5vh",
                      }}
                    >
                      <h3 className="search-field__item__title">
                        {highlightMatch(item.name, searchQuery)}
                      </h3>
                      <p className="search-field__item__price">
                        £{item.price}
                      </p>
                    </div>
                  </motion.li>
                </Link>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <label className="search-form__label">
          <FaMagnifyingGlass
            style={{
              fontSize: "1.3rem",
              transition: "all 0.5s",
              color: searchBar ? "rgba(70, 7, 133, 1)" : "#333",
            }}
          />
          <input
            id="search-input"
            type="input"
            className="search-form__label__input-field"
            onClick={handleSearchBar}
            placeholder="What are you looking for?"
            onChange={handleInputChange}
          />
        </label>
      </form>
    </>
  );
};

export default Search;
