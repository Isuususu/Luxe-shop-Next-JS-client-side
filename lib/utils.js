import { client } from "../lib/client";
import { UAParser } from "ua-parser-js";

//Fetch products from Sanity client
export default async function getProducts() {
  const query = '*[_type=="product" && !(_id in path("drafts.**"))]';
  const products = await client.fetch(query);

  return products;
}

//Fetch single product from Sanity client
export async function getProduct(slug) {
  const query = `*[_type == 'product' && slug.current == $slug][0]`;
  const productData = await client.fetch(query, { slug: slug });
  return productData;
}

export const isMobileDevice = (header) => {
  if (typeof process === "undefined") {
    throw new Error(
      "[Server method] you are importing a server-only module outside of server"
    );
  }

  const { get } = header;
  const ua = get("user-agent");

  const device = new UAParser(ua || "").getDevice();

  return device.type === "mobile";
};

export const getLocalStorageItem = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(
        `Error parsing local storage key "${key}":`,
        error
      );
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
};

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
