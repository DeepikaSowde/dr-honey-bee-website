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
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Dr. Honey Bee Farm",
        description: "Fresh from the Hive",
        image: "https://res.cloudinary.com/dcrdohie2/image/upload/v1/logo.png",
        order_id: orderData.orderId,

        // 4. HANDLER: Runs when payment is successful
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              "https://dr-honey-bee-website.onrender.com/api/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
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
              navigate("/order-success");
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
    // Padding: py-6 on mobile, py-10 on desktop
    <div className="bg-[#fdfbf7] min-h-screen py-6 md:py-10 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Responsive Grid: Flex Column on Mobile, Row on Desktop */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Left Side: Shipping Information */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit flex-1 order-2 lg:order-1">
            <h2 className="font-serif text-[#4a3728] text-xl md:text-2xl mb-6">
              Shipping Information
            </h2>
            <form
              id="checkout-form"
              onSubmit={handlePayment}
              className="grid grid-cols-1 gap-4"
            >
              <input
                name="name"
                placeholder="Full Name"
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base"
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base"
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Phone"
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base"
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Address"
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base h-24"
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base"
                  onChange={handleChange}
                  required
                />
                <input
                  name="pincode"
                  placeholder="Pincode"
                  className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-sm md:text-base"
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </section>

          {/* Right Side: Order Summary */}
          <aside className="bg-white p-6 md:p-8 rounded-2xl shadow-sm h-fit w-full lg:w-[400px] order-1 lg:order-2">
            <h3 className="text-[#4a3728] border-b border-gray-100 pb-4 mb-4 font-bold text-lg md:text-xl">
              Your Order
            </h3>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="flex justify-between text-gray-600 text-sm md:text-base"
                >
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
              <div className="flex justify-between text-gray-600 text-sm md:text-base">
                <span>Shipping</span>
                <span
                  className={
                    shipping === 0
                      ? "text-green-600 font-bold"
                      : "text-gray-600"
                  }
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between border-t-2 border-[#4a3728] pt-4 font-bold text-lg md:text-xl text-[#4a3728] mb-6">
              <span>Total</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>

            {/* Submit Button Triggering the Form */}
            <button
              type="submit"
              form="checkout-form" // Connects to the form ID
              disabled={loading || cartItems.length === 0}
              className={`w-full bg-[#4a3728] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#5C4D3C] transition-colors shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "PROCESSING..." : "CONFIRM & PAY NOW"}
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
