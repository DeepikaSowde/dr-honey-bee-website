import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // 1. Access your cart data

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart(); // 2. Destructure needed context
  const [loading, setLoading] = useState(false);

  // 3. State for Shipping Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Calculate real totals
  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.toString().replace(/[^\d.]/g, ""));
    return acc + price * item.quantity;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  // 5. Submit to Backend
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://your-backend-url.onrender.com/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: formData,
            items: cartItems,
            totalAmount: total,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("Order Placed Successfully! Order ID: " + data.orderId);
        clearCart();
        // Redirect to a success page or home
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#fdfbf7",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "40px",
        }}
      >
        {/* Left Side: Shipping Information */}
        <section style={containerStyle}>
          <h2
            style={{
              fontFamily: "serif",
              color: "#4a3728",
              marginBottom: "20px",
            }}
          >
            Shipping Information
          </h2>
          <form
            onSubmit={handleConfirm}
            style={{ display: "grid", gap: "15px" }}
          >
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Complete Address"
              style={{ ...inputStyle, height: "100px" }}
              onChange={handleChange}
              required
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <input
                name="city"
                type="text"
                placeholder="City"
                style={inputStyle}
                onChange={handleChange}
                required
              />
              <input
                name="pincode"
                type="text"
                placeholder="Pincode"
                style={inputStyle}
                onChange={handleChange}
                required
              />
            </div>
            {/* Submit button hidden in form to trigger on enter, real button is in aside */}
            <button
              id="hidden-submit"
              type="submit"
              style={{ display: "none" }}
            ></button>
          </form>
        </section>

        {/* Right Side: Order Summary */}
        <aside style={containerStyle}>
          <h3
            style={{
              color: "#4a3728",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Your Order
          </h3>

          <div style={{ margin: "20px 0" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={summaryItemStyle}>
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  ₹
                  {(
                    parseFloat(item.price.toString().replace(/[^\d.]/g, "")) *
                    item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}
            <div style={summaryItemStyle}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? "green" : "#555" }}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
          </div>

          <div style={totalStyle}>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <button
            disabled={loading || cartItems.length === 0}
            onClick={() => document.getElementById("hidden-submit").click()}
            style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "PROCESSING..." : "CONFIRM & PAY NOW"}
          </button>
          <p style={secureTextStyle}>🔒 Secure 256-bit SSL Encrypted Payment</p>
        </aside>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  height: "fit-content",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};
const summaryItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  color: "#555",
};
const totalStyle = {
  borderTop: "2px solid #4a3728",
  paddingTop: "15px",
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
  fontSize: "1.2rem",
};
const btnStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "15px",
  backgroundColor: "#4a3728",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};
const secureTextStyle = {
  textAlign: "center",
  fontSize: "0.8rem",
  color: "#888",
  marginTop: "10px",
};

export default CheckoutPage;
