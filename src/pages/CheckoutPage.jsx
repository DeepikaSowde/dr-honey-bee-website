import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form State
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

  // --- Helper: Safe Price Parser ---
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    // Removes "₹", commas, and spaces, then converts to number
    return parseFloat(price.toString().replace(/[^\d.]/g, "")) || 0;
  };

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 50;
  const totalAmount = subtotal + shipping;

  // --- RAZORPAY PAYMENT HANDLER ---
  const handlePayment = async (e) => {
    e.preventDefault();

    // 1. Validate Form
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    setLoading(true);

    try {
      // 2. Call Backend to Create Order
      const orderRes = await fetch(
        "https://dr-honey-bee-website.onrender.com/api/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        },
      );

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert("Server error: Could not initiate payment.");
        setLoading(false);
        return;
      }

      // 3. Configure Razorpay Options
      const options = {
        key: orderData.keyId, // Key ID from backend
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Dr. Honey Bee Farm",
        description: "Fresh from the Hive",
        image: "https://res.cloudinary.com/dcrdohie2/image/upload/v1/logo.png", // Optional Logo
        order_id: orderData.orderId, // Razorpay Order ID from backend

        // 4. HANDLER: Runs when payment is successful
        handler: async function (response) {
          try {
            // 5. Verify Payment on Backend
            const verifyRes = await fetch(
              "https://dr-honey-bee-website.onrender.com/api/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  // Pass customer & cart data to save the order now
                  customer: formData,
                  items: cartItems,
                  totalAmount: totalAmount,
                }),
              },
            );

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful! Order Placed.");
              clearCart();
              navigate("/order-success"); // Redirect to Home or Success Page
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Payment verified but order saving failed. Screenshot this.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#4a3728",
        },
      };

      // 6. Open Razorpay
      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
        setLoading(false);
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
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
            id="checkout-form"
            onSubmit={handlePayment}
            style={{ display: "grid", gap: "15px" }}
          >
            <input
              name="name"
              placeholder="Full Name"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              style={inputStyle}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
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
                placeholder="City"
                style={inputStyle}
                onChange={handleChange}
                required
              />
              <input
                name="pincode"
                placeholder="Pincode"
                style={inputStyle}
                onChange={handleChange}
                required
              />
            </div>
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
              <div key={item._id || item.id} style={summaryItemStyle}>
                <span>
                  {item.name} (x{item.quantity || 1})
                </span>
                <span>
                  ₹
                  {(
                    parsePrice(item.price) * (item.quantity || 1)
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
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>

          {/* Submit Button Triggering the Form */}
          <button
            type="submit"
            form="checkout-form" // Connects to the form ID
            disabled={loading || cartItems.length === 0}
            style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "PROCESSING..." : "CONFIRM & PAY NOW"}
          </button>
        </aside>
      </div>
    </div>
  );
};

// --- STYLES ---
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
  boxSizing: "border-box",
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

export default CheckoutPage;
