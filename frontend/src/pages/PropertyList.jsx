// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// function PropertyList() {
//   const [properties, setProperties] = useState([]);
//   useEffect(() => {
//   const fetchProperties = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/properties`
//       );

//       setProperties(res.data);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   fetchProperties();
// }, []);
// //   const properties = [
// //     {
// //       id: 1,
// //       title: "Luxury Villa",
// //       location: "Mumbai",
// //       price: "₹2.5 Cr",
// //       beds: 4,
// //       baths: 3,
// //       area: "3200 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
// //     },
// //     {
// //       id: 2,
// //       title: "Modern Apartment",
// //       location: "Delhi",
// //       price: "₹95 Lakh",
// //       beds: 3,
// //       baths: 2,
// //       area: "1800 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900",
// //     },
// //     {
// //       id: 3,
// //       title: "Family House",
// //       location: "Bangalore",
// //       price: "₹1.4 Cr",
// //       beds: 4,
// //       baths: 3,
// //       area: "2500 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900",
// //     },
// //     {
// //       id: 4,
// //       title: "Beach Villa",
// //       location: "Goa",
// //       price: "₹3.2 Cr",
// //       beds: 5,
// //       baths: 4,
// //       area: "4200 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900",
// //     },
// //     {
// //       id: 5,
// //       title: "Penthouse",
// //       location: "Noida",
// //       price: "₹2.8 Cr",
// //       beds: 4,
// //       baths: 3,
// //       area: "3000 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900",
// //     },
// //     {
// //       id: 6,
// //       title: "Farm House",
// //       location: "Pune",
// //       price: "₹1.8 Cr",
// //       beds: 5,
// //       baths: 4,
// //       area: "4500 sqft",
// //       image:
// //         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900",
// //     },
// //     {
// //   id: 7,
// //   title: "Luxury Duplex",
// //   location: "Hyderabad",
// //   price: "₹2.2 Cr",
// //   beds: 4,
// //   baths: 3,
// //   area: "3100 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
// // },
// // {
// //   id: 8,
// //   title: "Skyline Penthouse",
// //   location: "Gurgaon",
// //   price: "₹4.5 Cr",
// //   beds: 5,
// //   baths: 4,
// //   area: "4800 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=900",
// // },
// // {
// //   id: 9,
// //   title: "Lake View Villa",
// //   location: "Udaipur",
// //   price: "₹3.8 Cr",
// //   beds: 5,
// //   baths: 4,
// //   area: "4500 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900",
// // },
// // {
// //   id: 10,
// //   title: "Modern Studio",
// //   location: "Chandigarh",
// //   price: "₹65 Lakh",
// //   beds: 2,
// //   baths: 1,
// //   area: "1100 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
// // },
// // {
// //   id: 11,
// //   title: "Luxury Mansion",
// //   location: "Jaipur",
// //   price: "₹6.2 Cr",
// //   beds: 6,
// //   baths: 5,
// //   area: "6500 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=900",
// // },
// // {
// //   id: 12,
// //   title: "Mountain Cottage",
// //   location: "Manali",
// //   price: "₹1.3 Cr",
// //   beds: 3,
// //   baths: 2,
// //   area: "2100 sqft",
// //   image:
// //     "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=900",
// // },
// //   ];

//   return (
//     <div className="bg-[#F8F4FF] min-h-screen py-20">

//       <div className="max-w-7xl mx-auto px-6">

//         <h1 className="text-5xl font-bold text-[#36454F] text-center">
//           Featured Properties
//         </h1>

//         <p className="text-center text-gray-500 mt-4 mb-12">
//           Discover our hand-picked premium properties.
//         </p>

//         {/* Search */}

//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">

//           <div className="grid md:grid-cols-4 gap-4">

//             <input
//               type="text"
//               placeholder="Search Location..."
//               className="border rounded-xl px-4 py-3 outline-none"
//             />

//             <select className="border rounded-xl px-4 py-3 outline-none">
//               <option>Property Type</option>
//               <option>Villa</option>
//               <option>Apartment</option>
//               <option>House</option>
//             </select>

//             <select className="border rounded-xl px-4 py-3 outline-none">
//               <option>Budget</option>
//               <option>₹50L+</option>
//               <option>₹1Cr+</option>
//               <option>₹2Cr+</option>
//             </select>

//             <button className="bg-[#0066CC] text-white rounded-xl hover:bg-[#0052A3]">
//               Search
//             </button>

//           </div>

//         </div>

//         {/* Cards */}

