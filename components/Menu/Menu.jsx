import React from "react";

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

const Menu = () => {
  return (
    <motion.div
      className="menu-container"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={menuSlide}
    >
      <div className="menu-container__avatar">
        <div className="menu-container__avatar__bg">
          <IoPersonCircleOutline
            style={{ color: "#fff" }}
            className="menu-container__avatar__bg__profile-image"
          />
          <h3 className="menu-container__avatar__bg__login-data">
            Welcome back,
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
