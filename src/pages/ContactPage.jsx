import React from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      {/* Padding: pt-12 pb-20 on mobile, pt-20 pb-24 on desktop */}
      <div className="bg-[#3E2F20] text-[#EAD2AC] pt-12 pb-20 md:pt-20 md:pb-24 px-4 md:px-6 text-center">
        <h1 className="font-merriweather text-3xl md:text-5xl font-black mb-3 md:mb-4">
          Visit Our Hive
        </h1>
        <p className="font-montserrat text-xs md:text-base max-w-xl mx-auto tracking-wide opacity-90 leading-relaxed px-2">
          We love visitors! Come check out our apiary, buy fresh honey, or
          consult with us about beekeeping.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 pb-12 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-2xl md:rounded-3xl shadow-xl border border-[#EAD2AC]/40 overflow-hidden">
          {/* --- LEFT COLUMN: INFO --- */}
          {/* Padding: p-6 on mobile, p-14 on desktop */}
          <div className="bg-[#FDF8E8] p-6 md:p-14 flex flex-col justify-between">
            {/* Contact Details */}
            <div>
              <h2 className="font-merriweather text-xl md:text-2xl font-bold text-[#3E2F20] mb-2">
                Get in Touch
              </h2>
              <p className="text-stone-500 text-xs md:text-sm mb-6 md:mb-8 font-bold">
                Proprietor: A. Esak
              </p>

              <div className="space-y-6 md:space-y-8">
                {/* Address */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <MapPin size={16} md={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-xs md:text-sm uppercase tracking-wider mb-1">
                      Farm Address
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-xs md:text-sm">
                      115A, Ottar Street, Ayakudi,
                      <br />
                      Palani, Dindigul (Tamilnadu) - 624 613
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <Phone size={16} md={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-xs md:text-sm uppercase tracking-wider mb-1">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919994087710"
                      className="text-stone-600 font-bold text-base md:text-lg hover:text-amber-600 transition-colors"
                    >
                      +91 99940 87710
                    </a>
                    <p className="text-stone-500 text-[10px] md:text-xs mt-1">
                      Available for orders & consultation
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <Mail size={16} md={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-xs md:text-sm uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:esakreemas@gmail.com"
                      className="text-stone-600 text-xs md:text-sm hover:text-amber-600 transition-colors"
                    >
                      esakreemas@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* GSTIN Badge */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#3E2F20]/10">
              <p className="text-[10px] md:text-xs font-bold text-[#3E2F20]/50 uppercase tracking-widest">
                GSTIN: 33AAZPE3054F1ZR
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="p-6 md:p-14 bg-white">
            <h2 className="font-merriweather text-xl md:text-2xl font-bold text-[#3E2F20] mb-2">
              Send us a Message
            </h2>
            <p className="text-stone-500 text-xs md:text-sm mb-6 md:mb-8">
              Interested in bulk orders, live bees, or beekeeping equipment?
            </p>

            <form className="space-y-4 md:space-y-5">
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
                  placeholder="I am looking for..."
                ></textarea>
              </div>

              <button className="w-full bg-[#D98829] text-white font-bold py-3 md:py-4 rounded-xl uppercase tracking-widest hover:bg-[#B6701E] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-xs">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* --- GOOGLE MAP EMBED --- */}
        {/* Fixed Map Link to point to Ayakudi */}
        <div className="mt-8 md:mt-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-md border-4 border-white h-64 md:h-80 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15700.73278917326!2d77.4985!3d10.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b075f80cc2267ad%3A0x67c29e7c30c30666!2sAyakudi%2C%20Tamil%20Nadu%20624613!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dr Honey Bee Farm Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
