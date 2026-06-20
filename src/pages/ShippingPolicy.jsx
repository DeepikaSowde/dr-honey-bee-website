import React from "react";

const ShippingPolicy = () => {
  return (
    // Added min-h-screen and background to match the theme
    // Padding: py-8 px-4 on mobile, py-12 px-6 on desktop
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-[#3E2F20] py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title: text-2xl on mobile, text-3xl on desktop */}
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8">
          Shipping Policy
        </h1>

        <div className="space-y-6 md:space-y-8">
          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              1. Processing Time
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              All orders are processed within 2-3 business days.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              2. Shipping Rates & Delivery Estimates
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              Shipping charges for your order will be calculated and displayed
              at checkout. Standard delivery usually takes 5-7 business days
              depending on your location in India.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              3. Live Bees Shipping
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              Live Bee Colonies are shipped via specialized transport to ensure
              survival. Delivery is restricted to specific regions within Tamil
              Nadu and neighboring states.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
