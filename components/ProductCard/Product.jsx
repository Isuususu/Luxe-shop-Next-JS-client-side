"use client";
import React, { forwardRef } from "react";
import { urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";
import Link from "next/link";

//Components
import Reviews from "../Reviews/Reviews";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";

import { FaStar } from "react-icons/fa";

//Animations
import { motion } from "framer-motion";
import { productAnimation } from "../../styles/animations";

//Forwarding ref to first JSX element to make popLayout animation working properly
const Product = forwardRef(function Product(
  { product, smallCard },
  ref
) {
  const { addToCart, qty, wishlist, addToWishlist } =
    useStateContext();

  const buyNow = (e) => {
    e.preventDefault();
    addToCart(product, qty);
  };

  const addItemToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  const itemOnWishList = wishlist.find(
    (item) => item._id === product._id
  );

  return (
    <Link href={`/product/${product.slug.current}`} ref={ref}>
      <motion.div
        className={`product-card ${smallCard && "small-card"}`}
        variants={productAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button className="product-card__buy-now" onClick={buyNow}>
          <FaBagShopping
            fontSize={smallCard ? "1.3rem" : "1.7rem"}
            color="#333"
          />
        </button>
        <div style={{ position: "relative" }}>
          <Image
            src={urlFor(product.image && product.image[0]).toString()}
            fill
            className={`product-card__image ${
              smallCard && "small-card__image"
            }`}
            alt=""
          />
          <button
            className="product-card__add-to-wishlist"
            onClick={addItemToWishlist}
          >
            {itemOnWishList ? (
              <FaHeart
                fontSize={smallCard ? "1.3rem" : "1.8rem"}
                style={{ fill: "red" }}
              />
            ) : (
              <FaRegHeart
                fontSize={smallCard ? "1.3rem" : "1.8rem"}
              />
            )}
          </button>
        </div>
        <div className="flex-center">
          <h3 className="product-card__price">£{product.price}</h3>
          <div className="product-card__reviews flex-center">
            <FaStar
              color="#fcf003"
              fontSize={smallCard ? "1rem" : "1.1rem"}
            />
            <p className="product-card__reviews__stars">
              {product.stars}
            </p>
          </div>
        </div>
        <p className="product-card__title">{product.name}</p>
      </motion.div>
    </Link>
  );
});

export default Product;
