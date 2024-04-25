import React from "react";
import { urlFor } from "../../lib/client";

//Icons
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useStateContext } from "../../context/StateContext";

//Animations
import { motion } from "framer-motion";
import Image from "next/image";
import { cartProductAnimation } from "../../styles/animations";

const CartItem = ({ item }) => {
  const { updateCartItemQuantity, removeItem } = useStateContext();

  return (
    <motion.div
      className="cart-container__product"
      variants={cartProductAnimation}
      initial="visible"
      exit="exit"
    >
      <Image
        fill
        src={urlFor(item.image[0]).toString()}
        alt=""
        className="cart-container__product__image"
      />
      <div className="cart-container__product__desc">
        <h3 className="cart-container__product__desc__name">
          {item?.name}
        </h3>
        <p className="cart-container__product__desc__price">
          £{item?.price}
        </p>
        <div className="cart-container__product__desc__qty">
          <button
            onClick={() =>
              updateCartItemQuantity(item._id, "decrement")
            }
            className="cart-container__product__desc__qty__button"
          >
            <FaMinusSquare
              style={{ fontSize: "1.8rem", color: "#f27012" }}
            />
          </button>
          <p className="cart-container__product__desc__qty__value">
            {item?.quantity}
          </p>
          <button
            onClick={() =>
              updateCartItemQuantity(item._id, "increment")
            }
            className="cart-container__product__desc__qty__button"
          >
            <FaPlusSquare
              style={{ fontSize: "1.8rem", color: "#f27012" }}
            />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item)}
        className="cart-container__product__delete-btn"
      >
        <RiDeleteBin6Fill
          style={{ fontSize: "2rem", color: "#333" }}
        />
      </button>
    </motion.div>
  );
};

export default CartItem;
