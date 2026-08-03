// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_URL;

// const formatPrice = (n) =>
//   typeof n === "number" && !Number.isNaN(n)
//     ? new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency: "INR",
//         maximumFractionDigits: 0,
//       }).format(n)
//     : "—";

// const PropertyDetails = () => {
//   const { id } = useParams();

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeImg, setActiveImg] = useState(0);

//   useEffect(() => {
//     let cancelled = false;

//     const fetchProperty = async () => {
//       setLoading(true);
//       setError("");
//       setActiveImg(0); // reset gallery position for the new property
//       try {
//         const { data } = await axios.get(`${API_BASE}/properties/${id}`);
//         if (!cancelled) setProperty(data);
//       } catch (err) {
//         if (!cancelled) {
//           setError(
//             err.response?.data?.message ||
//               err.message ||
//               "Failed to load property"
//           );
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProperty();
//     } else {
//       setLoading(false);
//       setError("No property id provided");
//     }

//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   // ---------- Loading ----------
//   if (loading) {
//     return (
//       <div
//         data-testid="property-details-loading"
//         className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[50vh]"
//       >
//         <div className="text-gray-600 animate-pulse text-lg">
//           Loading property...
//         </div>
//       </div>
//     );
//   }

//   // ---------- Error ----------
//   if (error) {
//     return (
//       <div
//         data-testid="property-details-error"
//         className="max-w-6xl mx-auto p-6 min-h-[50vh]"
//       >
//         <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
//           <h2 className="font-semibold mb-1">Unable to load property</h2>
//           <p className="text-sm">{error}</p>
//           <Link
//             to="/properties"
//             className="inline-block mt-3 text-sm text-red-700 underline"
//           >
//             ← Back to listings
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!property) return null;

//   // Support both `images: [..]` (array) and `image: "..."` (single string)
//   const images = Array.isArray(property.images)
//     ? property.images.filter(Boolean)
//     : property.image
//     ? [property.image]
//     : [];

//   const safeActiveImg = activeImg >= 0 && activeImg < images.length ? activeImg : 0;

//   const mainImage =
//     images[safeActiveImg] ||
//     "https://via.placeholder.com/1200x700?text=No+Image";

//   return (
//     <div
//       data-testid="property-details-page"
//       className="max-w-6xl mx-auto p-4 md:p-6"
//     >
//       {/* Header */}
//       <div className="mb-4">
//         <Link
//           to="/properties"
//           className="text-sm text-gray-500 hover:text-gray-700"
//         >
//           ← Back to listings
//         </Link>
//         <h1
//           data-testid="property-title"
//           className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
//         >
//           {property.title || "Untitled property"}
//         </h1>
//         <p
//           data-testid="property-location"
//           className="text-gray-600 mt-1 flex items-center gap-1"
//         >
//           <span>📍</span>
//           <span>{property.location || "Location not specified"}</span>
//           {property.type && (
//             <span className="ml-2 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
//               {property.type}
//             </span>
//           )}
//         </p>
//       </div>

//       {/* Image gallery */}
//       <div className="grid gap-3">
//         <img
//           data-testid="property-main-image"
//           src={mainImage}
//           alt={property.title || "Property image"}
//           className="w-full h-72 md:h-[460px] object-cover rounded-xl shadow-sm"
//           onError={(e) => {
//             e.currentTarget.onerror = null;
//             e.currentTarget.src =
//               "https://via.placeholder.com/1200x700?text=No+Image";
//           }}
//         />
//         {images.length > 1 && (
//           <div
//             data-testid="property-image-thumbs"
//             className="flex gap-2 overflow-x-auto"
//           >
//             {images.map((src, i) => (
//               <button
//                 key={src || i}
//                 type="button"
//                 onClick={() => setActiveImg(i)}
//                 className={`shrink-0 border-2 rounded-lg overflow-hidden transition ${
//                   i === safeActiveImg
//                     ? "border-blue-500"
//                     : "border-transparent hover:border-gray-300"
//                 }`}
//               >
//                 <img
//                   src={src}
//                   alt={`thumb-${i}`}
//                   className="w-24 h-16 object-cover"
//                   onError={(e) => {
//                     e.currentTarget.onerror = null;
//                     e.currentTarget.src =
//                       "https://via.placeholder.com/200x140?text=No+Image";
//                   }}
//                 />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Content grid */}
//       <div className="grid md:grid-cols-3 gap-6 mt-6">
//         {/* Left – description & specs */}
//         <div className="md:col-span-2 space-y-6">
//           {/* Specs */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <Spec label="Bedrooms" value={property.bedrooms} testId="property-bedrooms" />
//             <Spec label="Bathrooms" value={property.bathrooms} testId="property-bathrooms" />
//             <Spec label="Area" value={property.area ? `${property.area} sqft` : "—"} testId="property-area" />
//             <Spec label="Type" value={property.type || "—"} testId="property-type" />
//           </div>

