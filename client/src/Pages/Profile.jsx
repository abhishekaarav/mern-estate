import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaTrash,
  FaSignOutAlt,
  FaListUl,
  FaEdit,
  FaHome,
  FaBed,
  FaBath,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaPlus,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { HiHand } from "react-icons/hi";
import { MdVerified } from "react-icons/md";

export default function Profile() {
  const fileRef = useRef(null);
  const listingsRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [activeListings, setActiveListings] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      setFileUploadError(false);
      setFilePerc(0);
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (fileUploadError) {
      const timer = setTimeout(() => {
        setFileUploadError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [fileUploadError]);

  useEffect(() => {
    if (filePerc === 100) {
      const timer = setTimeout(() => {
        setFilePerc(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [filePerc]);

  useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(updateUserFailure(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleFileUpload = (file) => {
    // File size validation (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setFileUploadError("Image size must be less than 5MB");
      return;
    }

    // File type validation
    if (!file.type.startsWith("image/")) {
      setFileUploadError("Please upload only image files");
      return;
    }

    const storage = getStorage(app);
    // Clean file name - remove special characters and spaces
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = new Date().getTime() + "_" + cleanFileName;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setFilePerc(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        );
      },
      (error) => {
        setFileUploadError(error.message || "Image upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Cookie send karne ke liye
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include", // ✅ Cookie send karne ke liye
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", {
        credentials: "include", // ✅ Cookie send karne ke liye
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setActiveListings(true);
      setShowListingsError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        credentials: "include", // ✅ Cookie send karne ke liye
      });
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);

      setTimeout(() => {
        listingsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include", // ✅ Cookie send karne ke liye
      });
      const data = await res.json();

      if (data.success === false) return;

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-slate-100 px-4 py-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            Welcome, {currentUser.username}
            <HiHand className="text-yellow-400 text-4xl animate-pulse" />
          </h2>

          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="h-[500px] w-[400px] rounded-2xl object-cover shadow-2xl mb-6 mt-6 transition-transform duration-300 hover:scale-105 hover:shadow-slate-900/50"
          />

          <p className="text-lg font-medium">{currentUser.email}</p>
          <p className="mt-4 text-center opacity-80 max-w-sm pt-10">
            Manage your personal information, listings and account preferences
            easily from here.
          </p>
        </div>

        <div className="p-10">
          <h1 className="text-4xl font-bold text-center mb-8 flex justify-center items-center gap-2">
            <FaUserCircle /> Profile
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover self-center cursor-pointer border-4 border-slate-300 hover:scale-105 transition"
            />

            <p className="text-center font-medium text-sm">
              {fileUploadError && (
                <span className="text-red-600">
                  Upload failed: {fileUploadError}
                </span>
              )}
              {filePerc > 0 && filePerc < 100 && `Uploading ${filePerc}%`}
              {filePerc === 100 && (
                <span className="text-green-600">
                  Image uploaded successfully!
                </span>
              )}
            </p>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Change Password
              </label>

              <div className="mb-3 relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  placeholder="Current Password"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  placeholder="New Password"
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button className="bg-slate-800 text-white py-3 rounded-xl text-base font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2">
              <FaUserCircle />
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {updateSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center font-medium animate-pulse">
                ✓ Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center font-medium">
                ✗ {error}
              </div>
            )}

            <Link
              to="/create-listing"
              className="bg-emerald-600 text-white py-3 rounded-xl text-base text-center font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add New Property
            </Link>
          </form>

          <div className="flex justify-between items-center mt-6 text-base">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 cursor-pointer flex items-center gap-2 hover:opacity-80 hover:scale-105 transition-all duration-300"
            >
              <FaTrash /> Delete
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-600 cursor-pointer flex items-center gap-2 hover:opacity-80 hover:scale-105 transition-all duration-300"
            >
              <FaSignOutAlt /> Sign out
            </span>
          </div>

          <button
            onClick={handleShowListings}
            className={`mt-8 w-full py-3 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              activeListings
                ? "bg-slate-800 text-white hover:opacity-90 hover:shadow-lg"
                : "bg-slate-200 hover:bg-slate-300 hover:shadow-md"
            }`}
          >
            <FaListUl />
            Show My Properties
          </button>
        </div>
      </div>

      {userListings.length > 0 && (
        <div
          ref={listingsRef}
          className="max-w-6xl mx-auto mt-14 bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <FaHome className="text-slate-700" />
              My Properties
              <span className="text-lg font-normal text-slate-500">
                ({userListings.length})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-1">
                      <FaHome className="text-xs" />
                      {listing.type === "rent" ? "Rent" : "Sale"}
                    </span>
                  </div>
                  {listing.offer && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">
                        Special Offer
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <Link to={`/listing/${listing._id}`}>
                    <h3 className="text-lg font-bold text-slate-800 hover:text-slate-600 transition mb-2 line-clamp-1 flex items-center gap-2">
                      <MdVerified className="text-green-500 flex-shrink-0" />
                      {listing.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-600 mb-3 flex items-start gap-2">
                    <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="line-clamp-1">{listing.address}</span>
                  </p>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 mb-3">
                    <div className="flex items-baseline gap-1 text-white">
                      <FaRupeeSign className="text-sm" />
                      <span className="text-xl font-bold">
                        {listing.offer
                          ? (
                              listing.regularPrice - listing.discountPrice
                            ).toLocaleString("en-IN")
                          : listing.regularPrice.toLocaleString("en-IN")}
                      </span>
                      {listing.type === "rent" && (
                        <span className="text-xs text-slate-300">/month</span>
                      )}
                    </div>
                    {listing.offer && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400 line-through">
                          ₹{listing.regularPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-bold">
                          {Math.round(
                            (listing.discountPrice / listing.regularPrice) *
                              100,
                          )}
                          % OFF
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <FaBed className="text-blue-600" />
                      <span className="font-medium">{listing.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBath className="text-cyan-600" />
                      <span className="font-medium">{listing.bathrooms}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-200">
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="flex-1 bg-slate-800 text-white py-2 rounded-lg font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2 text-sm"
                    >
                      <FaEdit />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
