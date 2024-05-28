"use client";
import React from "react";
import { urlFor } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";
import Link from "next/link";

//Components
import Reviews from "../Reviews/Reviews";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

//Animations
import { motion } from "framer-motion";
import { productAnimation } from "../../styles/animations";

const Product = ({ product, cardSmall }) => {
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
    <Link href={`/product/${product.slug.current}`}>
      <motion.div
        className={`product-card ${
          cardSmall === true ? "small-card" : ""
        }`}
        variants={productAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Image
          src={urlFor(product.image && product.image[0]).toString()}
          fill
          className="product-card__image"
          alt=""
        />
        <h2 className="product-card__title">{product.name}</h2>
        <Reviews
          stars={product.stars}
          ratings={product.ratings}
          cardSmall={cardSmall}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="product-card__price">£{product.price}</h3>
          <button className="product-card__buy-now" onClick={buyNow}>
            <FaCartPlus
              fontSize={cardSmall === true ? "2.3rem" : "3rem"}
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
              fontSize={cardSmall === true ? "1.5rem" : "2.2rem"}
              style={{ fill: "red" }}
            />
          ) : (
            <FaRegHeart
              fontSize={cardSmall === true ? "1.5rem" : "2.2rem"}
            />
          )}
        </button>
      </motion.div>
    </Link>
  );
};

export default Product;
