import React from "react";

const PrivacyPolicy = () => {
  return (
    // Added min-h-screen and background color to match the theme
    // Padding: py-8 px-4 on mobile, py-12 px-6 on desktop
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-[#3E2F20] py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title: text-2xl on mobile, text-3xl on desktop */}
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6">
          Privacy Policy
        </h1>

        <p className="mb-6 md:mb-8 text-sm md:text-base text-stone-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 md:space-y-8">
          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              1. Information We Collect
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              We collect information you provide directly to us when you make a
              purchase, such as your name, billing address, shipping address,
              payment information, email address, and phone number.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              We use the information we collect to process your orders,
              communicate with you, and improve our services. We do not sell
              your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
              3. Contact Us
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:esakreemas@gmail.com"
                className="font-bold text-[#D98829] hover:underline"
              >
                esakreemas@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
