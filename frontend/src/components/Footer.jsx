import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Sell", to: "/sell" },
  { label: "About Us", to: "/about" },
];

const SERVICES = [
  { label: "Property Valuation", to: "/services/valuation" },
  { label: "Home Loans", to: "/services/loans" },
  { label: "Legal Assistance", to: "/services/legal" },
  { label: "Interior Consultation", to: "/services/interiors" },
];


const SOCIALS = [];

function Footer() {
  return (
    <footer className="bg-[#36454F] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Home<span className="text-[#0066CC]">Scape</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Premium Real Estate Platform. Verified properties, trusted
            agents, and a buying process built around transparency.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0066CC] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-[#0066CC] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-[#0066CC] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Customer Support
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#0066CC] shrink-0" />
              <a href="mailto:hello@homescape.com" className="hover:text-[#0066CC] transition-colors">
                hello@homescape.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#0066CC] shrink-0" />
              <a href="tel:+911234567890" className="hover:text-[#0066CC] transition-colors">
                +91 12345 67890
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-[#0066CC] shrink-0" />
              123 MG Road, Bengaluru, India
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} HomeScape. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-[#0066CC] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[#0066CC] transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;