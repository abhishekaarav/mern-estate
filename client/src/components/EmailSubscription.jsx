import React, { useState } from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function EmailSubscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("❌ Please enter a valid email address");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);

    try {
      const serviceId = "service_17c3qdv";
      const templateId = "template_u2qq7uo";
      const publicKey = "OYjVxUp6Y0sg_G5Ok";

      await emailjs.send(
        serviceId,
        templateId,
        {
          subscriber_email: email,
        },
        publicKey,
      );

      setMessage(
        "✅ Successfully subscribed! You'll receive property updates soon.",
      );
      setEmail("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setMessage("❌ Subscription failed. Please try again later!");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubscribe} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-400 to-cyan-400 px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Subscribing...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Subscribe
              </>
            )}
          </button>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm font-medium animate-fade-in ${
              message.includes("✅")
                ? "bg-green-500/20 border border-green-400/30 text-green-300"
                : "bg-red-500/20 border border-red-400/30 text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </form>

      <p className="text-slate-400 text-xs mt-3">
        🔒 Your email is safe with us. We respect your privacy and you can
        unsubscribe anytime.
      </p>
    </div>
  );
}
