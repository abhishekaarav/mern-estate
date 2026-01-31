import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaCheckCircle,
  FaTrash,
  FaImage,
} from "react-icons/fa";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);

  /* IMAGE UPLOAD */
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {},
        reject,
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url)),
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData({ ...formData, type: id });
      return;
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData({ ...formData, [id]: checked });
      return;
    }

    if (type === "number" || type === "text" || type === "textarea") {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1)
      return setError("You must upload at least one image");

    if (+formData.regularPrice < +formData.discountPrice)
      return setError("Discount price must be lower than regular price");

    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) return setError(data.message);
      navigate(`/listing/${data._id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-10 mb-8">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1820] p-5 rounded-2xl shadow-xl">
              <FaHome className="text-4xl text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Create New Listing
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Fill in the details to publish your property
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT - Property Details */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-slate-200 p-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-[#1a2942] to-[#0f1820] rounded-full"></div>
              Property Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Property Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter property name"
                  required
                  className="w-full border-2 border-slate-300 p-4 rounded-xl focus:ring-2 focus:ring-[#1a2942] focus:border-transparent transition-all outline-none bg-slate-50 text-base"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your property..."
                  required
                  className="w-full border-2 border-slate-300 p-4 rounded-xl h-36 focus:ring-2 focus:ring-[#1a2942] focus:border-transparent transition-all outline-none resize-none bg-slate-50 text-base"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter complete address"
                  required
                  className="w-full border-2 border-slate-300 p-4 rounded-xl focus:ring-2 focus:ring-[#1a2942] focus:border-transparent transition-all outline-none bg-slate-50 text-base"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>

              {/* Property Type & Features */}
              <div className="pt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Property Type & Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    ["sale", "For Sale"],
                    ["rent", "For Rent"],
                    ["parking", "Parking"],
                    ["furnished", "Furnished"],
                    ["offer", "Special Offer"],
                  ].map(([id, label]) => (
                    <label
                      key={id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        (
                          id === "sale" || id === "rent"
                            ? formData.type === id
                            : formData[id]
                        )
                          ? "border-[#1a2942] bg-[#1a2942]/5"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={id}
                        className="w-5 h-5 accent-[#1a2942] cursor-pointer"
                        onChange={handleChange}
                        checked={
                          id === "sale" || id === "rent"
                            ? formData.type === id
                            : formData[id]
                        }
                      />
                      <span className="text-sm font-medium text-slate-700">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Room Details */}
              <div className="pt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Room Details
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
                    <label className="block text-sm font-medium text-slate-600 mb-3">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      className="w-full border-2 border-slate-300 p-3.5 rounded-lg focus:ring-2 focus:ring-[#1a2942] focus:border-transparent outline-none text-base"
                      onChange={handleChange}
                      value={formData.bedrooms}
                    />
                  </div>

                  <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
                    <label className="block text-sm font-medium text-slate-600 mb-3">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      className="w-full border-2 border-slate-300 p-3.5 rounded-lg focus:ring-2 focus:ring-[#1a2942] focus:border-transparent outline-none text-base"
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Pricing
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
                    <label className="block text-sm font-medium text-slate-600 mb-3">
                      Regular Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="regularPrice"
                        min="50"
                        className="w-full border-2 border-slate-300 p-3.5 pl-10 rounded-lg focus:ring-2 focus:ring-[#1a2942] focus:border-transparent outline-none text-base"
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                    </div>
                    {formData.type === "rent" && (
                      <span className="text-xs text-slate-500 mt-2 block">
                        Per month
                      </span>
                    )}
                  </div>

                  {formData.offer && (
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-5 rounded-xl border-2 border-purple-200">
                      <label className="block text-sm font-medium text-slate-600 mb-3">
                        Discounted Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                          ₹
                        </span>
                        <input
                          type="number"
                          id="discountPrice"
                          min="0"
                          className="w-full border-2 border-purple-300 p-3.5 pl-10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white text-base"
                          onChange={handleChange}
                          value={formData.discountPrice}
                        />
                      </div>
                      {formData.type === "rent" && (
                        <span className="text-xs text-slate-500 mt-2 block">
                          Per month
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Images & Submit */}
          <div className="lg:col-span-1 space-y-8">
            {/* Image Upload Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-3 flex items-center gap-3">
                <FaImage className="text-[#1a2942]" />
                Property Images
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                First image will be the cover (max 6)
              </p>

              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full border-2 border-dashed border-slate-300 p-5 rounded-xl cursor-pointer hover:border-[#1a2942] transition-colors file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:bg-[#1a2942] file:text-white file:font-medium hover:file:bg-[#0f1820] file:cursor-pointer text-sm"
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  className="w-full bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white py-4 rounded-xl font-semibold hover:from-[#0f1820] hover:to-[#1a2942] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg text-base"
                >
                  <FaUpload />
                  <span>{uploading ? "Uploading..." : "Upload Images"}</span>
                </button>

                {imageUploadError && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                    {imageUploadError}
                  </div>
                )}
              </div>

              {/* Image Preview */}
              {formData.imageUrls.length > 0 && (
                <div className="mt-8 space-y-4">
                  <p className="text-sm font-semibold text-slate-700">
                    Uploaded Images ({formData.imageUrls.length})
                  </p>
                  {formData.imageUrls.map((url, index) => (
                    <div
                      key={url}
                      className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-xl p-4 group hover:bg-slate-100 transition-colors"
                    >
                      <img
                        src={url}
                        alt={`listing ${index + 1}`}
                        className="h-20 w-20 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          Image {index + 1}
                        </p>
                        {index === 0 && (
                          <span className="text-xs text-[#1a2942] font-semibold bg-[#1a2942]/10 px-2 py-1 rounded-md inline-block mt-1">
                            Cover Image
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-600 hover:bg-red-50 p-3 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
              <button
                disabled={loading || uploading}
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-5 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-xl"
              >
                <FaCheckCircle className="text-2xl" />
                <span>{loading ? "Publishing..." : "Publish Listing"}</span>
              </button>

              {error && (
                <div className="mt-5 bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
