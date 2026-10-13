import React from 'react';
import { Building, ShieldCheck, TrendingUp, Key, Search, FileCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServicesPageProps {
  onOpenEnquiry: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
  const services = [
    {
      icon: Search,
      title: 'Exclusive Buyer Representation',
      desc: 'Bespoke search strategies, off-market property access, and confidential negotiation on behalf of private buyers and institutional collectors.',
    },
    {
      icon: TrendingUp,
      title: 'Trophy Asset Marketing & Disposition',
      desc: 'Editorial architectural cinematography, bespoke private print dossiers, and targeted dissemination to pre-qualified global high-net-worth networks.',
    },
    {
      icon: Building,
      title: 'Commercial Real Estate Advisory',
      desc: 'Comprehensive acquisition, leasing, and portfolio management for Class-A office buildings, boutique retail headquarters, and development parcels.',
    },
    {
      icon: FileCheck,
      title: 'Comprehensive Valuation & Zoning Diligence',
      desc: 'Detailed market comparative analytics, municipal zoning verification, architectural feasibility reports, and capital yield assessments.',
    },
    {
      icon: Key,
      title: 'New Development Project Marketing',
      desc: 'From architectural concept to sellout: advisory on unit mix, amenity programming, branding narratives, and global sales campaign execution.',
    },
    {
      icon: ShieldCheck,
      title: 'Family Office Real Estate Stewardship',
      desc: 'Consolidated real estate portfolio oversight, periodic valuation audits, property tax strategy coordination, and succession asset planning.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
          Comprehensive Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Sandpiper Advisory Services
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Delivering multi-disciplinary real estate advisory designed for complex acquisitions, luxury dispositions, and institutional-grade assets.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-stone-100 text-[#0B192C] flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{s.desc}</p>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="text-xs font-bold uppercase tracking-wider text-[#0B192C] hover:text-[#C5A880] flex items-center gap-1.5 pt-2"
            >
              <span>Consult Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA Box */}
      <div className="bg-[#0B192C] text-stone-100 p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-4xl mx-auto space-y-6">
        <h3 className="font-serif text-3xl font-bold text-white">
          Require Specialized Transaction Guidance?
        </h3>
        <p className="text-stone-300 text-sm max-w-xl mx-auto">
          Contact our principal partners directly to arrange a confidential review of your property parameters or portfolio requirements.
        </p>
        <button
          onClick={onOpenEnquiry}
          className="px-8 py-3.5 bg-[#C5A880] text-[#0B192C] font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors"
        >
          Request Confidential Consultation
        </button>
      </div>
    </div>
  );
};
