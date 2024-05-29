import React from "react";
import Wishlist from "../../../components/Wishlist/Wishlist";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { headers } from "next/headers";
import { isMobileDevice } from "@/lib/utils";

export default function page() {
  const mobile = isMobileDevice(headers());
  return (
    <div className={`user-page ${!mobile && "desktop__user-page"}`}>
      {/* <div className="square"></div> */}
      <div className="user-page__navigation">
        <Link href="/user">
          <FaArrowLeft className="user-page__navigation__back-button" />
        </Link>
        <h3 className="user-page__navigation__title">Wishlist</h3>
      </div>
      <Wishlist />
    </div>
  );
}
