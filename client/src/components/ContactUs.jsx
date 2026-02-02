import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const adminFormData = new FormData();
      adminFormData.append(
        "access_key",
        "4b2d6312-3db2-45a8-be38-d3c5698a1fb9",
      );
      adminFormData.append(
        "subject",
        `🏡 New Inquiry from PrimeSpace Website - ${formData.name}`,
      );
      adminFormData.append("from_name", formData.name);
      adminFormData.append("from_email", formData.email);
      adminFormData.append(
        "message",
        `
🏡 NEW INQUIRY FROM PRIMESPACE WEBSITE

👤 CUSTOMER DETAILS:
   Name: ${formData.name}
   Email: ${formData.email}

📋 SUBJECT:
   ${formData.subject}

💬 MESSAGE:
   ${formData.message}

⚡ ACTION REQUIRED:
   Please respond to ${formData.email} within 24 hours.

--
PrimeSpace - Your Trusted Property Partner
      `,
      );

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: adminFormData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        alert("Failed to send message. Please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] text-white py-8 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-lg mb-6">
            <FaEnvelope className="text-blue-400 text-base" />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Contact Us
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed">
            Have questions? We're here to help. Reach out and we'll get back to
            you as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-blue-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPaperPlane className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out to PrimeSpace. We'll get back to
                  you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-slate-900 to-slate-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-slate-800 hover:to-slate-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-blue-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Our Office</p>
                    <p className="text-slate-600">
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Email Us</p>
                    <a
                      href="mailto:infoprimespace123@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      infoprimespace123@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">Call Us</p>
                    <a
                      href="tel:+919876543210"
                      className="text-blue-600 hover:underline"
                    >
                      +91 988-765-43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">
                      Business Hours
                    </p>
                    <p className="text-slate-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Follow Us
              </h3>
              <p className="text-slate-700 mb-6">
                Stay connected on social media for updates and news
              </p>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:scale-110"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-md hover:scale-110"
                >
                  <FaXTwitter className="text-xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md hover:scale-110"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-12 h-12 rounded-xl flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md hover:scale-110"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
