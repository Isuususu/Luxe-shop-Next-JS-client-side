"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

//Icons
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { TbSquareRoundedMinusFilled } from "react-icons/tb";

import Reviews from "../../../components/Reviews/Reviews";
import Product from "../../../components/ProductCard/Product";

import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import { useStateContext } from "../../../context/StateContext";
import { urlFor } from "../../../lib/client";
import Image from "next/image";

//Swiper
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import the Swiper styles

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

const ProductDetails = ({ product, products }) => {
  console.log(product);
  const [imageIndex, setImageIndex] = useState(0);
  const { increaseQty, decreaseQty, qty, addToCart, setShowCart } =
    useStateContext();
  const { image, name, details, price, category, specification } =
    product[0];
  const [productDetailsRevealed, setProductDetailsRevealed] =
    useState(false);
  const [fullSpecificationOpen, setFullSpecificationOpen] =
    useState(false);
  const handleBuyNow = () => {
    addToCart(product, qty);
    setShowCart(true);
  };
  const revealProductDescription = () => {
    setProductDetailsRevealed(!productDetailsRevealed);
    const descContainer = document.getElementById("desc");
    if (!productDetailsRevealed) {
      descContainer.classList.add("product-desc-reveal");
    } else {
      descContainer.classList.remove("product-desc-reveal");
    }
    setFullSpecificationOpen(false);
  };
  const renderSpecification = (item) => {
    const itemChildren = item.children.map((item) => item);
    console.log(itemChildren);
  };

  return (
    <h1>dsdasdas</h1>
    // <section className="product-detail-container">
    //   <button className="product-detail-container__back-button">
    //     <Link href="/">
    //       <FaArrowLeft style={{ fontSize: "2.4rem" }} />
    //     </Link>
    //     {/* <span>{category && category[0]}</span> */}
    //   </button>
    //   {/* <Image
    //     src={urlFor(image[imageIndex]).toString()}
    //     alt=""
    //     fill
    //     className="product-detail-container__image"
    //   />
    //   <img
    //     src={urlFor(image[imageIndex])}
    //     alt=""
    //     className="product-detail-container__image"
    //   />
    //   <div className="product-detail-container__slides">
    //     {image?.map((item, index) => (
    //       <Image
    //         src={urlFor(item).toString()}
    //         alt=""
    //         fill
    //         className={`product-detail-container__slides__slide ${
    //           index === imageIndex ? "selected-slide" : ""
    //         }`}
    //         onMouseEnter={() => setImageIndex(index)}
    //         key={index}
    //       />
    //     ))}
    //   </div> */}
    //   <div className="product-detail-container__reviews">
    //     <Reviews
    //       stars={product.stars}
    //       ratings={product.ratings}
    //       cardSmall={product.cardSmall}
    //     />
    //   </div>
    //   <button className="product-detail-container__add-to-wishlist">
    //     <FaRegHeart fontSize="2rem" />
    //   </button>
    //   <div className="product-detail-container__details">
    //     <h2 className="product-detail-container__details__name">
    //       {name}
    //     </h2>
    //     <div className="product-detail-container__details__buying-options">
    //       <h3 className="product-detail-container__details__buying-options__price">
    //         £{price}
    //       </h3>
    //       <button
    //         type="button"
    //         className="product-detail-container__details__buying-options__add-to-cart"
    //         onClick={() => addToCart(product, qty)}
    //       >
    //         <span className="product-detail-container__details__buying-options__qty">
    //           <TbSquareRoundedMinusFilled
    //             onClick={decreaseQty}
    //             style={{ fontSize: "2.2rem" }}
    //             className={`product-detail-container__details__buying-options__qty__button ${
    //               qty === 1 ? "btn-not-allowed" : ""
    //             }`}
    //           />
    //           <p className="product-detail-container__details__buying-options__qty__value">
    //             {qty}
    //           </p>
    //           <TbSquareRoundedPlusFilled
    //             onClick={increaseQty}
    //             style={{ fontSize: "2.2rem" }}
    //             className={`product-detail-container__details__buying-options__qty__button`}
    //           />
    //         </span>
    //         Add to cart
    //         <FaBagShopping style={{ fontSize: "1.4rem" }} />
    //       </button>
    //     </div>
    //     <div
    //       className="product-detail-container__details__desc"
    //       id="desc"
    //     >
    //       <p>{details}</p>
    //       {!fullSpecificationOpen && (
    //         <button
    //           onClick={() => setFullSpecificationOpen(true)}
    //           className="product-detail-container__details__desc__show-spec"
    //         >
    //           Full specification
    //           <IoMdArrowRoundDown />
    //         </button>
    //       )}
    //       {fullSpecificationOpen && (
    //         <motion.div
    //           className="product-detail-container__specification"
    //           initial={{ opacity: 0, maxHeight: 0 }}
    //           animate={{ opacity: 1, maxHeight: "200vh" }}
    //         >
    //           <h3>Specification</h3>
    //           {/* Sanity library to display rich text fields */}
    //           <BlockContent blocks={specification} />
    //         </motion.div>
    //       )}
    //     </div>
    //     {/* <button
    //         onClick={() => revealProductDescription()}
    //         className="product-detail-container__details__more-btn"
    //       >
    //         {!productDetailsRevealed ? (
    //           <IoMdArrowRoundDown style={{ fontSize: "2rem" }} />
    //         ) : (
    //           <IoMdArrowRoundUp style={{ fontSize: "2rem" }} />
    //         )}
    //       </button> */}
    //   </div>
    //   <div className="product-detail-container__related">
    //     <h2>You may also like</h2>
    //     <div className="product-detail-container__related__slider">
    //       <Swiper
    //         slidesPerView={2}
    //         spaceBetween={20}
    //         autoplay={true}
    //         speed={500}
    //         loop={true}
    //         cssMode={true}
    //       >
    //         {products.map((item) => (
    //           <SwiperSlide key={item._id}>
    //             <Product
    //               key={item._id}
    //               product={item}
    //               cardSmall={true}
    //             />
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>
    //     </div>
    //   </div>
    // </section>
  );
};

export default ProductDetails;
