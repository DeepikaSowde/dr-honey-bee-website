import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- HELPER: Get a consistent ID ---
  // This solves the issue where some items have 'id' and others '_id'
  const getProductId = (product) => product._id || product.id;

  // --- 1. ADD TO CART ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      const targetId = getProductId(product);

      // Check if item is already in cart using the safe ID
      const existingItem = prev.find((item) => getProductId(item) === targetId);

      if (existingItem) {
        // If yes, increase quantity
        return prev.map((item) =>
          getProductId(item) === targetId
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      } else {
        // If no, add new item
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // --- 2. REMOVE FROM CART ---
  const removeFromCart = (idToRemove) => {
    setCartItems((prev) =>
      prev.filter((item) => getProductId(item) !== idToRemove),
    );
  };

  // --- 3. UPDATE QUANTITY ---
  const updateQuantity = (idToUpdate, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        getProductId(item) === idToUpdate
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  // --- 4. CLEAR CART ---
  const clearCart = () => setCartItems([]);

  // --- 5. CALCULATE TOTAL ITEMS ---
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
