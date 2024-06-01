import React from "react";
import getProducts, { isMobileDevice } from "../lib/utils";

//Components
import CategorySelector from "../components/CategorySelector/CategorySelector";
import Footer from "../components/Footer/Footer";
import BestsellersFeed from "../components/BestsellersFeed/BestsellersFeed";
import ProductsFeed from "../components/ProductsFeed/ProductsFeed";

import { headers } from "next/headers";

import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/client";

export default async function Index() {
  const products = await getProducts();

  const mobile = isMobileDevice(headers());

  console.log("Testing SSR on homepage");

  return (
    <div
      className={`page ${!mobile && "desktop__home-container"}`}
      id="home-container"
    >
      <h2 className="home-container__headline">Bestsellers</h2>
      <BestsellersFeed products={products} />
      <div className="home-container__banner">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h3 className="home-container__banner__title">
            Headphones on sale!
          </h3>
          <p className="home-container__banner__desc">
            Discount 50% for the first transaction
          </p>
          <button className="home-container__banner__button">
            Shop now
          </button>
        </div>
        <Image
          src={urlFor(
            products[0].image && products[0].image[0]
          ).toString()}
          fill
          className="home-container__banner__image"
          alt=""
        />
      </div>
      <div className="flex-center">
        <h2 className="home-container__headline">Products</h2>
        <Link
          href="/products"
          className="home-container__headline__link"
        >
          <p>All</p>
          <IoIosArrowForward className="icon" />
        </Link>
      </div>

      <CategorySelector />
      <ProductsFeed products={products} />
      <Footer />
    </div>
  );
}
