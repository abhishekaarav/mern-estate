import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

export default function PrivacyPolicy() {
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
            <FaShieldAlt className="text-blue-400 text-base" />
            <span className="text-sm font-semibold">Your Privacy Matters</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Privacy Policy
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-4 leading-relaxed">
            We value your trust and are committed to protecting your personal
            information.
          </p>

          <p className="text-slate-300 text-sm">
            Last Updated: February 2, 2026
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="space-y-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Introduction
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed">
                  Welcome to PrimeSpace. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you use our real estate platform. By using PrimeSpace, you
                  agree to the collection and use of information in accordance
                  with this policy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaDatabase className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Information We Collect
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" />
                      Personal Information
                    </h3>
                    <p className="text-slate-700 leading-relaxed ml-8">
                      When you create an account, we collect your name, email
                      address, phone number, and profile picture. For property
                      listings, we may collect additional details like address
                      and property preferences.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" />
                      Usage Data
                    </h3>
                    <p className="text-slate-700 leading-relaxed ml-8">
                      We automatically collect information about how you access
                      and use PrimeSpace, including your IP address, browser
                      type, pages visited, time spent on pages, and search
                      queries.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500" />
                      Location Data
                    </h3>
                    <p className="text-slate-700 leading-relaxed ml-8">
                      With your permission, we may collect location data to show
                      you relevant property listings in your area and improve
                      your search experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaLock className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  How We Use Your Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To provide, operate, and maintain our real estate platform
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To process your property listings and rental/purchase
                      requests
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To communicate with you about your account, listings, and
                      inquiries
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To send you updates, newsletters, and promotional
                      materials (you can opt out anytime)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To improve our services and develop new features
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      To prevent fraud and ensure platform security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaCookie className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Cookies & Tracking
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance
                  your experience on PrimeSpace. Cookies help us remember your
                  preferences, analyze site traffic, and provide personalized
                  content.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  You can control cookie settings through your browser, but
                  disabling cookies may limit certain features of our platform.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Data Security
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed">
                  We implement industry-standard security measures to protect
                  your personal information from unauthorized access,
                  disclosure, or destruction. However, no method of transmission
                  over the internet is 100% secure, and we cannot guarantee
                  absolute security.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Your Rights
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              You have the right to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900">Access your data</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900">
                  Update your information
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900">
                  Delete your account
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="font-semibold text-slate-900">
                  Opt out of marketing
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-l-4 border-blue-400">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-500 text-3xl flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Questions About Privacy?
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </p>

                <a
                  href="mailto:infoprimespace123@gmail.com"
                  className="text-blue-600 font-semibold text-lg hover:underline"
                >
                  infoprimespace123@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
