import React from "react";

const Terms = () => {
  return (
    // Added min-h-screen and background to match the theme
    // Padding: py-8 px-4 on mobile, py-12 px-6 on desktop
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-[#3E2F20] py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title: text-2xl on mobile, text-3xl on desktop */}
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6">
          Terms & Conditions
        </h1>

        {/* Body Text: text-sm on mobile, text-base on desktop */}
        <p className="text-sm md:text-base leading-relaxed opacity-90">
          Welcome to DR. Honey Bee Farm. By accessing our website and purchasing
          our products, you agree to the following terms:
        </p>

        {/* List: Adjusted spacing and font size */}
        <ul className="list-disc pl-5 md:pl-6 space-y-2 md:space-y-3 mt-4 text-sm md:text-base opacity-90">
          <li>
            You agree to provide accurate purchase and account information.
          </li>
          <li>Prices for our products are subject to change without notice.</li>
          <li>
            We reserve the right to refuse service to anyone for any reason at
            any time.
          </li>
          <li>
            All content on this site is the property of DR. Honey Bee Farm.
          </li>
          <li>
            Unauthorized use of our materials may give rise to a claim for
            damages.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
