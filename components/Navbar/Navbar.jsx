"use client";
import React, { forwardRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStateContext } from "../../context/StateContext";

//Animations
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

//Components
import Menu from "../Menu/Menu";
import Search from "../Search/Search";
import UserModal from "../UserModal/UserModal";
import Image from "next/image";

//Icons
import { TiThMenu } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import { HiMiniHome } from "react-icons/hi2";
import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";

const Navbar = forwardRef(({ mobile, user }, ref) => {
  Navbar.displayName = "Navbar";
  const {
    showMenu,
    setShowMenu,
    searchBar,
    userModal,
    setUserModal,
  } = useStateContext();

  //Keep navbar bottom hidden on product page
  const pathname = usePathname();
  const showNavbarBottom = pathname === "/product";
  const searchBarOnUserPage = pathname.startsWith("/user");
  console.log(searchBarOnUserPage);

  useEffect(() => {
    const navbarTop = document.getElementById("navbar-top");
    if (searchBarOnUserPage) {
      navbarTop.classList.add("navbar-transition");
    } else {
      navbarTop.classList.remove("navbar-transition");
    }
  }, [searchBarOnUserPage]);

  //Handling navbar top animation
  const { scrollY } = useScroll(
    mobile === false && { container: ref }
  );
  useMotionValueEvent(scrollY, "change", (latest) => {
    const navbarTop = document.getElementById("navbar-top");
    if (searchBar) {
      return;
    }
    if (latest >= 100) {
      navbarTop.classList.add("navbar-transition");
    } else {
      navbarTop.classList.remove("navbar-transition");
    }
  });

  return (
    <>
      <div
        id="navbar-top"
        className={`navbar-top ${
          mobile === false ? "desktop__navbar-top" : ""
        } ${searchBar ? "navbar-full-width" : ""}`}
      >
        <Search mobile={mobile} />
        <ShoppingCartIcon />

        {/* <Image
          className="user-img"
          src="/images/user-avatar.png"
          alt=""
          width={40}
          height={40}
          onClick={() => setUserModal(!userModal)}
        />
        <AnimatePresence mode="wait">
          {userModal && <UserModal user={user} />}
        </AnimatePresence> */}
      </div>
      {!showNavbarBottom ? (
        <div
          className={`navbar-bottom ${
            mobile === false ? "desktop__navbar-bottom" : ""
          }`}
        >
          <Link href="/user">
            <button className="navbar-bottom__cart-icon">
              <FaUser
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

          <AnimatePresence mode="wait">
            {showMenu && <Menu key={"menu"} />}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
});

export default Navbar;
