import React from "react";
import getProducts, { isMobileDevice } from "../lib/utils";

//Components
import CategorySelector from "../components/CategorySelector/CategorySelector";
import Footer from "../components/Footer/Footer";
import BestsellersFeed from "../components/BestsellersFeed/BestsellersFeed";
import ProductsFeed from "../components/ProductsFeed/ProductsFeed";

import { headers } from "next/headers";

export default async function Index() {
  const products = await getProducts();

  const mobile = isMobileDevice(headers());

  console.log("Testing SSR on homepage");

  return (
    <div
      className={`page ${!mobile && "desktop__home-container"}`}
      id="home-container"
    >
      <h2 className="home-container__headline">Best sellers</h2>
      <BestsellersFeed products={products} />
      <h2 className="home-container__headline">Explore our shop</h2>

      <CategorySelector />
      <ProductsFeed products={products} />

      <Footer />
    </div>
  );
}
