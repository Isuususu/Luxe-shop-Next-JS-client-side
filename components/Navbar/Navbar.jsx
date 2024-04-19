"use client";
import React from "react";
import Link from "next/link";

//Icons
import { FaShoppingBag } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import { IoNotifications } from "react-icons/io5";
import { HiMiniHome } from "react-icons/hi2";

import Cart from "../Cart/Cart";
import { useStateContext } from "../../context/StateContext";
import { AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";
import Menu from "../Menu/Menu";

import { motion } from "framer-motion";
import { client } from "../../lib/client";
import Search from "../Search/Search";
import { usePathname, useRouter } from "next/navigation";
// import { UserButton } from "@clerk/nextjs";

const Navbar = ({ mobile }) => {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    showMenu,
    setShowMenu,
    user,
    searchBar,
  } = useStateContext();

  const pathname = usePathname();

  const showNavbarBottom = pathname.startsWith("/product");

  return (
    <>
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
      <AnimatePresence mode="wait">
        {showCart && <Cart key={"shopping-cart"} mobile={mobile} />}
      </AnimatePresence>

      {!showNavbarBottom ? (
        <div
          className={`navbar-bottom ${
            mobile === false ? "desktop__navbar-bottom" : ""
          }`}
        >
          <Link href="/user/user">
            <button className="navbar-bottom__cart-icon">
              <IoNotifications
                style={{ fontSize: "1.7rem", color: "#474747" }}
              />
            </button>
          </Link>

          <Link href="/">
            <button className="navbar-bottom__cart-icon">
              <HiMiniHome
                style={{ fontSize: "2rem", color: "#474747" }}
              />
            </button>
          </Link>
          <button
            className="navbar-bottom__menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <TiThMenu />
          </button>
          {/* <button
            className="shopping-cart-icon"
            onClick={() => setShowCart(!showCart)}
          >
            <FaShoppingBag style={{ fontSize: "2.3rem" }} />

            <span className="shopping-cart-icon__qty">
              {totalQuantities}
            </span>
          </button> */}

          <AnimatePresence mode="wait">
            {showMenu && <Menu key={"menu"} />}
            {/* {showCart && <Cart key={"shopping-cart"} />} */}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
