import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import ListingItem from "../components/ListingItem";
import {
  FaSearch,
  FaHome,
  FaTag,
  FaKey,
  FaArrowRight,
  FaDollarSign,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import Footer from "../components/Footer";
import Faqs from "../components/Faqs";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  SwiperCore.use([Navigation, Autoplay, Pagination, EffectFade]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=6");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* ================= HERO SECTION WITH FEATURE BOXES ================= */}
      <div className="relative bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] overflow-hidden pb-32">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 shadow-lg">
                <MdTrendingUp className="text-emerald-400 text-lg" />
                <span className="text-sm font-semibold tracking-wide">
                  Trusted by 10,000+ users
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
                Discover Spaces That
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                  Fit Your Lifestyle
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed">
                PrimeSpace connects you with carefully curated properties for
                buying, selling, and renting — all in one trusted platform built
                for
                <span className="text-white font-semibold">
                  {" "}
                  smarter real estate decisions.
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all border-2 border-white/30 shadow-lg hover:shadow-xl"
                >
                  <FaSearch className="text-lg" />
                  <span>Explore Properties</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all border-2 border-white/30 shadow-lg hover:shadow-xl"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Side - Feature Boxes (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-5 lg:gap-6">
              {/* Buy Property Box */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:border-slate-600/70 hover:transform hover:scale-105 group">
                <div className="flex flex-col items-start h-full">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaHome className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Buy Property
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Find your dream home with our extensive listings
                  </p>
                </div>
              </div>

              {/* Rent Property Box */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:border-slate-600/70 hover:transform hover:scale-105 group">
                <div className="flex flex-col items-start h-full">
                  <div className="bg-gradient-to-br from-[#27A9FF] to-[#1e88e5] w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaKey className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Rent Property
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Flexible rental options for every budget
                  </p>
                </div>
              </div>

              {/* Sell Property Box */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:border-slate-600/70 hover:transform hover:scale-105 group">
                <div className="flex flex-col items-start h-full">
                  <div className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaDollarSign className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Sell Property
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    List your property and reach thousands
                  </p>
                </div>
              </div>

              {/* Special Offers Box */}
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300 hover:border-slate-600/70 hover:transform hover:scale-105 group">
                <div className="flex flex-col items-start h-full">
                  <div className="bg-gradient-to-br from-amber-300 to-amber-400 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaTag className="text-white text-xl" />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Special Offers
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Exclusive deals on premium properties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FULL WIDTH AUTO SWIPER ================= */}
      {offerListings.length > 0 && (
        <div className="relative w-full -mt-16">
          <div className="w-full shadow-2xl">
            <Swiper
              navigation
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !bg-emerald-500",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              effect="fade"
              loop={offerListings.length > 1}
              className="w-full h-[450px] sm:h-[550px] lg:h-[650px]"
            >
              {offerListings.slice(0, 6).map((listing) => (
                <SwiperSlide key={listing._id}>
                  <Link to={`/listing/${listing._id}`}>
                    <div className="relative w-full h-full group">
                      <img
                        src={listing.imageUrls[0]}
                        alt={listing.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
                          <div className="max-w-7xl mx-auto">
                            <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500">
                              {listing.name}
                            </h3>
                            <p className="text-white/90 text-lg sm:text-xl mb-4 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500 delay-75">
                              {listing.address}
                            </p>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-lg text-sm font-semibold transform group-hover:translate-y-0 translate-y-4 transition-transform duration-500 delay-150">
                              <span>View Details</span>
                              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* DISCOUNT BADGE */}
                      <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                        {listing.offer &&
                          listing.regularPrice &&
                          listing.discountPrice && (
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide shadow-2xl flex items-center gap-2">
                              <FaTag />
                              {Math.round(
                                ((listing.regularPrice -
                                  listing.discountPrice) /
                                  listing.regularPrice) *
                                  100,
                              )}
                              % OFF
                            </span>
                          )}
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* ================= LISTINGS SECTIONS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="space-y-20">
          {/* Recent Offers */}
          {offerListings.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                      <FaTag className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                      Special Offers
                    </h2>
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg">
                    Limited time deals on premium properties
                  </p>
                </div>
                <Link
                  to="/search?offer=true"
                  className="hidden sm:inline-flex items-center gap-2 text-[#1e3a5f] font-semibold text-lg hover:gap-4 transition-all group"
                >
                  <span>View all offers</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {offerListings.slice(0, isMobile ? 2 : 6).map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>

              {offerListings.length > (isMobile ? 2 : 6) && (
                <div className="mt-8 text-center">
                  <Link
                    to="/search?offer=true"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    <span>Show More Offers</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Recent Rentals */}
          {rentListings.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                      <FaKey className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                      Properties for Rent
                    </h2>
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg">
                    Find your perfect rental home
                  </p>
                </div>
                <Link
                  to="/search?type=rent"
                  className="hidden sm:inline-flex items-center gap-2 text-[#1e3a5f] font-semibold text-lg hover:gap-4 transition-all group"
                >
                  <span>View all rentals</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rentListings.slice(0, isMobile ? 2 : 6).map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>

              {rentListings.length > (isMobile ? 2 : 6) && (
                <div className="mt-8 text-center">
                  <Link
                    to="/search?type=rent"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    <span>Show More Rentals</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Recent Sales */}
          {saleListings.length > 0 && (
            <section>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
                      <FaHome className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                      Properties for Sale
                    </h2>
                  </div>
                  <p className="text-slate-600 text-base sm:text-lg">
                    Discover homes ready to own
                  </p>
                </div>
                <Link
                  to="/search?type=sale"
                  className="hidden sm:inline-flex items-center gap-2 text-[#1e3a5f] font-semibold text-lg hover:gap-4 transition-all group"
                >
                  <span>View all properties</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {saleListings.slice(0, isMobile ? 2 : 6).map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>

              {saleListings.length > (isMobile ? 2 : 6) && (
                <div className="mt-8 text-center">
                  <Link
                    to="/search?type=sale"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-xl font-bold text-base hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
                  >
                    <span>Show More Properties</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="bg-gradient-to-br from-[#1e3a5f] via-[#0f2942] to-[#1e3a5f] py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 sm:p-14 lg:p-20 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-5">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-slate-200 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who found their perfect
              space with PrimeSpace
            </p>
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-4 bg-gradient-to-r from-slate-900 to-slate-600 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform"
            >
              <FaSearch className="text-xl" />
              <span>Start Exploring</span>
              <FaArrowRight className="text-base" />
            </Link>
          </div>
        </div>
      </div>
      <Faqs />
      <Footer />
    </div>
  );
}
