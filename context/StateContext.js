"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

const Context = createContext();

//Get values from localStorage if they exist
if (typeof window !== "undefined") {
  const cartLocalStorage = JSON.parse(
    localStorage.getItem("shoppingBag") || "[]"
  );
  const totalQuantitiesLocalStorage = JSON.parse(
    localStorage.getItem("totalQuantity") || "0"
  );
  const totalPriceLocalStorage = JSON.parse(
    localStorage.getItem("totalPrice") || "0"
  );
}

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItems, setCartItems] = useState(cartLocalStorage);
  const [totalPrice, setTotalPrice] = useState(
    totalPriceLocalStorage
  );
  const [totalQuantities, setTotalQuantities] = useState(
    totalQuantitiesLocalStorage
  );
  const [qty, setQty] = useState(1);

  const [searchBar, setSearchBar] = useState(false);

  let matchingProduct;
  let matchingProductIndex;

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
      style: { marginTop: "10vh" },
    });
    setQty(1);
  };

  //Handling local storage
  useEffect(() => {
    localStorage.setItem("shoppingBag", JSON.stringify(cartItems));
    localStorage.setItem(
      "totalQuantity",
      JSON.stringify(totalQuantities)
    );
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cartItems]);

  //
  // Removing cart item
  //
  const removeItem = (product) => {
    matchingProduct = cartItems.find(
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
