"use client";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [searchBar, setSearchBar] = useState(false);
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [userModal, setUserModal] = useState(false);

  //Handling localStorage logic
  useEffect(() => {
    const initialCartItems = getLocalStorageItem("shoppingBag", []);
    const initialTotalQuantities = getLocalStorageItem("totalQty", 0);
    const initialTotalPrice = getLocalStorageItem("totalPrice", 0);
    const initialWishlist = getLocalStorageItem("wishlist", []);

    if (initialCartItems.length !== 0) {
      setCartItems(initialCartItems);
      setTotalQuantities(initialTotalQuantities);
      setTotalPrice(initialTotalPrice);
    }
    if (initialWishlist.length !== 0) {
      setWishlist(initialWishlist);
    }
  }, []);

  useEffect(() => {
    if (cartItems.length !== 0) {
      setLocalStorageItem("shoppingBag", cartItems);
      setLocalStorageItem("totalQty", totalQuantities);
      setLocalStorageItem("totalPrice", totalPrice);
    }
  }, [cartItems]);

  useEffect(() => {
    if (wishlist.length !== 0) {
      setLocalStorageItem("wishlist", wishlist);
    }
  }, [wishlist]);

  // useEffect(() => {
  //   setLocalStorageItem("wishlist", wishlist);
  // }, [wishlist]);

  // useEffect(() => {
  //   const shoppingCartInLocalStorage =
  //     localStorage.getItem("shoppingBag");
  //   const totalQuantityInLocalStorage =
  //     localStorage.getItem("totalQty");
  //   const totalPriceInLocalStorage =
  //     localStorage.getItem("totalPrice");
  //   const wishlistInLocalStorage = localStorage.getItem("wishlist");
  //   if (shoppingCartInLocalStorage) {
  //     console.log("Fetching items from local storage");
  //     setCartItems(JSON.parse(shoppingCartInLocalStorage));
  //     setTotalQuantities(JSON.parse(totalQuantityInLocalStorage));
  //     setTotalPrice(JSON.parse(totalPriceInLocalStorage));
  //   }
  //   if (wishlistInLocalStorage) {
  //     console.log("Fetching wishlist from local storage");
  //     setWishlist(JSON.parse(wishlistInLocalStorage));
  //   }
  // }, []);

  // useEffect(() => {
  //   //This code will only run when add product to cart
  //   if (cartItems.length > 0) {
  //     const shoppingCartInLocalStorage =
  //       localStorage.getItem("shoppingBag");
  //     if (shoppingCartInLocalStorage) {
  //       localStorage.setItem(
  //         "shoppingBag",
  //         JSON.stringify(...[cartItems])
  //       );
  //       localStorage.setItem("totalQty", totalQuantities);
  //       localStorage.setItem("totalPrice", totalPrice);
  //     } else {
  //       localStorage.setItem(
  //         "shoppingBag",
  //         JSON.stringify(cartItems)
  //       );
  //       localStorage.setItem("totalQty", totalQuantities);
  //       localStorage.setItem("totalPrice", totalPrice);
  //     }
  //   }
  // }, [cartItems]);

  // useEffect(() => {
  //   if (wishlist.length > 0) {
  //     const wishlistInLocalStorage = localStorage.getItem("wishlist");
  //     if (wishlistInLocalStorage) {
  //       localStorage.setItem(
  //         "wishlist",
  //         JSON.stringify([...wishlist])
  //       );
  //     } else {
  //       localStorage.setItem("wishlist", JSON.stringify(wishlist));
  //     }
  //   }
  // }, [wishlist]);
  // Update localStorage when wishlist changes

  //
  //Adding item to cart
  //

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevQuantity) => prevQuantity + quantity);

    if (checkProductInCart) {
      //If you have product in cart and you choose to add the same product
      //this will just increase the quantiy and total price insetad
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} x ${product.name} added to cart`, {
      position: "top-center",
      duration: 2000,
      style: { marginTop: "4rem" },
    });
    setQty(1);
  };

  const addToWishlist = (product) => {
    const checkProductInWishlist = wishlist.find(
      (item) => product._id === item._id
    );
    if (checkProductInWishlist) {
      console.log("Product alreadt on wishlist");
    } else {
      setWishlist([...wishlist, { ...product }]);
      toast.success(`${product.name} added to wishlist`, {
        position: "top-center",
        style: { marginTop: "4rem" },
      });
    }
  };

  console.log("Wishlist: ", wishlist);
  console.log("Cart items: ", cartItems);

  //
  // Removing cart item
  //
  const removeItem = (product) => {
    let matchingProduct = cartItems.find(
      (item) => item._id === product._id
    );

    const newCardItems = cartItems.filter(
      (item) => item._id !== product._id
    );

    //New card items in remove function

    setTotalPrice(
      (prev) =>
        prev - matchingProduct.price * matchingProduct.quantity
    );
    setTotalQuantities((prev) => prev - matchingProduct.quantity);
    // localStorage.removeItem("shoppingBag", matchingProduct);
    setCartItems(newCardItems);
    localStorage.removeItem("shoppingBag", matchingProduct);
  };

  //
  // Updating cart item quantity when you add item to cart that already exists
  //

  const updateCartItemQuantity = (id, value) => {
    const matchingProductIndex = cartItems.findIndex(
      (product) => product._id === id
    );

    if (matchingProductIndex !== -1) {
      const updatedCartItems = [...cartItems];
      const matchingProduct = {
        ...updatedCartItems[matchingProductIndex],
      };

      if (value === "increment") {
        matchingProduct.quantity++;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + matchingProduct.price
        );
        setTotalQuantities((prev) => prev + 1);
      } else if (
        value === "decrement" &&
        matchingProduct.quantity > 1
      ) {
        matchingProduct.quantity--;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - matchingProduct.price
        );
        setTotalQuantities((prev) => prev - 1);
      }

      updatedCartItems[matchingProductIndex] = matchingProduct;
      setCartItems(updatedCartItems);
    }
  };

  const increaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = (e) => {
    e.stopPropagation();
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowMenu,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
        updateCartItemQuantity,
        removeItem,
        searchBar,
        setSearchBar,
        category,
        setCategory,
        userModal,
        setUserModal,
        addToWishlist,
        wishlist,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
