import React from "react";
import Link from "next/link";
import { urlFor } from "../../lib/client";

const FooterBanner = ({
  footerBanner: { smallText, midText, largeText1, image, product },
}) => {
  return (
    <div className="footer-banner-container">
      <p className="footer-banner-container__small-text">
        {smallText}
      </p>
      <h3 className="footer-banner-container__med-text">{midText}</h3>
      <h1 className="footer-banner-container__large-text">
        {largeText1}
      </h1>

      <img
        src={urlFor(image)}
        className="footer-banner-container__image"
      />
      <Link href={`/product/${product}`}>
        <button
          type="button"
          className="footer-banner-container__button"
        >
          Shop now
        </button>
      </Link>
    </div>
  );
};

export default FooterBanner;
