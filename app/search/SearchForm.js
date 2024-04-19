import React from "react";

import getProducts from "../../lib/utils";

import Search from "../../components/Search/Search";

export default async function SearchForm({ mobile }) {
  const products = await getProducts();

  return <Search products={products} mobile={mobile} />;
}
