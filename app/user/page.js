import Image from "next/image";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Wishlist from "../../components/Wishlist/Wishlist";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

import { MdAccountBox } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";

import { FaSignOutAlt } from "react-icons/fa";

import { MdEditDocument } from "react-icons/md";

import { FaList } from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";

import SignoutButton from "../../components/_buttons/SignoutButton/SignoutButton";
import { isMobileDevice } from "@/lib/utils";
import { headers } from "next/headers";

export default async function ProfileClient() {
  const session = await getServerSession(options);

  console.log(session);

  const mobile = isMobileDevice(headers());

  return (
    <div className={`user-page ${!mobile && "desktop__user-page"}`}>
      {/* <div className="square"></div> */}
      <div className="user-page__navigation">
        <Link href="/">
          <FaArrowLeft className="user-page__navigation__back-button" />
        </Link>
        <h3 className="user-page__navigation__title">User profile</h3>
      </div>

      <div className="user-page__header">
        <div style={{ position: "relative" }}>
          <Image
            className="user-page__header__image"
            src="/images/user-avatar.jpg"
            alt=""
            width={100}
            height={100}
          />
          <button className="user-page__header__edit-button">
            <MdEditDocument style={{ color: "white" }} />
          </button>
        </div>

        <h3>{session.user.name}</h3>
      </div>
      <div className="user-page__menu">
        <div className="flex-center user-page__menu__item">
          <FaUserAlt className="icon" />
          <h4>Account details</h4>
          <IoIosArrowForward
            className="icon"
            style={{ marginLeft: "auto" }}
          />
        </div>

        <Link
          href="/user/wishlist"
          className="flex-center user-page__menu__item"
        >
          <FaHeart className="icon" />
          <h4>Wishlist</h4>
          <IoIosArrowForward
            className="icon"
            style={{ marginLeft: "auto" }}
          />
        </Link>
        <Link
          href="/user/wishlist"
          className="flex-center user-page__menu__item"
        >
          <FaList className="icon" />
          <h4>Orders</h4>
          <IoIosArrowForward
            className="icon"
            style={{ marginLeft: "auto" }}
          />
        </Link>
      </div>
      <SignoutButton />
    </div>
  );
}
