import React from "react";
import img from "../assets/aboutPageImg.jpg";
import { FaBuilding, FaShieldAlt, FaUsers, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3">
            Redefining Real Estate{" "}
            <span className="text-blue-400">with PrimeSpace</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base text-slate-300 mb-4">
            Buy, sell & rent properties — simple, secure, and smart.
          </p>

          <div className="flex justify-center gap-4 flex-wrap text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <FaBuilding className="text-blue-400 text-sm" />
              <span>Listings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaShieldAlt className="text-blue-400 text-sm" />
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaUsers className="text-blue-400 text-sm" />
              <span>Trusted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* TEXT */}
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <FaBuilding className="text-blue-500 text-3xl" />
              Who We Are
            </h2>

            <p className="text-slate-700 text-lg mb-5 leading-relaxed">
              PrimeSpace is a modern real estate application built to simplify
              how people{" "}
              <span className="font-medium text-slate-900">
                buy, sell, and rent
              </span>{" "}
              properties. We created PrimeSpace to remove confusion, reduce
              stress, and bring transparency to real estate decisions.
            </p>

            <p className="text-slate-700 text-lg mb-5 leading-relaxed">
              Whether you are a home buyer searching for your dream property, a
              seller looking to connect with genuine buyers, or a tenant seeking
              a reliable rental, PrimeSpace brings everything together on one
              powerful platform.
            </p>

            <p className="text-slate-700 text-lg mb-5 leading-relaxed">
              With verified listings, smart filters, real-time updates, and
              trusted connections, we help users make faster and more confident
              decisions — without hidden costs or unnecessary complications.
            </p>

            <p className="text-slate-800 text-lg font-medium">
              At PrimeSpace, we don’t just list properties —
              <span className="block">
                we help people find the right space for their life.
              </span>
            </p>
          </div>

          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={img}
              alt="PrimeSpace Real Estate"
              className="w-full h-[520px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="bg-slate-100 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-800 mb-14">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* VALUE 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <img
                src={img}
                alt="Trust"
                className="h-44 w-full object-cover rounded-xl mb-6"
              />
              <FaShieldAlt className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Trust & Transparency
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Every listing is verified, pricing is clear, and transactions
                are handled with complete honesty.
              </p>
            </div>

            {/* VALUE 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <img
                src={img}
                alt="Customer First"
                className="h-44 w-full object-cover rounded-xl mb-6"
              />
              <FaUsers className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-slate-600 leading-relaxed">
                Our platform is designed around user needs, comfort, and
                long-term satisfaction.
              </p>
            </div>

            {/* VALUE 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">
              <img
                src={img}
                alt="Innovation"
                className="h-44 w-full object-cover rounded-xl mb-6"
              />
              <FaRocket className="text-3xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-slate-600 leading-relaxed">
                We leverage modern technology to make property search faster,
                smarter, and more efficient.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
