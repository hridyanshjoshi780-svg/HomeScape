import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Phone, MapPin, BedDouble, Bath, ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const formatPrice = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_BASE}/agents/${id}`);
        if (!cancelled) setAgent(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Failed to load agent");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (id) load();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div data-testid="agent-loading" className="min-h-screen flex items-center justify-center bg-[#F8F4FF]">
        <p className="text-gray-500 animate-pulse text-lg">Loading agent...</p>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div data-testid="agent-error" className="min-h-screen bg-[#F8F4FF] pt-28 px-6">
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <h2 className="font-semibold mb-1">Unable to load agent</h2>
          <p className="text-sm">{error || "Agent not found"}</p>
          <Link to="/properties" className="inline-block mt-3 text-sm text-red-700 underline">
            ← Back to properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F4FF] min-h-screen pt-24 pb-20 px-6" data-testid="agent-profile-page">
      <div className="max-w-6xl mx-auto">
        <Link to="/properties" className="text-sm text-gray-500 hover:text-[#36454F] flex items-center gap-1.5">
          <ArrowLeft size={14} /> Back to listings
        </Link>

        {/* Hero card */}
        <div className="mt-6 bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-[#0066CC] to-[#0052A3]" />
          <div className="px-8 pb-8 -mt-16 relative">
            <img
              data-testid="agent-photo"
              src={agent.photo}
              alt={agent.name}
              className="w-32 h-32 rounded-full ring-4 ring-white object-cover shadow-lg"
            />
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 data-testid="agent-name" className="text-3xl font-bold text-[#36454F]">
                  {agent.name}
                </h1>
                <p className="text-gray-500 mt-1 text-sm">Real Estate Agent · HomeScape</p>
                {agent.bio && (
                  <p data-testid="agent-bio" className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
                    {agent.bio}
                  </p>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <a
                  href={`tel:${agent.phone}`}
                  data-testid="agent-phone"
                  className="flex items-center gap-2 text-[#36454F] hover:text-[#0066CC]"
                >
                  <Phone size={15} className="text-[#0066CC]" />
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  data-testid="agent-email"
                  className="flex items-center gap-2 text-[#36454F] hover:text-[#0066CC]"
                >
                  <Mail size={15} className="text-[#0066CC]" />
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#36454F]">
            Properties by {agent.name}
            <span className="ml-3 text-sm font-normal text-gray-500">
              ({agent.properties?.length || 0} listings)
            </span>
          </h2>

          {(!agent.properties || agent.properties.length === 0) ? (
            <p data-testid="agent-no-properties" className="mt-6 bg-white rounded-2xl p-8 text-center text-gray-500">
              This agent has no listed properties yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" data-testid="agent-property-grid">
              {agent.properties.map((p) => (
                <Link
                  key={p._id}
                  to={`/property/${p._id}`}
                  data-testid={`agent-property-${p._id}`}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition duration-300"
                >
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <h3 className="font-semibold text-[#36454F] line-clamp-1">{p.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1"><MapPin size={13} />{p.location}</p>
                    <p className="text-[#0066CC] text-lg font-bold mt-2">{formatPrice(p.price)}</p>
                    <div className="flex gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><BedDouble size={13} />{p.bedrooms}</span>
                      <span className="flex items-center gap-1"><Bath size={13} />{p.bathrooms}</span>
                      <span>📐 {p.area} sqft</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;