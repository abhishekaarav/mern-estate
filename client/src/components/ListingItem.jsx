import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaBed, FaBath, FaRupeeSign } from "react-icons/fa";

export default function ListingItem({ listing, onEdit, showEditButton }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-slate-200 hover:border-[#1a2942] w-full sm:w-[360px]">
      <Link to={`/listing/${listing._id}`}>
        <div className="relative overflow-hidden h-[240px] bg-slate-100">
          <img
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={
              listing.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="listing_cover"
          />

          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </span>
          </div>

        
          {listing.offer && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg animate-pulse">
                Special Offer
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h3 className="truncate text-xl font-bold text-slate-800 group-hover:text-[#1a2942] transition-colors">
            {listing.name}
          </h3>

          <div className="flex items-center gap-2">
            <MdLocationOn className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-slate-600 truncate font-medium">
              {listing.address}
            </p>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          <div className="mt-3 pt-3 border-t-2 border-slate-100">
            <div className="flex items-baseline gap-2">
              <FaRupeeSign className="text-[#1a2942] text-lg" />
              <span className="text-2xl font-bold text-[#1a2942]">
                {listing.offer
                  ? (
                      listing.regularPrice - listing.discountPrice
                    ).toLocaleString("en-IN")
                  : listing.regularPrice.toLocaleString("en-IN")}
              </span>

              {listing.type === "rent" && (
                <span className="text-sm text-slate-500 font-medium">
                  /month
                </span>
              )}
            </div>

            {listing.offer && (
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm text-slate-400 line-through">
                  ₹{listing.regularPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                  Save ₹{listing.discountPrice.toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <FaBed className="text-[#1a2942] text-base" />
              <span className="font-semibold text-sm text-slate-700">
                {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <FaBath className="text-[#1a2942] text-base" />
              <span className="font-semibold text-sm text-slate-700">
                {listing.bathrooms} {listing.bathrooms > 1 ? "Baths" : "Bath"}
              </span>
            </div>
          </div>

          {(listing.parking || listing.furnished) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {listing.parking && (
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-200">
                  Parking
                </span>
              )}
              {listing.furnished && (
                <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium border border-purple-200">
                  Furnished
                </span>
              )}
            </div>
          )}
        </div>
      </Link>

      {showEditButton && onEdit && (
        <div className="px-5 pb-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit(listing._id);
            }}
            className="w-full bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white py-3 rounded-xl font-semibold hover:from-[#0f1820] hover:to-[#1a2942] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
          >
            <MdEdit className="text-lg group-hover:rotate-12 transition-transform" />
            <span>Edit Listing</span>
          </button>
        </div>
      )}
    </div>
  );
}
