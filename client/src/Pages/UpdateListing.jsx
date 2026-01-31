import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
  FaTag,
  FaHome,
  FaImage,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
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
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
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
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
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
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  
  const discountPercentage = formData.offer
    ? Math.round((formData.discountPrice / formData.regularPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1820] rounded-xl p-3">
              <FaHome className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Update Your Listing
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                Modify your property details and images
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-5">
            
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Basic Information
                </h2>

                <div className="space-y-4">
                 
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Property Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter property name"
                      className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#1a2942] focus:outline-none transition-colors"
                      id="name"
                      maxLength="62"
                      minLength="10"
                      required
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </div>

                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your property"
                      className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#1a2942] focus:outline-none transition-colors min-h-[120px] resize-y"
                      id="description"
                      required
                      onChange={handleChange}
                      value={formData.description}
                    />
                  </div>

                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter property address"
                      className="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-[#1a2942] focus:outline-none transition-colors"
                      id="address"
                      required
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
                </div>
              </div>

            
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Property Type & Features
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  
                  <label
                    htmlFor="sale"
                    className="relative rounded-xl p-4 border-2 border-slate-300 bg-white cursor-pointer hover:border-slate-400 transition-all"
                  >
                    <input
                      type="checkbox"
                      id="sale"
                      className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400"
                      onChange={handleChange}
                      checked={formData.type === "sale"}
                    />
                    <span className="ml-3 font-medium text-slate-800">
                      For Sale
                    </span>
                  </label>

                  <label
                    htmlFor="rent"
                    className="relative rounded-xl p-4 border-2 border-slate-300 bg-white cursor-pointer hover:border-slate-400 transition-all"
                  >
                    <input
                      type="checkbox"
                      id="rent"
                      className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400"
                      onChange={handleChange}
                      checked={formData.type === "rent"}
                    />
                    <span className="ml-3 font-medium text-slate-800">
                      For Rent
                    </span>
                  </label>

                  <label
                    htmlFor="parking"
                    className="relative rounded-xl p-4 border-2 border-slate-300 bg-white cursor-pointer hover:border-slate-400 transition-all"
                  >
                    <input
                      type="checkbox"
                      id="parking"
                      className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400"
                      onChange={handleChange}
                      checked={formData.parking}
                    />
                    <span className="ml-3 font-medium text-slate-800">
                      Parking
                    </span>
                  </label>

                  <label
                    htmlFor="furnished"
                    className="relative rounded-xl p-4 border-2 border-slate-300 bg-white cursor-pointer hover:border-slate-400 transition-all"
                  >
                    <input
                      type="checkbox"
                      id="furnished"
                      className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400"
                      onChange={handleChange}
                      checked={formData.furnished}
                    />
                    <span className="ml-3 font-medium text-slate-800">
                      Furnished
                    </span>
                  </label>

                  <label
                    htmlFor="offer"
                    className="relative rounded-xl p-4 border-2 border-slate-300 bg-white cursor-pointer hover:border-slate-400 transition-all"
                  >
                    <input
                      type="checkbox"
                      id="offer"
                      className="w-5 h-5 rounded border-2 border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400"
                      onChange={handleChange}
                      checked={formData.offer}
                    />
                    <span className="ml-3 font-medium text-slate-800">
                      Special Offer
                    </span>
                  </label>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Room Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      required
                      className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none bg-slate-50"
                      onChange={handleChange}
                      value={formData.bedrooms}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      required
                      className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none bg-slate-50"
                      onChange={handleChange}
                      value={formData.bathrooms}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-5">
                  Pricing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Regular Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                        ₹
                      </span>
                      <input
                        type="number"
                        id="regularPrice"
                        min="50"
                        max="100000000"
                        required
                        className="w-full p-3 pl-8 border-2 border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none bg-slate-50"
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                    </div>
                    {formData.type === "rent" && (
                      <p className="text-xs text-slate-500 mt-1">Per month</p>
                    )}
                  </div>

                  {formData.offer && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Discounted Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
                          ₹
                        </span>
                        <input
                          type="number"
                          id="discountPrice"
                          min="0"
                          max="10000000"
                          required
                          className="w-full p-3 pl-8 border-2 border-slate-200 rounded-lg focus:border-slate-400 focus:outline-none bg-purple-50"
                          onChange={handleChange}
                          value={formData.discountPrice}
                        />
                      </div>
                      {formData.type === "rent" && (
                        <p className="text-xs text-slate-500 mt-1">Per month</p>
                      )}
                      {formData.discountPrice > 0 && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-slate-600">
                            Discount:
                          </span>
                          <span className="font-bold text-orange-600 text-sm">
                            {discountPercentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  Property Images
                </h2>
                <p className="text-sm text-slate-600 mb-5 flex items-center gap-2">
                  <FaImage className="text-blue-500" />
                  The first image will be the cover (max 6 images)
                </p>

                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 border-2 border-dashed border-slate-300 mb-4">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className="w-full p-3 border-2 border-slate-200 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#1a2942] file:text-white file:cursor-pointer hover:file:bg-[#0f1820] transition-all"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className="w-full mt-3 p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold uppercase hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <FaUpload />
                    {uploading ? "Uploading..." : "Upload Images"}
                  </button>
                </div>
                {imageUploadError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
                    <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
                      <FaTimesCircle />
                      {imageUploadError}
                    </p>
                  </div>
                )}

                {formData.imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={url}
                        className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-white shadow-md hover:shadow-lg transition-all"
                      >
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-32 object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute bottom-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-5">
                <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1820] rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MdVerified className="text-green-400" />
                    Listing Summary
                  </h3>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Property Type</span>
                      <span className="font-semibold">
                        {formData.type === "rent" ? "For Rent" : "For Sale"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Bedrooms</span>
                      <span className="font-semibold">{formData.bedrooms}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Bathrooms</span>
                      <span className="font-semibold">
                        {formData.bathrooms}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Parking</span>
                      <span className="font-semibold">
                        {formData.parking ? (
                          <FaCheckCircle className="inline text-green-400" />
                        ) : (
                          <FaTimesCircle className="inline text-red-400" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Furnished</span>
                      <span className="font-semibold">
                        {formData.furnished ? (
                          <FaCheckCircle className="inline text-green-400" />
                        ) : (
                          <FaTimesCircle className="inline text-red-400" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-white/20">
                      <span className="text-slate-300">Special Offer</span>
                      <span className="font-semibold">
                        {formData.offer ? (
                          <FaCheckCircle className="inline text-green-400" />
                        ) : (
                          <FaTimesCircle className="inline text-red-400" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-slate-300">Images</span>
                      <span className="font-semibold">
                        {formData.imageUrls.length} / 6
                      </span>
                    </div>
                  </div>
                </div>
                {formData.regularPrice > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">
                      Price Preview
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <FaRupeeSign className="text-xl text-slate-700" />
                        <span className="text-3xl font-bold text-slate-800">
                          {formData.offer
                            ? (
                                formData.regularPrice - formData.discountPrice
                              ).toLocaleString("en-IN")
                            : formData.regularPrice.toLocaleString("en-IN")}
                        </span>
                        {formData.type === "rent" && (
                          <span className="text-sm text-slate-600">/month</span>
                        )}
                      </div>
                      {formData.offer && formData.discountPrice > 0 && (
                        <div className="pt-3 border-t border-slate-200">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-600">
                              Original Price:
                            </span>
                            <span className="line-through text-slate-500">
                              ₹{formData.regularPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                              {discountPercentage}% OFF
                            </span>
                            <span className="text-green-600 font-bold text-sm">
                              Save ₹
                              {formData.discountPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <button
                  disabled={loading || uploading}
                  className="w-full p-4 bg-gradient-to-r from-[#1a2942] to-[#0f1820] text-white rounded-xl font-bold text-lg uppercase hover:from-[#0f1820] hover:to-[#1a2942] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Update Listing
                    </>
                  )}
                </button>
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-red-700 font-semibold text-sm flex items-center gap-2">
                      <FaTimesCircle />
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