//           {/* Description */}
//           <section>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">
//               Description
//             </h2>
//             <p
//               data-testid="property-description"
//               className="text-gray-700 leading-relaxed whitespace-pre-line"
//             >
//               {property.description || "No description provided."}
//             </p>
//           </section>
//         </div>

//         {/* Right – price / owner card */}
//         <aside className="md:col-span-1">
//           <div className="border rounded-xl p-5 shadow-sm sticky top-4 bg-white">
//             <p className="text-xs uppercase tracking-wide text-gray-500">
//               Price
//             </p>
//             <p
//               data-testid="property-price"
//               className="text-3xl font-bold text-gray-900 mt-1"
//             >
//               {formatPrice(property.price)}
//             </p>

//             {property.owner && (
//               <div className="mt-4 pt-4 border-t">
//                 <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
//                   Listed by
//                 </p>
//                 <p className="font-medium text-gray-900">
//                   {property.owner.name || "—"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {property.owner.email || ""}
//                 </p>
//               </div>
//             )}

//             {property._id && (
//               <Link
//                 to={`/inquiry/${property._id}`}
//                 data-testid="property-contact-btn"
//                 className="mt-5 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 transition"
//               >
//                 Contact Agent
//               </Link>
//             )}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// const Spec = ({ label, value, testId }) => (
//   <div
//     data-testid={testId}
//     className="border rounded-lg p-3 bg-gray-50 text-center"
//   >
//     <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
//     <p className="text-lg font-semibold text-gray-900 mt-0.5">
//       {value ?? "—"}
//     </p>
//   </div>
// );

// export default PropertyDetails;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, BedDouble, Bath, Ruler, Building2, Mail, Phone, CheckCircle2, X } from "lucide-react";
import useCompare from "../hooks/useCompare";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL;

