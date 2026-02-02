import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // --- 1. BULLETPROOF PARSER ---
  // Converts "₹1,200", "₹ 400", "400", or undefined -> Number
  const parsePrice = (price) => {
    if (!price) return 0; // Guard against undefined/null
    if (typeof price === "number") return price; // Already a number? Good.

    // 1. Convert to string
    let cleanString = price.toString();

    // 2. Remove EVERYTHING that is not a number or a decimal point
    cleanString = cleanString.replace(/[^\d.]/g, "");

    // 3. Parse it. If it fails (NaN), return 0.
    const number = parseFloat(cleanString);
    return isNaN(number) ? 0 : number;
  };

  // --- 2. SAFER CALCULATION ---
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = parsePrice(item.price);
    const itemQty = item.quantity || 1; // Default to 1 if quantity is missing
    return acc + itemPrice * itemQty;
  }, 0);

  const SHIPPING_COST = subtotal > 1000 ? 0 : 50;
  const FINAL_TOTAL = subtotal + SHIPPING_COST;

  // --- EMPTY CART STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FDFCF8] text-center px-4">
        <div className="bg-[#FDF8E8] p-6 rounded-full mb-6 animate-bounce">
          <ShoppingBag size={48} className="text-[#D98829]" />
        </div>
        <h2 className="font-merriweather text-3xl font-bold text-[#3E2F20] mb-2">
          Your Hive is Empty
        </h2>
        <p className="font-montserrat text-stone-500 mb-8 max-w-md">
          Looks like you haven't added any sweet treats yet. Visit our shop to
          fill your jar!
        </p>
        <Link
          to="/shop"
          className="bg-[#3E2F20] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#D98829] transition-colors"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-merriweather text-3xl md:text-4xl font-black text-[#3E2F20] mb-8 text-center md:text-left">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- LEFT: CART ITEMS --- */}
          <div className="lg:w-2/3 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-[#EAD2AC]/30"
              >
                {/* Image */}
                <div className="w-24 h-24 bg-[#F9F5F0] rounded-xl flex-shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-merriweather font-bold text-[#3E2F20] text-lg">
                    {item.name}
                  </h3>
                  <p className="text-[#D98829] font-bold text-sm mt-1">
                    {item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-[#FDF8E8] px-3 py-1 rounded-full border border-[#EAD2AC]">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#3E2F20] hover:text-[#D98829]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-[#3E2F20] w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#3E2F20] hover:text-[#D98829]"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-[#FDF8E8] sticky top-24">
              <h2 className="font-merriweather text-xl font-bold text-[#3E2F20] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 border-b border-dashed border-[#EAD2AC] pb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  {/* Using || 0 ensures it never shows NaN */}
                  <span className="font-bold">
                    ₹{(subtotal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  {SHIPPING_COST === 0 ? (
                    <span className="text-green-600 font-bold uppercase text-xs tracking-wider">
                      Free
                    </span>
                  ) : (
                    <span className="font-bold">₹{SHIPPING_COST}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-[#3E2F20] text-xl font-black mb-8">
                <span>Total</span>
                {/* Using || 0 ensures it never shows NaN */}
                <span>₹{(FINAL_TOTAL || 0).toLocaleString()}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-[#3E2F20] text-[#EAD2AC] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#D98829] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                Checkout Now
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-wide">
                Secure Checkout • Fast Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
