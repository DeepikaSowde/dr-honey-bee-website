import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-[#3E2F20]">
      <h1 className="text-3xl font-serif font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you make a
            purchase, such as your name, billing address, shipping address,
            payment information, email address, and phone number.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to process your orders,
            communicate with you, and improve our services. We do not sell your
            personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2">3. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at <strong>esakreemas@gmail.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
