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
    <Link
      href={`/product/${product.slug.current}`}
      // style={{ flex: "1 1 auto", maxWidth: "calc(50% - 0.5rem)" }}
      ref={ref}
    >
      <motion.div
        className={`product-card ${smallCard && "small-card"}`}
        variants={productAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Image
          src={urlFor(product.image && product.image[0]).toString()}
          fill
          className={`product-card__image ${
            smallCard && "small-card__image"
          }`}
          alt=""
        />

        <h3 className="product-card__title">{product.name}</h3>
        <div className="product-card__reviews flex-center">
          <FaStar
            color="#f27012"
            fontSize={smallCard ? "1rem" : "1.3rem"}
          />
          <p className="product-card__reviews__stars">
            {product.stars}
          </p>
        </div>

        <div className="flex-center">
          <p className="product-card__price">£{product.price}</p>
          <button className="product-card__buy-now" onClick={buyNow}>
            <FaBagShopping
              fontSize={smallCard ? "1.9rem" : "2.5rem"}
              color="#333"
            />
          </button>
        </div>
        <button
          className="product-card__add-to-wishlist"
          onClick={addItemToWishlist}
        >
          {itemOnWishList ? (
            <FaHeart
              fontSize={smallCard ? "1.5rem" : "2.2rem"}
              style={{ fill: "red" }}
            />
          ) : (
            <FaRegHeart fontSize={smallCard ? "1.5rem" : "2.2rem"} />
          )}
        </button>
      </motion.div>
    </Link>
  );
});

export default Product;
