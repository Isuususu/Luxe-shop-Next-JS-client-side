"use client";

import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import Image from "next/image";
import React, { useState } from "react";

const Wishlist = () => {
  const { wishlist } = useStateContext();

  console.log(wishlist);

  return (
    <div className="wishlist-container">
      {wishlist.map((item) => (
        <div className="wishlist-container__item" key={item._id}>
          <Image
            src={urlFor(item.image[0]).toString()}
            width={100}
            height={100}
            alt=""
          />
          <div className="wishlist-container__item__details">
            <p className="wishlist-container__item__details__name">
              {item.name}
            </p>
            <h3>£{item.price}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
