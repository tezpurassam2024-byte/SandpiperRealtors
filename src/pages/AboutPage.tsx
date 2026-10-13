import React from 'react';
import { Compass, Shield, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
          The Heritage of Sandpiper Realtors
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Find Your Place. Build Your Future.
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Founded on principles of architectural reverence, fiduciary transparency, and unmatched market diligence, Sandpiper Realtors represents the vanguard of modern luxury real estate brokerage.
        </p>
      </div>

      {/* Main Narrative with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            A Legacy of Discretion and Architectural Distinction
          </h2>
          <p>
            At Sandpiper Realtors, we believe that an extraordinary residence is more than an asset class — it is a sanctuary where legacy is fostered. From coastal estates along California’s golden shores to landmark skyline penthouses in Manhattan, our portfolio reflects exceptional design, engineering, and cultural provenance.
          </p>
          <p>
            Our firm was established to bridge the gap between traditional brokerage and bespoke private wealth advisory. We provide institutional-grade due diligence, zoning analysis, and structural evaluations, all handled under strict confidentiality protocols.
          </p>
          <div className="pt-2 grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-100 rounded-lg border border-stone-200">
              <div className="text-2xl font-serif font-bold text-[#0B192C]">$1.4B+</div>
              <div className="text-xs text-stone-600 mt-1">Transaction Volume Advised</div>
            </div>
            <div className="p-4 bg-stone-100 rounded-lg border border-stone-200">
              <div className="text-2xl font-serif font-bold text-[#0B192C]">99.4%</div>
              <div className="text-xs text-stone-600 mt-1">Client Retention & Referral Rate</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            alt="Sandpiper Headquarters"
            className="rounded-2xl shadow-xl w-full h-[450px] object-cover border-4 border-white"
          />
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-stone-900">Our Core Pillars</h3>
          <p className="text-xs text-stone-500 mt-1">Guided by unwavering commitments to our clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <Shield className="w-8 h-8 text-[#C5A880]" />
            <h4 className="font-serif font-bold text-lg text-stone-900">Zero-Compromise Discretion</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every acquisition, negotiation, and inspection is conducted under rigorous non-disclosure agreements, protecting the identities and security of high-profile families.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <Compass className="w-8 h-8 text-[#C5A880]" />
            <h4 className="font-serif font-bold text-lg text-stone-900">Architectural Curation</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We exclusively represent properties that demonstrate aesthetic integrity, superior construction craftsmanship, and enduring neighborhood capital appreciation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-[#C5A880]" />
            <h4 className="font-serif font-bold text-lg text-stone-900">Rigorous Market Due Diligence</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We provide proprietary valuation models, zoning verifications, and historical sales data to ensure our clients transact with comprehensive empirical clarity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B192C] text-[#C5A880] hover:text-white rounded text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
        >
          <span>Explore Our Properties</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
