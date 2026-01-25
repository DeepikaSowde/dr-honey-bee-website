import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-[#3E2F20]">
      <h1 className="text-3xl font-serif font-bold mb-6">Shipping Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-2">1. Processing Time</h2>
          <p>All orders are processed within 2-3 business days.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">
            2. Shipping Rates & Delivery Estimates
          </h2>
          <p>
            Shipping charges for your order will be calculated and displayed at
            checkout. Standard delivery usually takes 5-7 business days
            depending on your location in India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">3. Live Bees Shipping</h2>
          <p>
            Live Bee Colonies are shipped via specialized transport to ensure
            survival. Delivery is restricted to specific regions within Tamil
            Nadu and neighboring states.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
