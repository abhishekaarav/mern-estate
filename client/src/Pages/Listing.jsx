import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
  FaTag,
  FaHome,
  FaEnvelope,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Contact from "../components/Contact";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Calculate discount details
  const finalPrice = listing?.offer
    ? listing.regularPrice - listing.discountPrice
    : listing?.regularPrice;

  const savedAmount = listing?.offer ? listing.discountPrice : 0;

  const discountPercentage = listing?.offer
    ? Math.round((savedAmount / listing.regularPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1a2942] mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-slate-700">
              Loading property details...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <FaTimesCircle className="text-4xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
            <p className="text-slate-600">
              Something went wrong while loading the property.
            </p>
          </div>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          {/* Image Slider - FIXED */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={listing.imageUrls.length > 1}
              className="h-[500px] md:h-[600px]"
            >
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Share Button */}
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="bg-white/95 backdrop-blur-sm hover:bg-white border-2 border-slate-200 rounded-2xl w-14 h-14 flex justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-all group"
              >
                <FaShare className="text-[#1a2942] text-lg group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Copied Notification */}
            {copied && (
              <div className="fixed top-24 right-6 z-20 bg-[#1a2942] text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
                <FaCheckCircle className="text-green-400" />
                <span className="font-semibold">Link copied!</span>
              </div>
            )}

            {/* Property Type Badge */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide shadow-2xl flex items-center gap-2">
                <FaHome />
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
            </div>

            {/* Offer Badge */}
            {listing.offer && (
              <div className="absolute bottom-6 right-6 z-10">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide shadow-2xl flex items-center gap-2">
                  <FaTag />
                  {discountPercentage}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-5">
                {/* Title and Price Card */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                        {listing.name}
                      </h1>
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaMapMarkerAlt className="text-red-500 text-lg flex-shrink-0" />
                        <p className="text-sm font-medium">{listing.address}</p>
                      </div>
                    </div>
                    <MdVerified className="text-green-500 text-3xl flex-shrink-0" />
                  </div>

                  {/* Price Section */}
                  <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1820] rounded-xl p-5 text-white">
                    <p className="text-xs font-semibold mb-2 text-slate-300">
                      {listing.type === "rent" ? "Monthly Rent" : "Sale Price"}
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <FaRupeeSign className="text-2xl" />
                      <span className="text-4xl font-bold">
                        {finalPrice?.toLocaleString("en-IN") || "0"}
                      </span>
                      {listing.type === "rent" && (
                        <span className="text-lg text-slate-300">/month</span>
                      )}
                    </div>

                    {/* Discount Info */}
                    {listing.offer && (
                      <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-300 line-through text-base">
                            ₹{listing.regularPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="bg-orange-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                            {discountPercentage}% OFF
                          </span>
                        </div>
                        <span className="text-green-300 font-bold text-base">
                          Save ₹{savedAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description Card */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#1a2942] to-[#0f1820] rounded-full"></div>
                    Property Description
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {listing.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#1a2942] to-[#0f1820] rounded-full"></div>
                    Property Features
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Bedrooms */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="bg-blue-600 rounded-lg p-2">
                          <FaBed className="text-xl text-white" />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                            {listing.bedrooms}
                          </p>
                          <p className="text-xs font-medium text-slate-600">
                            {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border-2 border-cyan-200">
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="bg-cyan-600 rounded-lg p-2">
                          <FaBath className="text-xl text-white" />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-800">
                            {listing.bathrooms}
                          </p>
                          <p className="text-xs font-medium text-slate-600">
                            {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Parking */}
                    <div
                      className={`rounded-xl p-4 border-2 ${
                        listing.parking
                          ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                          : "bg-gradient-to-br from-red-50 to-rose-50 border-red-200"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div
                          className={`rounded-lg p-2 ${
                            listing.parking ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          <FaParking className="text-xl text-white" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800">
                            {listing.parking ? (
                              <FaCheckCircle className="inline text-green-600" />
                            ) : (
                              <FaTimesCircle className="inline text-red-600" />
                            )}
                          </p>
                          <p className="text-xs font-medium text-slate-600">
                            {listing.parking ? "Parking" : "No Parking"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Furnished */}
                    <div
                      className={`rounded-xl p-4 border-2 ${
                        listing.furnished
                          ? "bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200"
                          : "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div
                          className={`rounded-lg p-2 ${
                            listing.furnished
                              ? "bg-purple-600"
                              : "bg-orange-600"
                          }`}
                        >
                          <FaChair className="text-xl text-white" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-800">
                            {listing.furnished ? (
                              <FaCheckCircle className="inline text-purple-600" />
                            ) : (
                              <FaTimesCircle className="inline text-orange-600" />
                            )}
                          </p>
                          <p className="text-xs font-medium text-slate-600">
                            {listing.furnished ? "Furnished" : "Unfurnished"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-25 space-y-5">
                  {/* Quick Info Card */}
                  <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1820] rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Quick Info</h3>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                        <span className="text-slate-300">Property Type</span>
                        <span className="font-semibold">
                          {listing.type === "rent" ? "Rental" : "Sale"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                        <span className="text-slate-300">Bedrooms</span>
                        <span className="font-semibold">
                          {listing.bedrooms}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                        <span className="text-slate-300">Bathrooms</span>
                        <span className="font-semibold">
                          {listing.bathrooms}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                        <span className="text-slate-300">Parking</span>
                        <span className="font-semibold">
                          {listing.parking ? "Available" : "Not Available"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Furnished</span>
                        <span className="font-semibold">
                          {listing.furnished ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Card */}
                  {currentUser && listing.userRef !== currentUser._id && (
                    <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                      <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <FaEnvelope className="text-[#1a2942]" />
                        Interested?
                      </h2>
                      <p className="text-slate-600 mb-5 text-xs">
                        Get in touch with the property owner to schedule a visit
                        or ask questions.
                      </p>

                      {!contact ? (
                        <button
                          onClick={() => setContact(true)}
                          className="w-full bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white py-3.5 rounded-xl font-bold text-base hover:from-[#0f1820] hover:to-[#1a2942] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <FaEnvelope />
                          Contact Landlord
                        </button>
                      ) : (
                        <div className="mt-4">
                          <Contact listing={listing} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
