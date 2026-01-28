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
import { FaHome, FaUpload, FaCheckCircle } from "react-icons/fa";

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
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            resolve(url)
          )
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#6fa3a7_0%,#3f6f73_40%,#0f3d40_100%)]">
      <div className="max-w-5xl mx-auto bg-gray-200 rounded-xl shadow-xl p-10 pt-10">
        <h1 className="text-4xl font-bold text-center mb-10 flex justify-center items-center gap-3 text-gray-800">
          <FaHome /> Publish Your Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <input
              id="name"
              type="text"
              placeholder="Name"
              required
              className="border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.name}
            />

            <textarea
              id="description"
              placeholder="Description"
              required
              className="border p-4 rounded-xl h-32 focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.description}
            />

            <input
              id="address"
              type="text"
              placeholder="Address"
              required
              className="border p-4 rounded-xl focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.address}
            />

            {/* CHECKBOXES */}
            <div className="flex flex-wrap gap-6 text-sm">
              {[
                ["sale", "Sell"],
                ["rent", "Rent"],
                ["parking", "Parking spot"],
                ["furnished", "Furnished"],
                ["offer", "Offer"],
              ].map(([id, label]) => (
                <label key={id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id={id}
                    className="w-5 accent-indigo-600"
                    onChange={handleChange}
                    checked={
                      id === "sale" || id === "rent"
                        ? formData.type === id
                        : formData[id]
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {/* NUMBERS */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  className="border p-3 rounded-lg w-24"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  className="border p-3 rounded-lg w-24"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div>
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs text-gray-500">(₹ / month)</span>
                  )}
                </div>
              </div>

              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    className="border p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div>
                    <p>Discounted price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs text-gray-500">(₹ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            <p className="font-semibold text-gray-700">
              Images:
              <span className="font-normal text-gray-500 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>

            <div className="flex gap-3">
              <input
                type="file"
                multiple
                accept="image/*"
                className="border p-3 rounded-xl w-full"
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                disabled={uploading}
                className="border-2 border-indigo-600 text-indigo-600 px-6 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {imageUploadError && (
              <p className="text-red-600 text-sm">{imageUploadError}</p>
            )}

            {formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center border rounded-xl p-3"
              >
                <img
                  src={url}
                  alt="listing"
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              disabled={loading || uploading}
              className="bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex justify-center items-center gap-2"
            >
              <FaCheckCircle className="text-xl" />
              <span>{loading ? "Publishing..." : "Publish Listing"}</span>
            </button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
