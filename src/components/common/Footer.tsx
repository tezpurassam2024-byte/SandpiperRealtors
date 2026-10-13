import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B192C] text-stone-300 pt-16 pb-12 border-t border-[#1E3E62]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E3E62]/50">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#C5A880] to-[#997E59] flex items-center justify-center text-[#0B192C]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-brand tracking-widest text-lg font-bold uppercase text-stone-100">
                  Sandpiper
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-medium">
                  Realtors
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Curating exceptional architectural residences, trophy commercial estates, and bespoke coastal properties with uncompromising discretion and market mastery.
            </p>
            <div className="text-xs text-[#C5A880] font-serif italic">
              &ldquo;Find Your Place. Build Your Future.&rdquo;
            </div>

            <div className="pt-2 flex flex-col gap-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>450 Newport Center Drive, Suite 800, Newport Beach, CA 92660</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>+1 (800) 540-SAND (7263) &middot; Direct Advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>concierge@sandpiperrealtors.com</span>
              </div>
            </div>
          </div>

          {/* Real Estate Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              Property Categories
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/properties?type=villa" className="hover:text-stone-100 transition-colors">
                  Coastal & Modern Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=penthouse" className="hover:text-stone-100 transition-colors">
                  Skyline Penthouses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="hover:text-stone-100 transition-colors">
                  Architectural Houses
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="hover:text-stone-100 transition-colors">
                  Class-A Commercial
                </Link>
              </li>
              <li>
                <Link to="/new-projects" className="hover:text-stone-100 transition-colors">
                  New Developments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=plot" className="hover:text-stone-100 transition-colors">
                  Residential Land & Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              Premier Markets
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/properties?city=Newport+Beach" className="hover:text-stone-100 transition-colors">
                  Newport Beach, CA
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Manhattan" className="hover:text-stone-100 transition-colors">
                  Manhattan, NY
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Greenwich" className="hover:text-stone-100 transition-colors">
                  Greenwich, CT
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Miami" className="hover:text-stone-100 transition-colors">
                  Miami & Key Biscayne, FL
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Napa+Valley" className="hover:text-stone-100 transition-colors">
                  Napa Valley Wine Country
                </Link>
              </li>
              <li>
                <Link to="/properties?city=Chicago" className="hover:text-stone-100 transition-colors">
                  Chicago Loop & North Shore
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-4">
              The Firm
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/about" className="hover:text-stone-100 transition-colors">
                  About Sandpiper
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-stone-100 transition-colors">
                  Private Advisors
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-stone-100 transition-colors">
                  Advisory Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-stone-100 transition-colors">
                  Client FAQ & Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-stone-100 transition-colors">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-[#C5A880]/80 hover:text-[#C5A880] transition-colors">
                  Internal Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Sandpiper Realtors Inc. All rights reserved. Registered Real Estate Brokerage.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-stone-200 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-stone-200 transition-colors">
              Terms & Legal Disclaimers
            </Link>
            <span className="flex items-center gap-1 text-stone-400">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" /> Equal Housing Opportunity
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
