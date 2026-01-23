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
          We love visitors! Come taste fresh honey, walk through the sunflower
          fields, or just say hello to the bees.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-xl border border-[#EAD2AC]/40 overflow-hidden">
          {/* --- LEFT COLUMN: INFO --- */}
          <div className="bg-[#FDF8E8] p-10 md:p-14 flex flex-col justify-between">
            {/* Contact Details */}
            <div>
              <h2 className="font-merriweather text-2xl font-bold text-[#3E2F20] mb-8">
                Farm Address
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 shadow-sm flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2F20] text-sm uppercase tracking-wider mb-1">
                      Location
                    </h3>
                    <p className="text-stone-600 leading-relaxed text-sm">
                      Dr. Honey Bee Farm,
                      <br />
                      12/4, Pollachi Main Road,
                      <br />
                      Coimbatore, Tamil Nadu - 641001
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
                    <p className="text-stone-600 font-bold text-lg">
                      +91 98765 43210
                    </p>
                    <p className="text-stone-500 text-xs mt-1">
                      Mon-Sat, 9am to 6pm
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
                    <p className="text-stone-600 text-sm">
                      hello@drhoneyfarm.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12 pt-8 border-t border-[#3E2F20]/10">
              <h3 className="font-bold text-[#3E2F20] text-xs uppercase tracking-wider mb-4">
                Follow our Journey
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#3E2F20] text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#3E2F20] text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: CONTACT FORM --- */}
          <div className="p-10 md:p-14 bg-white">
            <h2 className="font-merriweather text-2xl font-bold text-[#3E2F20] mb-2">
              Send us a Message
            </h2>
            <p className="text-stone-500 text-sm mb-8">
              Interested in bulk orders, workshops, or just have a question?
            </p>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
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
                  className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#3E2F20] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm"
                  placeholder="I'm interested in..."
                />
              </div>

              <button className="w-full bg-[#D98829] text-white font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#B6701E] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xs">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* --- GOOGLE MAP EMBED --- */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-md border-4 border-white h-80 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62657.44318724128!2d76.91979965000001!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
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
