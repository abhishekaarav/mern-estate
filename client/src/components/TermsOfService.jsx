import React from "react";
import {
  FaFileContract,
  FaGavel,
  FaExclamationTriangle,
  FaUserCheck,
  FaShieldAlt,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

export default function TermsOfService() {
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
            <FaFileContract className="text-blue-400 text-base" />
            <span className="text-sm font-semibold">Legal Agreement</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Terms of Service
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-4 leading-relaxed">
            Please read these terms carefully before using PrimeSpace.
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
                <FaHandshake className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Acceptance of Terms
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  By accessing and using PrimeSpace, you accept and agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, please do not use our platform.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  We reserve the right to modify these terms at any time.
                  Continued use of PrimeSpace after changes constitutes
                  acceptance of the updated terms.
                </p>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaUserCheck className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  User Accounts & Responsibilities
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      You must be at least 18 years old to create an account on
                      PrimeSpace
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      You are responsible for maintaining the confidentiality of
                      your account credentials
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      You must provide accurate and complete information when
                      creating listings
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      You agree not to create multiple accounts or use another
                      person's account without permission
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-700 leading-relaxed">
                      Notify us immediately if you suspect unauthorized access
                      to your account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Property Listings & Content
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Listing Guidelines
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-3">
                      When creating property listings on PrimeSpace, you agree
                      to:
                    </p>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <p className="text-slate-700">
                          Provide accurate property details, photos, and pricing
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <p className="text-slate-700">
                          Only list properties you have legal authority to sell
                          or rent
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <p className="text-slate-700">
                          Not post fraudulent, misleading, or deceptive content
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <p className="text-slate-700">
                          Update or remove listings when properties are no
                          longer available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Content Ownership
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      You retain ownership of the content you post, but grant
                      PrimeSpace a license to display, promote, and distribute
                      your listings on our platform and marketing materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-red-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaExclamationTriangle className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Prohibited Activities
                </h2>

                <p className="text-slate-700 leading-relaxed mb-4">
                  You agree NOT to:
                </p>

                <div className="space-y-3">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Use PrimeSpace for any illegal or unauthorized purpose
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Harass, abuse, or harm other users
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Post spam, viruses, or malicious code
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Scrape or copy content without permission
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Circumvent security features or attempt unauthorized
                      access
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <p className="text-slate-800 font-medium">
                      ❌ Impersonate others or misrepresent your identity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-blue-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaGavel className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">
                  Limitation of Liability
                </h2>
                <p className="text-slate-700 text-lg leading-relaxed mb-4">
                  PrimeSpace acts as a platform connecting buyers, sellers, and
                  renters. We are not responsible for:
                </p>
                <div className="space-y-2 ml-4">
                  <p className="text-slate-700">
                    • The accuracy of property listings or user-generated
                    content
                  </p>
                  <p className="text-slate-700">
                    • Transactions conducted between users
                  </p>
                  <p className="text-slate-700">
                    • Property conditions, legal issues, or disputes
                  </p>
                  <p className="text-slate-700">
                    • Any losses or damages arising from use of our platform
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Users are responsible for conducting their own due diligence
                  before entering into any property transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Account Termination
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-3">
              We reserve the right to suspend or terminate your account if you
              violate these Terms of Service or engage in fraudulent activity.
            </p>
            <p className="text-slate-700 leading-relaxed">
              You may also delete your account at any time through your account
              settings.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border-l-4 border-blue-400">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-4">
              If you have questions or concerns about our Terms of Service,
              please reach out to us:
            </p>
            <a
              href="mailto:infoprimespace123@gmail.com"
              className="text-blue-600 font-semibold text-lg hover:underline"
            >
              infoprimespace123@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}