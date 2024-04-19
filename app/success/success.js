import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useStateContext } from "../../context/StateContext";

import { runConfetti } from "../../lib/utils";

const Succsess = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runConfetti();
  }, []);

  return (
    <div className="success-page">
      <h3>Payment successful</h3>
      <p>Check your email for the receipt.</p>
      <Link href="/">
        <button>Continue shopping</button>
      </Link>
    </div>
  );
};

export default Succsess;
