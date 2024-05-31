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
