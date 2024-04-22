import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useStateContext } from "../../context/StateContext";
import { AnimatePresence } from "framer-motion";
import Cart from "../Cart/Cart";

const ShoppingCartIcon = () => {
  //Check is user using mobile device or desktop to define layout
  const [windowWidth, setWindowWidth] = useState("");

  const { totalQuantities, showCart, setShowCart } =
    useStateContext();

  useEffect(() => {
    if (typeof window != "undefined") {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    }
  }, [windowWidth]);
  const mobile = windowWidth < 500;

  return (
    <>
      <AnimatePresence mode="wait">
        {showCart && <Cart key={"shopping-cart"} mobile={mobile} />}
      </AnimatePresence>
      {!showCart && (
        <button
          className={`shopping-cart-icon ${
            mobile === false ? "shopping-cart-icon__desktop" : ""
          }`}
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingBag style={{ fontSize: "2.3rem" }} />

          <span className="shopping-cart-icon__qty">
            {totalQuantities}
          </span>
        </button>
      )}
    </>
  );
};

export default ShoppingCartIcon;
