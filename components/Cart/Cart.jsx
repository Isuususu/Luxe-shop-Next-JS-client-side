"use client";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import CartItem from "../CartItem/CartItem";
import getStripe from "../../lib/getStripe";

//Icons
import { FaShoppingBag } from "react-icons/fa";

//Animations
import { AnimatePresence, motion } from "framer-motion";
import { cartSlide } from "../../styles/animations";

const Cart = ({ mobile }) => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    setShowCart,
    showCart,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/stripe_checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    if (!res) {
      console.error("Failed to fetch data:", res.statusText);
      return;
    }
    const session = await res.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <motion.div
      className={`cart-container ${
        mobile === false ? "desktop__cart-container" : ""
      }`}
      ref={cartRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={cartSlide}
    >
      <div className="cart-container__header">
        <h3>Your cart</h3>
        <button
          className="shopping-cart-icon left"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingBag style={{ fontSize: "2.3rem" }} />

          <span className="shopping-cart-icon__qty">
            {totalQuantities}
          </span>
        </button>
      </div>
      <div className="cart-container__products_wrapper">
        <AnimatePresence>
          {cartItems.length > 0 ? (
            cartItems?.map((item, index) => (
              <CartItem key={item._id} item={item} />
            ))
          ) : (
            <div className="cart-container__empty-basket-msg">
              <h2>No items yet</h2>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="cart-container__footer">
        <h3 className="cart-container__footer__total-price">
          Total:{" "}
        </h3>
        <h3>£{totalPrice}</h3>
        <button
          className="cart-container__footer__pay-btn"
          onClick={handleCheckout}
        >
          Proceed to checkout
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
