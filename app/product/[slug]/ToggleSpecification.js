"use client";
import React, { useState } from "react";

import { IoMdArrowRoundDown } from "react-icons/io";

import { motion } from "framer-motion";

import BlockContent from "@sanity/block-content-to-react";

const ToggleSpecification = ({ product }) => {
  const [fullSpecificationOpen, setFullSpecificationOpen] =
    useState(false);

  return (
    <>
      {!fullSpecificationOpen && (
        <button
          onClick={() => setFullSpecificationOpen(true)}
          className="product-detail-container__details__desc__show-spec"
        >
          Full specification
          <IoMdArrowRoundDown />
        </button>
      )}
      {fullSpecificationOpen && (
        <motion.div
          className="product-detail-container__specification"
          initial={{ opacity: 0, maxHeight: 0 }}
          animate={{ opacity: 1, maxHeight: "200vh" }}
        >
          <h3>Specification</h3>

          <BlockContent blocks={product[0].specification} />
        </motion.div>
      )}
    </>
  );
};

export default ToggleSpecification;
