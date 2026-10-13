import React from 'react';
import { Phone, Mail, MessageCircle, Shield, Award, Building, ArrowRight } from 'lucide-react';
import { INITIAL_DEMO_AGENTS } from '../data/initialDemoData';
import { Property } from '../types';

interface AgentsPageProps {
  onOpenEnquiry: (property?: Property) => void;
}

export const AgentsPage: React.FC<AgentsPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
          Private Real Estate Advisors
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Meet the Sandpiper Advisory Team
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Our senior partners possess decades of collective experience structuring multi-million-dollar residential and commercial acquisitions with impeccable discretion.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INITIAL_DEMO_AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={agent.photoUrl}
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-wider block">
                    {agent.specialization}
                  </span>
                  <h3 className="font-serif font-bold text-xl">{agent.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {agent.role}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {agent.bio}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                  <span>Listings Advised:</span>
                  <strong className="text-stone-900">{agent.assignedListingsCount} Exclusive Estates</strong>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2 border-t border-stone-100">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center justify-between p-2 rounded bg-stone-50 hover:bg-stone-100 text-xs text-stone-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> {agent.phone}
                </span>
                <span className="text-stone-400 font-mono text-[10px]">DIRECT</span>
              </a>

              <a
                href={`mailto:${agent.email}`}
                className="flex items-center justify-between p-2 rounded bg-stone-50 hover:bg-stone-100 text-xs text-stone-800 transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> {agent.email}
                </span>
              </a>

              <button
                onClick={() => onOpenEnquiry()}
                className="w-full mt-2 py-2.5 px-3 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded transition-colors text-center"
              >
                Request Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory Principles banner */}
      <div className="bg-[#0B192C] text-stone-100 p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#1E3E62]">
        <div className="max-w-xl space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Fiduciary Integrity
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">
            Looking for Bespoke Portfolio Representation?
          </h3>
          <p className="text-sm text-stone-300">
            We act as exclusive buyer and seller representatives for private estates, architectural treasures, and high-yield commercial property portfolios.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry()}
          className="px-6 py-3 bg-[#C5A880] text-[#0B192C] font-bold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors shrink-0"
        >
          Schedule Private Meeting
        </button>
      </div>
    </div>
  );
};