//         <div className="grid md:grid-cols-3 gap-8">

//           {properties.map((property) => (

//             <div
//               key={property.id}
//               className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
//             >

//               <img
//                 src={property.image}
//                 alt={property.title}
//                 className="w-full h-60 object-cover"
//               />

//               <div className="p-6">

//                 <h2 className="text-2xl font-bold text-[#36454F]">
//                   {property.title}
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   📍 {property.location}
//                 </p>

//                 <p className="text-[#0066CC] text-2xl font-bold mt-4">
//                   ₹{property.price.toLocaleString("en-IN")}
//                 </p>

//                 <div className="flex justify-between mt-6 text-gray-600">

//                   <span>🛏 {property.bedrooms}</span>

//                   <span>🛁 {property.bathrooms}</span>

//                   <span>📐 {property.area} sqft</span>

//                 </div>

//                 <p className="text-gray-500 mt-6">
//                   Beautiful premium property located in a prime area with
//                   excellent connectivity.
//                 </p>

//                 <div className="flex gap-3 mt-8">

//                   <Link
//   to={`/property/${property._id}`}
//   className="flex-1 bg-[#0066CC] text-white py-3 rounded-xl hover:bg-[#0052A3] text-center"
// >
//   View Details
// </Link>

//                   <button className="flex-1 border border-[#0066CC] text-[#0066CC] py-3 rounded-xl hover:bg-[#0066CC] hover:text-white">
//                     Talk to Agent
//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default PropertyList;

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Search, MapPin, Building2, IndianRupee, BedDouble, Bath, ArrowRight, X, CheckCircle2 } from "lucide-react";
import useCompare from "../hooks/useCompare";

const API_BASE = import.meta.env.VITE_API_URL;

const PROPERTY_TYPES = ["Apartment", "Villa", "House", "Studio", "Plot", "Commercial"];
const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const formatPrice = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

