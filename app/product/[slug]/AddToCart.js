"use client";
import React from "react";

//Icons
import { TbSquareRoundedPlusFilled } from "react-icons/tb";
import { TbSquareRoundedMinusFilled } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";

import { useStateContext } from "../../../context/StateContext";

const AddToCart = ({ product }) => {
  const { addToCart, increaseQty, decreaseQty, qty } =
    useStateContext();

  return (
    <div>
      <button
        type="button"
        className="product-detail-container__details__buying-options__add-to-cart"
        onClick={() => addToCart(product[0], qty)}
      >
        <span className="product-detail-container__details__buying-options__qty">
          <TbSquareRoundedMinusFilled
            onClick={decreaseQty}
            style={{ fontSize: "2.2rem" }}
            className={`product-detail-container__details__buying-options__qty__button ${
              qty === 1 ? "btn-not-allowed" : ""
            }`}
          />
          <p className="product-detail-container__details__buying-options__qty__value">
            {qty}
          </p>
          <TbSquareRoundedPlusFilled
            onClick={increaseQty}
            style={{ fontSize: "2.2rem" }}
            className={`product-detail-container__details__buying-options__qty__button`}
          />
        </span>
        Add to cart
        <FaBagShopping style={{ fontSize: "1.4rem" }} />
      </button>
    </div>
  );
};

export default AddToCart;
