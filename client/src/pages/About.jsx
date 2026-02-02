import React, { useState, useEffect, useRef } from "react";
import img1 from "../assets/AboutPageImg1.jpg";
import img2 from "../assets/AboutPageImg2.jpeg";
import img3 from "../assets/AboutPageImg3.jpeg";
import img4 from "../assets/AboutPageImg4.png";
import {
  FaBuilding,
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaCheckCircle,
  FaHeart,
  FaLightbulb,
} from "react-icons/fa";

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] text-white py-5 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-lg mb-6">
            <FaBuilding className="text-blue-400 text-base" />
            <span className="text-sm font-semibold">About PrimeSpace</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Redefining Real Estate
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-200">
              with Innovation & Trust
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
            Buy, sell & rent properties with confidence — simple, secure, and
            smart.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
              <FaBuilding className="text-blue-400 text-lg" />
              <span className="font-semibold">500+ Listings</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
              <FaShieldAlt className="text-emerald-400 text-lg" />
              <span className="font-semibold">100% Verified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20">
              <FaUsers className="text-purple-200 text-lg" />
              <span className="font-semibold">10,000+ Users</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-20 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-gradient-to-br from-slate-900 to-slate-600 px-4 py-2 rounded-full">
              <FaBuilding className="text-white text-xl" />
              <h2 className="text-xl font-bold text-white">Who We Are</h2>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Your Trusted Partner in
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Real Estate Decisions
              </span>
            </h3>

            <p className="text-slate-700 text-lg leading-relaxed">
              PrimeSpace is a modern real estate application built to simplify
              how people{" "}
              <span className="font-semibold text-slate-900">
                buy, sell, and rent
              </span>{" "}
              properties. We created PrimeSpace to remove confusion, reduce
              stress, and bring transparency to real estate decisions.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              Whether you are a home buyer searching for your dream property, a
              seller looking to connect with genuine buyers, or a tenant seeking
              a reliable rental, PrimeSpace brings everything together on one
              powerful platform.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Verified Listings</p>
                  <p className="text-sm text-slate-600">
                    100% authentic properties
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaRocket className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Fast Process</p>
                  <p className="text-sm text-slate-600">
                    Quick & efficient deals
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 p-6 rounded-r-xl">
              <p className="text-slate-800 text-lg font-medium italic">
                "At PrimeSpace, we don't just list properties — we help people
                find the right space for their life."
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={img1}
                alt="PrimeSpace Real Estate"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 relative">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
            <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <FaLightbulb className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-slate-200 text-lg leading-relaxed">
              To revolutionize the real estate experience by providing a
              transparent, efficient, and user-friendly platform that empowers
              individuals to make informed property decisions with confidence.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all">
            <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <FaHeart className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-slate-200 text-lg leading-relaxed">
              To become the most trusted and innovative real estate platform,
              connecting millions of users with their perfect properties while
              setting new standards for transparency and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50/50 to-white">
        <svg
          className="absolute top-0 left-0 w-full h-20 text-blue-100 -mt-1"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-br from-slate-900 to-slate-600 px-5 py-2.5 rounded-full mb-4">
              <FaShieldAlt className="text-white text-base" />
              <span className="text-sm font-bold text-white">
                Our Principles
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Core Values That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Drive Us Forward
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our commitment to excellence is built on these fundamental
              principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-400">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img2}
                  alt="Trust & Transparency"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-500 transition-colors">
                  Trust & Transparency
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Every listing is thoroughly verified, pricing is crystal
                  clear, and all transactions are handled with complete honesty
                  and integrity.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-400">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img4}
                  alt="Customer First"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-500 transition-colors">
                  Customer First
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Our platform is meticulously designed around user needs,
                  ensuring comfort, satisfaction, and long-term success in every
                  interaction.
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-blue-400">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img3}
                  alt="Innovation & Technology"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-500 transition-colors">
                  Innovation & Technology
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  We leverage cutting-edge technology to make property search
                  faster, smarter, and more efficient than ever before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              PrimeSpace By The Numbers
            </h2>
            <p className="text-slate-300 text-lg">
              Real results that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all group">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 inline-block group-hover:scale-125 transition-transform duration-300">
                <Counter end={500} suffix="+" />
              </p>
              <p className="text-white font-semibold">Active Listings</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all group">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2 inline-block group-hover:scale-125 transition-transform duration-300">
                <Counter end={10} suffix="K+" />
              </p>
              <p className="text-white font-semibold">Happy Customers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all group">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 inline-block group-hover:scale-125 transition-transform duration-300">
                <Counter end={98} suffix="%" />
              </p>
              <p className="text-white font-semibold">Satisfaction Rate</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all group">
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2 inline-block group-hover:scale-125 transition-transform duration-300">
                24/7
              </p>
              <p className="text-white font-semibold">Support Available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