function PropertyList() {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState(location.state?.successMessage || "");

  const compare = useCompare();

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    sort: "latest",
  });

  const fetchProperties = useCallback(async (currentFilters) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      Object.entries(currentFilters).forEach(([k, v]) => {
        if (v !== "" && v !== undefined && v !== null) params[k] = v;
      });
      const res = await axios.get(`${API_BASE}/properties`, { params });
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.response?.data?.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProperties(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e?.preventDefault?.();
    fetchProperties(filters);
  };

  const handleReset = () => {
    const cleared = {
      location: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      sort: "latest",
    };
    setFilters(cleared);
    fetchProperties(cleared);
  };

  // Re-fetch when sort changes (nice UX)
  const handleSortChange = (e) => {
    const nextSort = e.target.value;
    const next = { ...filters, sort: nextSort };
    setFilters(next);
    fetchProperties(next);
  };

  useEffect(() => {
    if (location.state?.successMessage) {
      setBanner(location.state.successMessage);
      const timer = setTimeout(() => setBanner(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const showBanner = (msg) => {
    setBanner(msg);
    setTimeout(() => setBanner(""), 2500);
  };

  const handleCompareClick = (id) => {
    const res = compare.toggle(id);
    if (!res.ok && res.reason === "limit") {
      showBanner(`You can compare up to ${res.limit} properties at once.`);
    } else if (res.action === "added") {
      showBanner("Added to comparison");
    } else if (res.action === "removed") {
      showBanner("Removed from comparison");
    }
  };

  return (
    <div className="bg-[#F8F4FF] min-h-screen py-20" data-testid="property-list-page">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-[#36454F] text-center">
          Featured Properties
        </h1>
        <p className="text-center text-gray-500 mt-4 mb-12">
          Discover our hand-picked premium properties.
        </p>

        {/* ---------- FILTER BAR (Feature 1) ---------- */}
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          data-testid="property-filter-form"
        >
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center border rounded-xl px-4">
              <MapPin className="text-gray-400" size={18} />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="Location"
                data-testid="filter-location"
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <Building2 className="text-gray-400" size={18} />
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                data-testid="filter-type"
                className="w-full px-3 py-3 outline-none bg-transparent"
              >
                <option value="">Any Type</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <IndianRupee className="text-gray-400" size={18} />
              <input
                type="number"
                min="0"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min Price"
                data-testid="filter-min-price"
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <IndianRupee className="text-gray-400" size={18} />
              <input
                type="number"
                min="0"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max Price"
                data-testid="filter-max-price"
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <BedDouble className="text-gray-400" size={18} />
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                data-testid="filter-bedrooms"
                className="w-full px-3 py-3 outline-none bg-transparent"
              >
                <option value="">Any Beds</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+ Beds</option>
                ))}
              </select>
            </div>

            <div className="flex items-center border rounded-xl px-4">
              <Bath className="text-gray-400" size={18} />
              <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                data-testid="filter-bathrooms"
                className="w-full px-3 py-3 outline-none bg-transparent"
              >
                <option value="">Any Baths</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+ Baths</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-500">Sort by:</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleSortChange}
                data-testid="filter-sort"
                className="border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0066CC]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                data-testid="filter-reset-btn"
                className="px-5 py-2.5 border border-[#36454F]/15 text-[#36454F] rounded-xl hover:bg-[#36454F] hover:text-white transition text-sm font-semibold"
              >
                Reset
              </button>
              <button
                type="submit"
                data-testid="filter-search-btn"
                className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Compare bar */}
        {compare.count > 0 && (
          <div
            data-testid="compare-bar"
            className="mb-8 bg-white border border-[#0066CC]/30 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3 shadow-sm"
          >
            <p className="text-sm text-[#36454F]">
              <span className="font-semibold text-[#0066CC]">{compare.count}</span> of {compare.max} properties selected for comparison
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => compare.clear()}
                data-testid="compare-clear-btn"
                className="text-sm text-gray-500 hover:text-[#36454F] px-3"
              >
                Clear all
              </button>
              <Link
                to="/compare"
                data-testid="compare-view-btn"
                className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
              >
                Compare now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {banner && (
          <div
            data-testid="compare-banner"
            className="mb-6 bg-blue-50 border border-blue-200 text-[#0066CC] rounded-xl px-4 py-2.5 text-sm"
          >
            {banner}
          </div>
        )}

        {/* States */}
        {loading ? (
          <p data-testid="property-loading" className="text-center text-gray-500 py-16">Loading properties...</p>
        ) : error ? (
          <p data-testid="property-error" className="text-center text-red-600 py-16">{error}</p>
        ) : properties.length === 0 ? (
          <p data-testid="property-empty" className="text-center text-gray-500 py-16">
            No properties match your search. Try widening your filters.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="property-grid">
            {properties.map((property) => {
              const selected = compare.has(property._id);
              return (
                <div
                  key={property._id}
                  data-testid={`property-card-${property._id}`}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-2xl relative ${
                    selected ? "ring-2 ring-[#0066CC]" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={property.image || "https://via.placeholder.com/900x600?text=No+Image"}
                      alt={property.title}
                      className="w-full h-60 object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://via.placeholder.com/900x600?text=No+Image";
                      }}
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#36454F] text-xs font-semibold px-3 py-1 rounded-full">
                      {property.type}
                    </span>
                    {selected && (
                      <span className="absolute top-4 right-4 bg-[#0066CC] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={12} /> Selected
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#36454F] line-clamp-1">
                      {property.title}
                    </h2>
                    <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
                      <MapPin size={14} />
                      {property.location}
                    </p>

                    <p className="text-[#0066CC] text-2xl font-bold mt-4">
                      {formatPrice(property.price)}
                    </p>

                    <div className="flex justify-between mt-4 text-gray-600 text-sm">
                      <span className="flex items-center gap-1"><BedDouble size={15} /> {property.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath size={15} /> {property.bathrooms}</span>
                      <span>📐 {property.area} sqft</span>
                    </div>

                    {property.agent && (
                      <Link
                        to={`/agent/${property.agent._id}`}
                        data-testid={`property-agent-link-${property._id}`}
                        className="mt-4 flex items-center gap-2.5 text-xs text-gray-500 hover:text-[#0066CC] transition"
                      >
                        <img
                          src={property.agent.photo}
                          alt={property.agent.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span>Listed by <strong>{property.agent.name}</strong></span>
                      </Link>
                    )}

                    <div className="flex gap-2 mt-5">
                      <Link
                        to={`/property/${property._id}`}
                        data-testid={`view-details-${property._id}`}
                        className="flex-1 bg-[#0066CC] text-white py-2.5 rounded-xl hover:bg-[#0052A3] text-center text-sm font-semibold transition"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleCompareClick(property._id)}
                        data-testid={`compare-toggle-${property._id}`}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
                          selected
                            ? "bg-[#36454F] text-white hover:bg-[#0066CC]"
                            : "border border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
                        }`}
                      >
                        {selected ? (<><X size={14} />Remove</>) : "Compare"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyList;