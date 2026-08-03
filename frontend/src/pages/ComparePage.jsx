import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { X, MapPin, BedDouble, Bath, Ruler, Building2, ArrowRight } from "lucide-react";
import useCompare from "../hooks/useCompare";

const API_BASE = import.meta.env.VITE_API_URL;

const formatPrice = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

const ComparePage = () => {
  const compare = useCompare();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (compare.ids.length === 0) {
        setItems([]);
        return;
      }
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE}/properties/compare`, {
          params: { ids: compare.ids.join(",") },
        });
        if (!cancelled) setItems(res.data || []);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Failed to load comparison");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [compare.ids]);

  const rows = [
    { key: "price", label: "Price", render: (p) => (<span className="text-[#0066CC] font-bold text-xl">{formatPrice(p.price)}</span>) },
    { key: "location", label: "Location", render: (p) => (<span className="flex items-center gap-1.5 text-[#36454F]"><MapPin size={14} className="text-gray-400" />{p.location}</span>) },
    { key: "type", label: "Property Type", render: (p) => (<span className="inline-flex items-center gap-1 bg-gray-100 text-[#36454F] text-xs px-2.5 py-1 rounded-full font-medium"><Building2 size={12} />{p.type}</span>) },
    { key: "bedrooms", label: "Bedrooms", render: (p) => (<span className="flex items-center gap-1.5 text-[#36454F]"><BedDouble size={14} className="text-gray-400" />{p.bedrooms}</span>) },
    { key: "bathrooms", label: "Bathrooms", render: (p) => (<span className="flex items-center gap-1.5 text-[#36454F]"><Bath size={14} className="text-gray-400" />{p.bathrooms}</span>) },
    { key: "area", label: "Area", render: (p) => (<span className="flex items-center gap-1.5 text-[#36454F]"><Ruler size={14} className="text-gray-400" />{p.area} sqft</span>) },
    { key: "agent", label: "Agent", render: (p) => (
      p.agent ? (
        <Link to={`/agent/${p.agent._id}`} className="text-[#0066CC] hover:underline text-sm">
          {p.agent.name}
        </Link>
      ) : <span className="text-gray-400 text-sm">—</span>
    ) },
  ];

  return (
    <div className="bg-[#F8F4FF] min-h-screen py-20 pt-28" data-testid="compare-page">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#36454F]">Compare Properties</h1>
            <p className="text-gray-500 mt-2">
              Side-by-side comparison — up to <strong>{compare.max}</strong> properties.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/properties"
              data-testid="compare-back-btn"
              className="border border-[#36454F]/15 text-[#36454F] px-5 py-2.5 rounded-xl hover:bg-[#36454F] hover:text-white transition text-sm font-semibold"
            >
              + Add more
            </Link>
            {compare.count > 0 && (
              <button
                onClick={() => compare.clear()}
                data-testid="compare-clear-all-btn"
                className="border border-red-200 text-red-600 px-5 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition text-sm font-semibold"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {compare.count === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm" data-testid="compare-empty">
            <p className="text-lg text-[#36454F] font-semibold">No properties selected</p>
            <p className="text-gray-500 mt-2 mb-6">
              Add properties to compare from the listings page.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse properties <ArrowRight size={16} />
            </Link>
          </div>
        ) : loading ? (
          <p className="text-center text-gray-500 py-16" data-testid="compare-loading">Loading comparison...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-16">{error}</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-x-auto" data-testid="compare-table">
            <div
              className="grid gap-0 min-w-max"
              style={{ gridTemplateColumns: `160px repeat(${items.length}, minmax(240px, 1fr))` }}
            >
              {/* Header row */}
              <div className="p-5 border-b border-gray-100 bg-[#F8F4FF] font-semibold text-[#36454F] flex items-center">
                Property
              </div>
              {items.map((p) => (
                <div key={p._id} className="p-5 border-b border-gray-100 bg-[#F8F4FF] relative" data-testid={`compare-col-${p._id}`}>
                  <button
                    onClick={() => compare.remove(p._id)}
                    data-testid={`compare-remove-${p._id}`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white hover:bg-red-600 hover:text-white text-gray-500 flex items-center justify-center shadow-sm transition"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                  <img src={p.image} alt={p.title} className="w-full h-32 object-cover rounded-lg" />
                  <h3 className="mt-3 font-semibold text-[#36454F] text-sm line-clamp-2">{p.title}</h3>
                  <Link
                    to={`/property/${p._id}`}
                    data-testid={`compare-view-${p._id}`}
                    className="mt-2 inline-block text-xs text-[#0066CC] hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              ))}

              {/* Data rows */}
              {rows.map((row, idx) => (
                <Fragment key={row.key}>
                  <div
                    className={`p-5 text-sm font-medium text-gray-500 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                  >
                    {row.label}
                  </div>
                  {items.map((p) => (
                    <div
                      key={`${row.key}-${p._id}`}
                      className={`p-5 text-sm ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}
                      data-testid={`compare-${row.key}-${p._id}`}
                    >
                      {row.render(p)}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;