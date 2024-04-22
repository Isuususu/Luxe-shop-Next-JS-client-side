import React, { useEffect, useState } from "react";

//Icons
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";

import { motion } from "framer-motion";
import { cartSlide, menuSlide } from "../../styles/animations";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const Menu = () => {
  const user = useUser();

  //Check is user using mobile device or desktop to define layout
  const [windowWidth, setWindowWidth] = useState("");
  useEffect(() => {
    if (typeof window != "undefined") {
      const windowWidth = window.innerWidth;
      setWindowWidth(windowWidth);
    }
  }, [windowWidth]);
  const mobile = windowWidth < 500;

  const { showMenu, setShowMenu } = useStateContext();

  //Close menu if user click outside od menu container
  window.addEventListener("mouseup", function (e) {
    const container = document.getElementById("menu-container");
    if (container) {
      if (e.target != container && e.target.parentNode != container) {
        setShowMenu(false);
      }
    } else {
      return;
    }
  });

  return (
    <motion.div
      className={`menu-container ${
        mobile === false ? "desktop-menu-container" : ""
      }`}
      id="menu-container"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={menuSlide}
    >
      <div className="menu-container__avatar">
        <div
          className={`menu-container__avatar__bg ${
            mobile === false ? "desktop-menu-container__avatar" : ""
          }`}
        >
          <Image
            className="menu-container__avatar__bg__profile-image"
            alt=""
            src={user.user.picture}
            fill
          />

          <h3 className="menu-container__avatar__bg__login-data">
            Welcome back, {user.user.nickname}
          </h3>
        </div>
      </div>

      <ul className="menu-container__nav">
        <li className="menu-container__nav__item">
          <FaHome />
          Home
        </li>
        <li className="menu-container__nav__item">
          <BiSolidCategory />
          Products
        </li>
        <Link href="/user">
          <li className="menu-container__nav__item">
            <IoPerson />
            My account
          </li>
        </Link>
        <li className="menu-container__nav__item">
          <FaListCheck />
          Wishlist
        </li>
      </ul>
    </motion.div>
  );
};

export default Menu;