const formatPrice = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [notice, setNotice] = useState("");

  const compare = useCompare();

  useEffect(() => {
    let cancelled = false;

    const fetchProperty = async () => {
      setLoading(true);
      setError("");
      setActiveImg(0);
      try {
        const { data } = await axios.get(`${API_BASE}/properties/${id}`);
        if (!cancelled) setProperty(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load property"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (id) fetchProperty();
    else {
      setLoading(false);
      setError("No property id provided");
    }

    return () => { cancelled = true; };
  }, [id]);

  const showNotice = (m) => {
    setNotice(m);
    setTimeout(() => setNotice(""), 2500);
  };

  const handleCompareToggle = () => {
    if (!property?._id) return;
    const res = compare.toggle(property._id);
    if (!res.ok && res.reason === "limit") {
      showNotice(`You can compare up to ${res.limit} properties at once.`);
    } else if (res.action === "added") {
      showNotice("Added to comparison");
    } else if (res.action === "removed") {
      showNotice("Removed from comparison");
    }
  };

  const handleDelete = async () => {
    if (!property?._id) return;

    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/properties/${property._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/properties", {
        state: { successMessage: "Property deleted successfully." },
      });
    } catch (err) {
      showNotice(err.response?.data?.message || "Unable to delete this property.");
    }
  };

  if (loading) {
    return (
      <div
        data-testid="property-details-loading"
        className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-[50vh]"
      >
        <div className="text-gray-600 animate-pulse text-lg">Loading property...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="property-details-error"
        className="max-w-6xl mx-auto p-6 min-h-[50vh]"
      >
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <h2 className="font-semibold mb-1">Unable to load property</h2>
          <p className="text-sm">{error}</p>
          <Link to="/properties" className="inline-block mt-3 text-sm text-red-700 underline">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  if (!property) return null;

  const images = Array.isArray(property.images)
    ? property.images.filter(Boolean)
    : property.image
    ? [property.image]
    : [];

  const currentUserId = user?._id ? String(user._id) : "";
  const propertyOwnerId = property?.owner ? String(property.owner._id || property.owner) : "";
  const isOwner = Boolean(isAuthenticated && currentUserId && propertyOwnerId && currentUserId === propertyOwnerId);

  const safeActiveImg = activeImg >= 0 && activeImg < images.length ? activeImg : 0;
  const mainImage = images[safeActiveImg] || "https://via.placeholder.com/1200x700?text=No+Image";
  const selected = compare.has(property._id);

  return (
    <div data-testid="property-details-page" className="max-w-6xl mx-auto p-4 md:p-6 pt-24">
      <div className="mb-4">
        <Link to="/properties" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to listings
        </Link>
        <h1 data-testid="property-title" className="text-3xl md:text-4xl font-bold text-[#36454F] mt-2">
          {property.title || "Untitled property"}
        </h1>
        <p data-testid="property-location" className="text-gray-600 mt-1 flex items-center gap-1.5">
          <MapPin size={16} />
          <span>{property.location || "Location not specified"}</span>
          {property.type && (
            <span className="ml-2 inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
              <Building2 size={12} />{property.type}
            </span>
          )}
        </p>
      </div>

      {notice && (
        <div data-testid="details-notice" className="mb-4 bg-blue-50 border border-blue-200 text-[#0066CC] rounded-xl px-4 py-2.5 text-sm">
          {notice}
        </div>
      )}

      <div className="grid gap-3">
        <img
          data-testid="property-main-image"
          src={mainImage || "https://via.placeholder.com/1200x700?text=No+Image"}
          alt={property.title || "Property image"}
          className="w-full h-72 md:h-[460px] object-cover rounded-xl shadow-sm"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://via.placeholder.com/1200x700?text=No+Image";
          }}
        />
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={src || i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`shrink-0 border-2 rounded-lg overflow-hidden transition ${
                  i === safeActiveImg ? "border-[#0066CC]" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img src={src} alt={`thumb-${i}`} className="w-24 h-16 object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Spec icon={<BedDouble size={16} />} label="Bedrooms" value={property.bedrooms} testId="property-bedrooms" />
            <Spec icon={<Bath size={16} />} label="Bathrooms" value={property.bathrooms} testId="property-bathrooms" />
            <Spec icon={<Ruler size={16} />} label="Area" value={property.area ? `${property.area} sqft` : "—"} testId="property-area" />
            <Spec icon={<Building2 size={16} />} label="Type" value={property.type || "—"} testId="property-type" />
          </div>

          <section>
            <h2 className="text-xl font-semibold text-[#36454F] mb-2">Description</h2>
            <p
              data-testid="property-description"
              className="text-gray-700 leading-relaxed whitespace-pre-line"
            >
              {property.description || "No description provided."}
            </p>
          </section>
        </div>

        <aside className="md:col-span-1">
          <div className="border rounded-2xl p-5 shadow-sm sticky top-24 bg-white space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Price</p>
              <p data-testid="property-price" className="text-3xl font-bold text-[#36454F] mt-1">
                {formatPrice(property.price)}
              </p>
            </div>

            {/* AGENT CARD (Feature 3) */}
            {property.agent && (
              <div className="pt-5 border-t" data-testid="property-agent-card">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                  Listed by
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0066CC]/20"
                  />
                  <div>
                    <p className="font-semibold text-[#36454F]">{property.agent.name}</p>
                    <Link
                      to={`/agent/${property.agent._id}`}
                      data-testid="property-agent-profile-link"
                      className="text-xs text-[#0066CC] hover:underline"
                    >
                      View agent profile →
                    </Link>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><Phone size={14} className="text-[#0066CC]" />{property.agent.phone}</p>
                  <p className="flex items-center gap-2 break-all"><Mail size={14} className="text-[#0066CC]" />{property.agent.email}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-2">
              {property._id && (
                <Link
                  to={`/inquiry/${property._id}`}
                  data-testid="property-contact-btn"
                  className="block w-full text-center bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold rounded-xl py-3 transition"
                >
                  Contact Agent
                </Link>
              )}

              {isOwner && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    className="w-full text-center font-semibold rounded-xl py-3 transition bg-[#0066CC] text-white hover:bg-[#0052A3]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full text-center font-semibold rounded-xl py-3 transition bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleCompareToggle}
                data-testid="property-compare-btn"
                className={`w-full text-center font-semibold rounded-xl py-3 transition flex items-center justify-center gap-2 ${
                  selected
                    ? "bg-[#36454F] text-white hover:bg-[#0066CC]"
                    : "border border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
                }`}
              >
                {selected ? (<><X size={16} />Remove from Compare</>) : (<><CheckCircle2 size={16} />Add to Compare</>)}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const Spec = ({ icon, label, value, testId }) => (
  <div data-testid={testId} className="border rounded-xl p-3 bg-gray-50 text-center">
    <div className="text-[#0066CC] flex justify-center mb-1">{icon}</div>
    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="text-lg font-semibold text-[#36454F] mt-0.5">{value ?? "—"}</p>
  </div>
);

export default PropertyDetails;