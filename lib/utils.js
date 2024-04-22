import { client } from "../lib/client";

//Fetch products from Sanity client
export default async function getProducts() {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);

  return products;
}

//Fetch single product from Sanity client
export async function getProduct(slug) {
  const query = `*[_type == 'product' && slug.current == $slug][0]`;
  const productData = await client.fetch(query, { slug: slug });
  return productData;
}
