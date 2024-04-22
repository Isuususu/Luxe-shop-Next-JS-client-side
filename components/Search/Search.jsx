"use client";
import { AnimatePresence } from "framer-motion";
import React, { forwardRef, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
import { urlFor } from "../../lib/client";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";
import getProducts from "../../lib/utils";

const Search = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getProducts();
    data.then((products) => setProducts(products));
  }, []);

  Search.displayName = "Search";

  const { searchBar, setSearchBar } = useStateContext();

  const [matchingProducts, setMatchingProducts] = useState([]);

  const [homeContainerRef, setHomeContainerRef] = useState(null);

  //Check is user using mobile device or desktop to define layout
  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    if (typeof window != "undefined") {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    }
  }, [windowWidth]);
  const mobile = windowWidth < 500;

  //Handling searchbar animation
  const { scrollY } = useScroll(
    mobile === false && { container: ref }
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const searchFormContainer = document.getElementById(
      "search-form-container"
    );

    const searchForm = document.getElementById("search-form");
    if (searchBar) {
      return;
    }
    if (latest >= 100) {
      searchForm.classList.add("searchform-transition");
      searchFormContainer.classList.add("searchbar-transition");
    } else {
      searchForm.classList.remove("searchform-transition");
      searchFormContainer.classList.remove("searchbar-transition");
    }
  });

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
  const handleInputChange = (event) => {
    const newProducts = [];
    const inputValue = event.target.value.toLowerCase();

    if (inputValue.length === 0) {
      setMatchingProducts([]);
      return;
    }

    for (let j = 0; j < products.length; j++) {
      const productName = products[j].name.toLowerCase();
      let matched = true;

      if (productName.length >= inputValue.length) {
        for (let i = 0; i < inputValue.length; i++) {
          if (productName[i] !== inputValue[i]) {
            matched = false;
            break; // No need to check further if a mismatch is found
          }
        }
        if (matched) {
          newProducts.push(products[j]);
        }
      }
    }
    setMatchingProducts(newProducts);
    return newProducts;
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className={`search-form-container ${
          searchBar ? "search-full-width" : ""
        } ${mobile === false ? "desktop__searchbar" : ""}`}
        id="search-form-container"
      >
        <AnimatePresence mode="wait">
          {searchBar && (
            <motion.div
              className={`blur ${
                mobile === false ? "desktop__blur" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
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
                initial={{ minHeight: 0, paddingTop: 0 }}
                animate={{
                  minHeight: "100px",
                  paddingTop: "60px",
                }}
                exit={{ height: "0", minHeight: "0", paddingTop: 0 }}
                transition={{ duration: 0.2 }}
              >
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
                          {item.name}
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
      </div>
    </>
  );
});

export default Search;
