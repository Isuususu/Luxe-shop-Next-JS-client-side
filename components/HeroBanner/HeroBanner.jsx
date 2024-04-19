import Link from "next/link";
import React from "react";

import { urlFor } from "../../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <p className="hero-banner-container__small-text">
        {heroBanner.smallText}
      </p>
      <h3 className="hero-banner-container__med-text">
        {heroBanner.midText}
      </h3>
      <h1 className="hero-banner-container__large-text">
        {heroBanner.largeText1}
      </h1>
      <img
        src={urlFor(heroBanner.image)}
        alt=""
        className="hero-banner-container__image"
      />

      <Link href={`/product/${heroBanner.product}`}>
        <button
          type="button"
          className="hero-banner-container__button"
        >
          {heroBanner.buttonText}
        </button>
      </Link>
      <p className="hero-banner-container__discount">
        {heroBanner.discount}
      </p>
      <div className="hero-banner-container__desc">
        <p>{heroBanner.desc}</p>
      </div>
    </div>
  );
};

export default HeroBanner;
