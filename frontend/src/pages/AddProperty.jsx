import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddProperty() {
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    title: "",
    type: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtension = /\.(jpg|jpeg|png|webp)$/i.test(file.name);
    if (!ACCEPTED_TYPES.includes(file.type) && !validExtension) {
      setError("Only JPG, JPEG, PNG, and WebP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be 5MB or less.");
      e.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(preview);
    setError("");
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setError("");
    const fileInput = document.getElementById("property-image-input");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (
      !property.title ||
      !property.type ||
      !property.price ||
      !property.location ||
      !property.bedrooms ||
      !property.bathrooms ||
      !property.area ||
      !property.description
    ) {
      setError("Please fill in all property details before submitting.");
      return;
    }

    if (!selectedImage) {
      setError("Please select a property image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", property.title);
      formData.append("type", property.type);
      formData.append("price", property.price);
      formData.append("location", property.location);
      formData.append("bedrooms", property.bedrooms);
      formData.append("bathrooms", property.bathrooms);
      formData.append("area", property.area);
      formData.append("description", property.description);
      formData.append("image", selectedImage);

      const token = localStorage.getItem("token");
      const { data } = await axios.post(`${API_BASE}/properties`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSuccessMessage("Property added successfully.");
      setSelectedImage(null);
      setImagePreview("");
      setProperty({
        title: "",
        type: "",
        price: "",
        location: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        description: "",
      });
      const fileInput = document.getElementById("property-image-input");
      if (fileInput) fileInput.value = "";

      console.log("Created property:", data);
      setTimeout(() => navigate("/properties"), 800);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Property could not be created. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4FF] py-16 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-[#36454F] text-center">
          Add New Property
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-10">
          Fill in the details below to list your property.
        </p>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Property Title
              </label>

              <input
                type="text"
                name="title"
                value={property.title}
                onChange={handleChange}
                placeholder="Luxury Villa"
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Property Type
              </label>

              <select
                name="type"
                value={property.type}
                onChange={handleChange}
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              >
                <option value="">Select Type</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Studio</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={property.price}
                onChange={handleChange}
                placeholder="₹2.5 Cr"
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={property.location}
                onChange={handleChange}
                placeholder="Mumbai"
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bedrooms
              </label>

              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Bathrooms
              </label>

              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Area (sqft)
              </label>

              <input
                type="text"
                name="area"
                value={property.area}
                onChange={handleChange}
                placeholder="3200 sqft"
                className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Upload Image
              </label>

              <input
                id="property-image-input"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="w-full border rounded-xl px-5 py-3"
              />

              {imagePreview && (
                <div className="mt-4 relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Property preview"
                    className="h-28 w-28 rounded-xl object-cover border"
                  />
                  <button
                    type="button"
                    onClick={removeSelectedImage}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

          </div>

          <div className="mt-6">

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={property.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              className="w-full border rounded-xl px-5 py-4 outline-none focus:border-[#0066CC]"
            ></textarea>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white py-4 rounded-xl mt-8 font-semibold transition disabled:cursor-not-allowed disabled:bg-[#5b8ec9]"
          >
            {loading ? "Uploading..." : "Submit Property"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProperty;