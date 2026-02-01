import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import {
  FaSearch,
  FaHome,
  FaParking,
  FaCouch,
  FaTag,
  FaSortAmountDown,
} from "react-icons/fa";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      const newSearchTerm = e.target.value;
      setSidebardata({ ...sidebardata, searchTerm: newSearchTerm });

      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", newSearchTerm);
      const newUrl = `${location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-50">
      <div className="p-6 border-b-2 md:border-r-2 md:h-screen md:overflow-y-auto bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="searchTerm"
              className="font-bold text-slate-800 flex items-center gap-2 text-sm pointer-events-none"
            >
              <FaSearch className="text-slate-600" />
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search properties..."
              className="border-2 border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:border-slate-600 transition"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <FaHome className="text-slate-600" />
              Type
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span className="text-slate-700 font-medium">Rent & Sale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span className="text-slate-700 font-medium">Rent</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span className="text-slate-700 font-medium">Sale</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className="text-slate-700 font-medium flex items-center gap-1">
                  <FaTag className="text-orange-500" />
                  Special Offer
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <FaCouch className="text-slate-600" />
              Amenities
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className="text-slate-700 font-medium flex items-center gap-1">
                  <FaParking className="text-blue-600" />
                  Parking
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5 cursor-pointer accent-slate-700"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className="text-slate-700 font-medium">Furnished</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sort_order"
              className="font-bold text-slate-800 flex items-center gap-2 text-sm"
            >
              <FaSortAmountDown className="text-slate-600" />
              Sort By
            </label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border-2 border-slate-300 rounded-lg p-3 cursor-pointer focus:outline-none focus:border-slate-600 transition bg-white"
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-800 text-white p-3 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
            <FaSearch />
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 shadow-md">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <FaHome className="text-2xl" />
            Listing Results
            {!loading && listings.length > 0 && (
              <span className="text-lg font-normal text-slate-300">
                ({listings.length} found)
              </span>
            )}
          </h1>
        </div>

        <div className="py-20 px-6">
          {!loading && listings.length === 0 && (
            <div className="text-center py-20">
              <FaHome className="text-6xl text-slate-300 mx-auto mb-4" />
              <p className="text-2xl text-slate-600 font-semibold">
                No listings found!
              </p>
              <p className="text-slate-500 mt-2">
                Try adjusting your search filters
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-800"></div>
              <p className="text-xl text-slate-700 mt-4 font-semibold">
                Loading...
              </p>
            </div>
          )}

          {!loading && listings && listings.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings
                  .slice(0, showMore ? listings.length : 6)
                  .map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))}
              </div>

              {listings.length > 6 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="bg-zinc-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-700 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
                  >
                    <FaHome />
                    {showMore
                      ? "Show Less"
                      : `Show More Listings (${listings.length - 6} more)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
