import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaSearch,
  FaInfoCircle,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);

    try {
      
      let offersText = "Visit website for latest deals";
      let propertyLinks = `${window.location.origin}/search?offer=true`;

      try {
        const res = await fetch("/api/listing/get?offer=true&limit=5");
        const data = await res.json();

        if (Array.isArray(data) && data.length) {
          offersText = data
            .map(
              (p, i) => `
${i + 1}. ${p.name}
📍 ${p.address}
💰 ₹${(p.discountPrice || p.regularPrice).toLocaleString("en-IN")}
🔗 ${window.location.origin}/listing/${p._id}
`,
            )
            .join("\n");

          propertyLinks = data
            .map((p) => `${window.location.origin}/listing/${p._id}`)
            .join("\n");
        }
      } catch (err) {
        console.log("Offer fetch skipped");
      }

      const serviceId = "service_17c3qdv";
      const adminTemplate = "template_u2qq7uo";
      const autoReplyTemplate = "template_x4nvqim";
      const publicKey = "OYjVxUp6Y0sg_G5Ok";

     
      await emailjs.send(
        serviceId,
        adminTemplate,
        { subscriber_email: email },
        publicKey,
      );

     
      await emailjs.send(
        serviceId,
        autoReplyTemplate,
        {
          to_email: email,
          subscriber_email: email,
          offers_content: offersText,
          property_links: propertyLinks,
        },
        publicKey,
      );

      setMessage("✅ Successfully subscribed! Check your email.");
      setEmail("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessage("❌ Subscription failed. Please try again!");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] text-white overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
       
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-400 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FaHome className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold">PrimeSpace</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Your trusted platform for buying, selling, and renting
                properties. We make real estate simple, secure, and smart.
              </p>
              <div className="flex items-center gap-2 text-slate-300 mb-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span className="text-sm">Indore, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 mb-3">
                <FaPhone className="text-blue-400" />
                <a
                  href="tel:+919876543210"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FaEnvelope className="text-blue-400" />
                <a
                  href="mailto:infoprimespace123@gmail.com"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  infoprimespace123@gmail.com
                </a>
              </div>
            </div>

           
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaHome className="text-sm group-hover:translate-x-1 transition-transform" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaInfoCircle className="text-sm group-hover:translate-x-1 transition-transform" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaSearch className="text-sm group-hover:translate-x-1 transition-transform" />
                    Search Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?offer=true"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaSearch className="text-sm group-hover:translate-x-1 transition-transform" />
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?type=rent"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaSearch className="text-sm group-hover:translate-x-1 transition-transform" />
                    Rental Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search?type=sale"
                    className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <FaSearch className="text-sm group-hover:translate-x-1 transition-transform" />
                    Properties for Sale
                  </Link>
                </li>
              </ul>
            </div>

          
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                Our Services
              </h4>
              <ul className="space-y-3">
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Buy Property
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Sell Property
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Rent Property
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Property Valuation
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Real Estate Consultation
                </li>
                <li className="text-slate-300 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                  Property Management
                </li>
              </ul>
            </div>

          
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                Stay Connected
              </h4>
              <p className="text-slate-300 text-sm mb-4">
                Subscribe to get latest property updates and exclusive deals.
              </p>

              
              <form onSubmit={handleSubscribe} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    disabled={loading}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-400 to-cyan-400 px-6 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "..." : <FaEnvelope />}
                  </button>
                </div>
               
                {message && (
                  <p
                    className={`text-sm mt-2 ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}
                  >
                    {message}
                  </p>
                )}
              </form>

            
              <div>
                <p className="text-sm font-semibold mb-4">Follow Us</p>
                <div className="flex gap-3 flex-wrap">
                  
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-400 hover:to-cyan-400 transition-all border border-white/20 hover:border-blue-400 hover:scale-110 group"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-white group-hover:scale-110 transition-transform" />
                  </a>

                  
                  <a
                    href="https://www.x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-slate-700 hover:to-slate-900 transition-all border border-white/20 hover:border-slate-400 hover:scale-110 group"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="text-white group-hover:scale-110 transition-transform" />
                  </a>

                  
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-400 transition-all border border-white/20 hover:border-pink-400 hover:scale-110 group"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-white group-hover:scale-110 transition-transform" />
                  </a>

                  
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600 transition-all border border-white/20 hover:border-red-500 hover:scale-110 group"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="text-white group-hover:scale-110 transition-transform" />
                  </a>

                  
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-green-400 hover:to-green-500 transition-all border border-white/20 hover:border-green-400 hover:scale-110 group"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      
              <p className="text-slate-300 text-sm text-center md:text-left">
                © {currentYear} PrimeSpace. All rights reserved. Made with{" "}
                <span className="text-red-400">❤️</span> in India
              </p>
              <div className="flex gap-6 text-sm">
                <Link
                  to="/privacy"
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
