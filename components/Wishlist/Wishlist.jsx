"use client";

import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import Image from "next/image";
import React, { useState } from "react";

const Wishlist = () => {
  const { wishlist } = useStateContext();

  const [modal, setModal] = useState(false);

  console.log(wishlist);

  return (
    <div className="wishlist-container">
      <h3 onClick={() => setModal(!modal)}>Wishlist</h3>
      <swiper-container slides-per-view="3">
        {wishlist.map((item) => (
          <div className="wishlist-container__item" key={item._id}>
            <swiper-slide>
              <Image
                src={urlFor(item.image[0]).toString()}
                width={100}
                height={100}
                alt=""
              />
              <h3>{item.name}</h3>
              <div>{item.price}</div>
            </swiper-slide>
          </div>
        ))}
      </swiper-container>
    </div>
  );
};

export default Wishlist;
