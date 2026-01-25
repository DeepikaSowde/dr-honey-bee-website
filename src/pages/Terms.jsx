import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-[#3E2F20]">
      <h1 className="text-3xl font-serif font-bold mb-6">Terms & Conditions</h1>
      <p>
        Welcome to DR. Honey Bee Farm. By accessing our website and purchasing
        our products, you agree to the following terms:
      </p>

      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>You agree to provide accurate purchase and account information.</li>
        <li>Prices for our products are subject to change without notice.</li>
        <li>
          We reserve the right to refuse service to anyone for any reason at any
          time.
        </li>
        <li>All content on this site is the property of DR. Honey Bee Farm.</li>
        <li>
          Unauthorized use of our materials may give rise to a claim for
          damages.
        </li>
      </ul>
    </div>
  );
};

export default Terms;
