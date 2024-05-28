import React from "react";
import { client, urlFor } from "../../../lib/client";
//Sanity library to display rich text fields

import Link from "next/link";

import ToggleSpecification from "../[slug]/ToggleSpecification";
import RelatedProducts from "../[slug]/RelatedProducts";
import ProductImages from "../[slug]/ProductImages";
import AddToCart from "../[slug]/AddToCart";

//Icons
import { FaRegHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

import getProducts from "../../../lib/utils";
import Reviews from "../../../components/Reviews/Reviews";
import Footer from "../../../components/Footer/Footer";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

export default async function Page({ params }) {
  const { slug } = params;
  const query = `*[_type == "product" && slug.current == $slug]`;
  const product = await client.fetch(query, { slug });

  const products = await client.fetch("*[_type == 'product']");

  const {
    name,
    stars,
    ratings,
    cardSmall,
    price,
    details,
    category,
  } = product[0];

  console.log("Product details SSR test");

  return (
    <>
      <section className="product-detail-container">
        <button className="product-detail-container__back-button">
          <Link href="/">
            <FaArrowLeft style={{ fontSize: "2.4rem" }} />
          </Link>
        </button>

        <ProductImages product={product} />
        <div className="product-detail-container__reviews">
          <Reviews
            stars={stars}
            ratings={ratings}
            cardSmall={cardSmall}
          />
        </div>
        <button className="product-detail-container__add-to-wishlist">
          <FaRegHeart fontSize="2rem" />
        </button>
        <div className="product-detail-container__details">
          <h2 className="product-detail-container__details__name">
            {name}
          </h2>
          <div className="product-detail-container__details__buying-options">
            <h3 className="product-detail-container__details__buying-options__price">
              £{price}
            </h3>
            <AddToCart product={product} />
          </div>
          <div
            className="product-detail-container__details__desc"
            id="desc"
          >
            <p>{details}</p>
            <ToggleSpecification product={product} />
          </div>
        </div>
        <div className="product-detail-container__related">
          <h2>You may also like</h2>
          <div className="product-detail-container__related__slider">
            <RelatedProducts products={products} />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
