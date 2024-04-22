import React from "react";
import { urlFor } from "../../lib/client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

//Icons

import { FaRegHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import Reviews from "../Reviews/Reviews";
import { useStateContext } from "../../context/StateContext";
import Image from "next/image";

const Product = ({ product, cardSmall }) => {
  const { addToCart, qty } = useStateContext();

  const buyNow = (e) => {
    e.preventDefault();
    addToCart(product, qty);
  };

  return (
    <motion.div
      className={`product-card ${
        cardSmall === true ? "small-card" : ""
      }`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <Link href={`/product/${product.slug.current}`}>
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
          <button className="product-card__buy-now">
            <FaCartPlus
              fontSize={cardSmall === true ? "2.3rem" : "3rem"}
              color="#333"
              onClick={buyNow}
            />
          </button>
        </div>
        <button className="product-card__add-to-wishlist">
          <FaRegHeart
            fontSize={cardSmall === true ? "1.5rem" : "2rem"}
          />
        </button>
      </Link>
    </motion.div>
  );
};

export default Product;
