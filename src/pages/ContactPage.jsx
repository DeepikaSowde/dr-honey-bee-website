import React from "react";
import { MapPin, Phone, Mail, Send, Instagram, Facebook } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <div className="bg-[#3E2F20] text-[#EAD2AC] pt-20 pb-24 px-6 text-center">
        <h1 className="font-merriweather text-4xl md:text-5xl font-black mb-4">
          Visit Our Hive
        </h1>
        <p className="font-montserrat text-sm md:text-base max-w-xl mx-auto tracking-wide opacity-90 leading-relaxed">
          We love visitors! Come check out our apiary, buy fresh honey, or
          consult with us about beekeeping.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl border border-[#EAD2AC]/40 overflow-hidden">
          {/* --- LEFT COLUMN: INFO --- */}
          <div className="bg-[#FDF8E8] p-10 md:p-14 flex flex-col justify-between">
            {/* Contact Details */}
            <div>
              <h2 className="font-merriweather text-2xl font-bold text-[#3E2F20] mb-2">
                Get in Touch
              </h2>
              <p className="text-stone-500 text-sm mb-8 font-bold">
                Proprietor: A. Esak
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-sm uppercase tracking-wider mb-1">
                      Farm Address
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm">
                      115A, Ottar Street, Ayakudi,
                      <br />
                      Palani, Dindigul (Tamilnadu) - 624 613
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-sm uppercase tracking-wider mb-1">
                      Call Us
                    </h3>
                    <a
                      href="tel:+919994087710"
                      className="text-stone-600 font-bold text-lg hover:text-amber-600 transition-colors"
                    >
                      +91 99940 87710
                    </a>
                    <p className="text-stone-500 text-xs mt-1">
                      Available for orders & consultation
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-sm uppercase tracking-wider mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:esakreemas@gmail.com"
                      className="text-stone-600 text-sm hover:text-amber-600 transition-colors"
                    >
                      esakreemas@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* GSTIN Badge */}
            <div className="mt-12 pt-8 border-t border-[#3E2F20]/10">
              <p className="text-xs font-bold text-[#3E2F20]/50 uppercase tracking-widest">
                GSTIN: 33AAZPE3054F1ZR
              </p>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="p-10 md:p-14 bg-white">
            <h2 className="font-merriweather text-2xl font-bold text-[#3E2F20] mb-2">
              Send us a Message
            </h2>
            <p className="text-stone-500 text-sm mb-8">
              Interested in bulk orders, live bees, or beekeeping equipment?
            </p>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
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

              <button className="w-full bg-[#D98829] text-white font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#B6701E] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-xs">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* --- GOOGLE MAP EMBED (Updated to Ayakudi, Palani) --- */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-md border-4 border-white h-80 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://maps.google.com/maps?q=Ayakudi,%20Palani,%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
