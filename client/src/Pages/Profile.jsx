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
import { FaUserCircle, FaTrash, FaSignOutAlt, FaListUl } from "react-icons/fa";
import { HiHand } from "react-icons/hi";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= IMAGE UPLOAD (OLD LOGIC) ================= */
  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setFilePerc(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        );
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  /* ================= UPDATE (FIXED) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data)); // ✅ OLD LOGIC RESTORED
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  /* ================= DELETE (FIXED) ================= */
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data)); // ✅ OLD LOGIC
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  /* ================= SIGN OUT (FIXED) ================= */
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data)); // ✅ SAME AS OLD CODE
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  /* ================= LISTINGS ================= */
  const handleShowListings = async () => {
    try {
      setActiveListings(true);
      setShowListingsError(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
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

  /* ================= UI ================= */
  return (
    <div className="bg-slate-100 px-4 py-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold  flex items-center gap-3">
            Welcome, {currentUser.username}
            <HiHand className="text-yellow-400 text-4xl animate-pulse" />
          </h2>

          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="h-[500px] w-[400px] rounded-2xl object-cover shadow-2xl mb-6 mt-6"
          />

          <p className="text-lg font-medium">{currentUser.email}</p>
          <p className="mt-4 text-center opacity-80 max-w-sm pt-10">
            Manage your personal information, listings and account preferences
            easily from here.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h1 className="text-4xl font-bold text-center mb-8 flex justify-center gap-2">
            <FaUserCircle /> Profile
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              className="h-28 w-28 rounded-full object-cover self-center cursor-pointer border-4 border-slate-300 hover:scale-105 transition"
            />

            <p className="text-center font-medium">
              {fileUploadError && (
                <span className="text-red-600">Upload failed</span>
              )}
              {filePerc > 0 && filePerc < 100 && `Uploading ${filePerc}%`}
              {filePerc === 100 && (
                <span className="text-green-600">
                  Image uploaded successfully!
                </span>
              )}
            </p>

            <input
              type="text"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="border rounded-xl px-5 py-4 text-lg"
            />
            <input
              type="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="border rounded-xl px-5 py-4 text-lg"
            />
            <input
              type="password"
              id="password"
              placeholder="New Password"
              onChange={handleChange}
              className="border rounded-xl px-5 py-4 text-lg"
            />

            <button className="bg-slate-800 text-white py-4 rounded-xl text-lg font-semibold hover:bg-slate-900 transition">
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <Link
              to="/create-listing"
              className="bg-emerald-600 text-white py-4 rounded-xl text-lg text-center font-semibold hover:bg-emerald-700 transition"
            >
              Create Listing
            </Link>
          </form>

          <div className="flex justify-between mt-8 text-lg">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 cursor-pointer flex items-center gap-2 hover:text-red-700 transition"
            >
              <FaTrash /> Delete
            </span>
            <span
              onClick={handleSignOut}
              className="text-red-600 cursor-pointer flex items-center gap-2 hover:text-red-700 transition"
            >
              <FaSignOutAlt /> Sign out
            </span>
          </div>

          <button
            onClick={handleShowListings}
            className={`mt-10 w-full py-4 rounded-xl text-lg font-semibold flex justify-center gap-2 transition ${
              activeListings
                ? "bg-slate-800 text-white"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            <FaListUl /> Show Listings
          </button>
        </div>
      </div>

      {/* LISTINGS */}
      {userListings.length > 0 && (
        <div
          ref={listingsRef}
          className="max-w-6xl mx-auto mt-14 bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Your Listings</h2>

          <div className="flex flex-col gap-5">
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-xl p-4 flex items-center gap-4 hover:shadow transition"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt="listing"
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <Link
                  to={`/listing/${listing._id}`}
                  className="flex-1 text-lg font-semibold hover:underline"
                >
                  {listing.name}
                </Link>
                <div className="flex flex-col">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="text-emerald-600 hover:text-emerald-700 transition"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
