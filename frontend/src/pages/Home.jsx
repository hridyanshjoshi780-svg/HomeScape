import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  BedDouble,
  Bath,
  Ruler,
  Home as HomeIcon,
  Wallet,
  Handshake,
  Zap,
  Star,
} from "lucide-react";
import useReveal from "../hooks/useReveal";

/* ------------------------------------------------------------------ */
/*  Reveal — fade-up wrapper shared by every section below             */
/* ------------------------------------------------------------------ */
function Reveal({ as: Tag = "div", delay = "0", className = "", children }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Mock data — swap for real API data when ready                      */
/* ------------------------------------------------------------------ */
const ABOUT_FEATURES = [
  "Verified Properties",
  "Trusted Agents",
  "Best Deals",
  "Safe Transactions",
  "Easy Buying Process",
];

const FEATURED_PROPERTIES = [
  {
    id: 1,
    name: "The Aurelia Residence",
    location: "Whitefield, Bengaluru",
    price: "₹2.4 Cr",
    beds: 4,
    baths: 3,
    area: "3,200 sqft",
    description: "A sun-drenched villa with private courtyard gardens and skyline views.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Marigold Heights",
    location: "Bandra West, Mumbai",
    price: "₹5.1 Cr",
    beds: 3,
    baths: 2,
    area: "2,150 sqft",
    description: "Sea-facing apartment with floor-to-ceiling glass and a private terrace.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Cedarwood Villa",
    location: "Gurugram Sector 54",
    price: "₹3.8 Cr",
    beds: 5,
    baths: 4,
    area: "4,000 sqft",
    description: "Contemporary architecture wrapped in warm cedar and landscaped lawns.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: HomeIcon,
    title: "Verified Properties",
    description: "Every listing is site-verified and legally vetted before it reaches you.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Transparent pricing with zero hidden charges, always.",
  },
  {
    icon: Handshake,
    title: "Trusted Agents",
    description: "Work with agents who are background-checked and rated by real clients.",
  },
  {
    icon: Zap,
    title: "Fast Process",
    description: "From shortlist to sale deed, we keep paperwork moving in days, not months.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "The entire process felt effortless. Our agent found our home within two weeks.",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    review: "Transparent pricing, verified documents, and a support team that picks up the phone.",
  },
  {
    id: 3,
    name: "Priya Nair",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 4,
    review: "We sold our apartment 20% above estimate thanks to their market insights.",
  },
];

/* ------------------------------------------------------------------ */
/*  Home                                                                */
/* ------------------------------------------------------------------ */
function Home() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [properties, setProperties] = useState([]);

useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties`
      );

      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProperties();
}, []);

  return (
    <>
      {/* ========================= HERO SECTION ========================= */}
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <p className="uppercase tracking-[7px] text-blue-400 font-semibold">
              Premium Real Estate Platform
            </p>

            <h1 className="mt-6 text-6xl md:text-7xl font-bold text-white leading-tight">
              Find Your Perfect Home
            </h1>

            <p className="mt-8 text-xl text-gray-200 max-w-3xl mx-auto leading-8">
              Discover premium verified properties across India. Buy, Sell
              and Rent your dream home with trusted real estate experts.
            </p>

            <div className="mt-12 flex justify-center gap-6">
              <Link
                to="/properties"
                className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8 py-4 rounded-xl font-semibold transition duration-300 hover:scale-[1.03]"
              >
                Explore Properties
              </Link>

              <Link
                to="/contact"
                className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#36454F] transition duration-300"
              >
                Contact Agent
              </Link>
            </div>
          </div>
        </div>

        {/* ========================= FLOATING SEARCH ========================= */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6">
          <div className="bg-[#F8F4FF]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white">
            {/* Tab switcher */}
            <div className="relative w-fit flex rounded-full bg-[#F8F4FF] p-1 mb-5">
              {["Buy", "Rent", "Sell"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeTab === tab ? "text-[#36454F]" : "text-[#36454F]/50 hover:text-[#36454F]"
                  }`}
                >
                  {activeTab === tab && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-[#0066CC]/25" />
                  )}
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-5">
              <div className="flex items-center border rounded-xl px-4">
                <MapPin className="text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-4 outline-none"
                />
              </div>

              <div className="flex items-center border rounded-xl px-4">
                <Building2 className="text-gray-400" size={22} />
                <select className="w-full p-4 outline-none bg-transparent">
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Independent House</option>
                  <option>Plot</option>
                </select>
              </div>

              <div className="flex items-center border rounded-xl px-4">
                <IndianRupee className="text-gray-400" size={22} />
                <select className="w-full p-4 outline-none bg-transparent">
                  <option>Budget</option>
                  <option>₹50 Lakh</option>
                  <option>₹1 Crore</option>
                  <option>₹2 Crore+</option>
                </select>
              </div>

              <button className="bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-xl flex items-center justify-center gap-3 font-semibold transition">
                <Search size={22} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= STATS ========================= */}
      <section className="bg-[#F8F4FF] pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: "15K+", label: "Properties Listed" },
              { value: "8K+", label: "Happy Customers" },
              { value: "120+", label: "Trusted Agents" },
              { value: "99%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <Reveal key={stat.label}>
                <h2 className="text-5xl font-bold text-[#36454F]">{stat.value}</h2>
                <p className="mt-3 text-gray-500">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= ABOUT ========================= */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#36454F]/10">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
                alt="Modern living room in a recently sold HomeScape property"
                className="w-full h-[420px] sm:h-[480px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 rounded-2xl bg-[#36454F] text-white p-5 shadow-xl">
              <p className="text-3xl font-bold text-[#0066CC]">14+</p>
              <p className="mt-1 text-sm text-white/80">Years helping families find home</p>
            </div>
          </Reveal>

          <Reveal delay="150">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066CC]">
              About HomeScape
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#36454F] leading-tight">
              Real estate, handled with the care of a trusted friend
            </h2>
            <p className="mt-5 text-gray-500 leading-relaxed">
              We built HomeScape because buying or selling a home shouldn't
              feel like a leap of faith. Every listing is verified, every
              agent is vetted, and every step is designed to keep you
              informed — not overwhelmed.
            </p>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ABOUT_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-[#36454F]">
                  <CheckCircle2 size={18} className="text-[#0066CC] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white px-7 py-3 rounded-xl font-semibold transition duration-300"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========================= FEATURED PROPERTIES ========================= */}
      <section className="bg-[#F8F4FF] px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066CC]">
              Handpicked Listings
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#36454F]">
              Featured Properties
            </h2>
            <p className="mt-4 text-gray-500">
              Discover our latest premium listings, verified and ready to view.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map((property, i) => (
              <Reveal key={property.id} delay={String(i * 120)}>
                <article className="group bg-white rounded-3xl shadow-md ring-1 ring-[#36454F]/5 overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#36454F] text-xs font-semibold px-3 py-1 rounded-full">
                      {property.price}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#36454F]">{property.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} />
                      {property.location}
                    </p>

                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                      {property.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 py-3 border-y border-[#36454F]/8 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={15} /> {property.beds} Beds
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bath size={15} /> {property.baths} Baths
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Ruler size={15} /> {property.area}
                      </span>
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        to={`/properties/${property.id}`}
                        className="flex-1 text-center bg-[#0066CC] hover:bg-[#0052A3] text-white py-2.5 rounded-xl text-sm font-semibold transition"
                      >
                        Buy Property
                      </Link>
                      <Link
                        to="/contact"
                        className="flex-1 text-center border border-[#36454F]/15 text-[#36454F] py-2.5 rounded-xl text-sm font-semibold hover:border-[#0066CC] hover:text-[#0066CC] transition"
                      >
                        Talk to Agent
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex justify-center">
            <Link
              to="/properties"
              className="border border-[#36454F]/15 text-[#36454F] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#36454F] hover:text-white transition duration-300"
            >
              View All Properties
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========================= WHY CHOOSE US ========================= */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066CC]">
              Why HomeScape
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#36454F]">
              Why Choose Us
            </h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item, i) => (
              <Reveal key={item.title} delay={String(i * 100)}>
                <div className="group h-full rounded-3xl border border-[#36454F]/8 p-7 transition-all duration-400 hover:-translate-y-1.5 hover:border-[#0066CC]/40 hover:shadow-xl">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#36454F] text-white transition-colors duration-300 group-hover:bg-[#0066CC]">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#36454F]">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="bg-[#F8F4FF] px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066CC]">
              Client Stories
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#36454F]">
              What Our Clients Say
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-7">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.id} delay={String(i * 130)}>
                <figure className="h-full bg-white rounded-3xl p-7 shadow-sm ring-1 ring-[#36454F]/5">
                  <div className="flex gap-0.5 text-[#0066CC]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={15}
                        fill={idx < t.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm text-gray-600 leading-relaxed">
                    “{t.review}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      loading="lazy"
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-[#36454F]">{t.name}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className="relative px-6 py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#36454F]/85" />

        <Reveal className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Find Your Dream Home?
          </h2>
          <p className="mt-4 text-white/75">
            Browse verified listings today, or speak with an agent who can
            shortlist homes for you personally.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/properties"
              className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8 py-3.5 rounded-xl font-semibold transition duration-300 hover:scale-[1.03]"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white hover:text-[#36454F] transition duration-300"
            >
              Contact Agent
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export default Home;