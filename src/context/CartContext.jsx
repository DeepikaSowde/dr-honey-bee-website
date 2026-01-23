import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from localStorage so items stick around on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- 1. ADD TO CART (With Quantity Logic) ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if item is already in cart
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        // If yes, just increase quantity by 1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      } else {
        // If no, add new item with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // --- 2. REMOVE FROM CART ---
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- 3. UPDATE QUANTITY (+ / - Buttons) ---
  const updateQuantity = (id, newQuantity) => {
    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // --- 4. CLEAR CART ---
  const clearCart = () => setCartItems([]);

  // --- 5. CALCULATE TOTAL (For Navbar Badge) ---
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
        updateQuantity, // <--- This was likely missing!
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
