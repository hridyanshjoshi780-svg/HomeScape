import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, ArrowLeft, Phone, Mail, MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const formatPrice = (n) =>
  typeof n === "number" && !Number.isNaN(n)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(n)
    : "—";

const InquiryPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [propertyError, setPropertyError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setPropertyError("");
      try {
        const { data } = await axios.get(`${API_BASE}/properties/${propertyId}`);
        if (!cancelled) setProperty(data);
      } catch (err) {
        if (!cancelled) setPropertyError(err.response?.data?.message || "Failed to load property");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (propertyId) load();
    return () => { cancelled = true; };
  }, [propertyId]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setSubmitError("Please fill in every field.");
      return;
    }
    // basic email check
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/inquiries`, {
        ...form,
        propertyId,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div data-testid="inquiry-loading" className="min-h-screen flex items-center justify-center bg-[#F8F4FF]">
        <p className="text-gray-500 animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  if (propertyError || !property) {
    return (
      <div className="min-h-screen bg-[#F8F4FF] pt-28 px-6">
        <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          <h2 className="font-semibold mb-1">Unable to load property</h2>
          <p className="text-sm">{propertyError || "Property not found"}</p>
          <Link to="/properties" className="inline-block mt-3 text-sm text-red-700 underline">
            ← Back to listings
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F4FF] pt-28 px-6 pb-16" data-testid="inquiry-success">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-[#36454F]">Inquiry Sent!</h1>
          <p className="mt-3 text-gray-500">
            Thanks {form.name}. Our agent will get in touch with you shortly regarding{" "}
            <strong className="text-[#36454F]">{property.title}</strong>.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(`/property/${property._id}`)}
              data-testid="inquiry-back-btn"
              className="border border-[#36454F]/15 text-[#36454F] px-6 py-2.5 rounded-xl hover:bg-[#36454F] hover:text-white transition text-sm font-semibold"
            >
              Back to property
            </button>
            <Link
              to="/properties"
              data-testid="inquiry-browse-btn"
              className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-6 py-2.5 rounded-xl transition text-sm font-semibold"
            >
              Browse more properties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F4FF] min-h-screen pt-24 pb-16 px-6" data-testid="inquiry-page">
      <div className="max-w-5xl mx-auto">
        <Link to={`/property/${property._id}`} className="text-sm text-gray-500 hover:text-[#36454F] flex items-center gap-1.5">
          <ArrowLeft size={14} /> Back to property
        </Link>

        <div className="mt-6 grid md:grid-cols-5 gap-6">
          {/* Left: property summary */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#36454F]">{property.title}</h2>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1"><MapPin size={13} />{property.location}</p>
              <p className="text-[#0066CC] text-2xl font-bold mt-3">{formatPrice(property.price)}</p>

              {property.agent && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">You are contacting</p>
                  <div className="flex items-center gap-3">
                    <img src={property.agent.photo} alt={property.agent.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0066CC]/20" />
                    <div>
                      <p className="font-semibold text-[#36454F]">{property.agent.name}</p>
                      <p className="text-xs text-gray-500">Real Estate Agent</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><Phone size={13} className="text-[#0066CC]" />{property.agent.phone}</p>
                    <p className="flex items-center gap-2 break-all"><Mail size={13} className="text-[#0066CC]" />{property.agent.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white rounded-3xl shadow-lg p-8"
            data-testid="inquiry-form"
          >
            <h1 className="text-3xl font-bold text-[#36454F]">Contact Agent</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Fill in the form below and the agent will reach out to you soon.
            </p>

            {submitError && (
              <div data-testid="inquiry-error" className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                {submitError}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-[#36454F]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  data-testid="inquiry-name"
                  placeholder="John Doe"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0066CC]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#36454F]">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  data-testid="inquiry-phone"
                  placeholder="+91 98765 43210"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0066CC]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-[#36454F]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  data-testid="inquiry-email"
                  placeholder="you@example.com"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0066CC]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-[#36454F]">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  data-testid="inquiry-message"
                  placeholder={`I am interested in "${property.title}". Please share more details...`}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0066CC] resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              data-testid="inquiry-submit-btn"
              className="w-full mt-6 bg-[#0066CC] hover:bg-[#0052A3] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition"
            >
              {submitting ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;