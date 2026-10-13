import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Shield,
  Award,
  CheckCircle2,
  Users,
  Building,
  Sparkles,
  PhoneCall,
  Calendar,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { SearchFilterWidget } from '../components/common/SearchFilterWidget';
import { POPULAR_LOCATIONS, INITIAL_DEMO_TESTIMONIALS } from '../data/initialDemoData';
import { enquiryService } from '../services/enquiryService';
import { Property } from '../types';

interface HomePageProps {
  onOpenScheduleVisit: (property: Property) => void;
  onOpenEnquiry: (property?: Property) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenScheduleVisit,
  onOpenEnquiry,
}) => {
  const { properties, loading } = useProperties();
  const navigate = useNavigate();

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadBudget, setLeadBudget] = useState('$2M - $5M');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);
  const newDevelopments = properties.filter((p) => p.listingType === 'new-development' || p.constructionStatus === 'new-launch');

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    try {
      setLeadSubmitting(true);
      await enquiryService.submitEnquiry({
        customerName: leadName,
        customerEmail: leadEmail,
        customerPhone: leadPhone,
        enquiryType: 'callback',
        message: `Callback requested. Targeted Acquisition Budget: ${leadBudget}.`,
        source: 'Homepage Lead Generation Section',
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error('Lead submission failed', err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Sandpiper Luxury Architecture"
            className="w-full h-full object-cover scale-105 transform animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-[#0B192C]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/60 border border-[#C5A880]/40 backdrop-blur-md text-[#C5A880] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Real Estate Brokerage &middot; Established 2012</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-md">
            Find Your Perfect Property with <span className="text-[#C5A880]">Sandpiper Realtors.</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Guiding discerning buyers, investors, and developers to landmark residences and prime commercial assets across world-renowned markets.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/properties"
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0B192C] bg-[#C5A880] hover:bg-white rounded transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explore Properties
            </Link>
            <button
              onClick={() => onOpenEnquiry()}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-stone-100 bg-[#1E3E62]/80 hover:bg-[#1E3E62] border border-stone-400/40 rounded transition-all backdrop-blur-sm"
            >
              Talk to an Advisor
            </button>
          </div>
        </div>

        {/* Floating Advanced Search Widget */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-16 px-2">
          <SearchFilterWidget />
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Featured Properties
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-lg">
              Handpicked trophy residences, skyline penthouses, and private estates currently available for acquisition.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0B192C] hover:text-[#C5A880] transition-colors group"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-stone-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onOpenScheduleVisit={onOpenScheduleVisit}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. PROPERTY CATEGORIES */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
              Discovery By Style
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Explore Property Categories
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              From waterfront villas to high-yield commercial hubs, discover estates tailored to your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Villas & Luxury Homes', type: 'villa', count: '12 Listings', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80' },
              { title: 'Skyline Penthouses', type: 'penthouse', count: '8 Listings', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
              { title: 'Apartments & Flats', type: 'apartment', count: '24 Listings', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
              { title: 'Independent Houses', type: 'house', count: '16 Listings', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80' },
              { title: 'Commercial & Office', type: 'commercial', count: '9 Listings', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
              { title: 'New Developments', type: 'new-development', count: '5 Projects', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
              { title: 'Plots & Land', type: 'plot', count: '7 Parcels', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80' },
              { title: 'Retail & Mixed Use', type: 'retail', count: '6 Spaces', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80' },
            ].map((cat) => (
              <Link
                key={cat.title}
                to={`/properties?type=${cat.type}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/3] shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h4 className="font-serif font-bold text-white text-base group-hover:text-[#C5A880] transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-[11px] text-stone-300 font-medium">{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SANDPIPER REALTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              The Sandpiper Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Uncompromising Standards in High-End Real Estate Advisory
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              At Sandpiper Realtors, we believe that extraordinary properties require thoughtful stewardship. We combine deep architectural appreciation with discreet financial acumen.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-[#0B192C] text-[#C5A880] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Discreet Professional Guidance</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Bespoke confidentiality agreements and tailored representation protecting private buyers and family offices.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-[#0B192C] text-[#C5A880] flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Strictly Curated Listings</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Every property undergoes title verification, architectural inspection, and valuation screening prior to presentation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-sm bg-[#0B192C] text-[#C5A880] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Concierge Site Visits & Documentation</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Chauffeured private viewings, legal due diligence support, and seamless escrow coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                alt="Architectural Consultation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#0B192C] text-stone-100 p-6 rounded-lg shadow-xl max-w-xs border border-[#1E3E62] hidden sm:block">
              <div className="text-3xl font-serif font-bold text-[#C5A880]">$1.4B+</div>
              <p className="text-xs text-stone-300 mt-1">
                Cumulative real estate transactions advised across prestigious coastal and urban territories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE PREMIER LOCATIONS */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
                Prime Neighborhoods
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Explore Premier Locations
              </h2>
              <p className="text-sm text-stone-400 mt-2 max-w-lg">
                Discover iconic addresses across California, New York, Florida, and Connecticut.
              </p>
            </div>
            <Link
              to="/properties"
              className="text-xs font-bold uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Markets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                onClick={() => navigate(`/properties?location=${encodeURIComponent(loc.name)}`)}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-lg"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-[#C5A880] rounded">
                  {loc.tag}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[11px] text-stone-300 font-medium block">{loc.region}</span>
                  <h4 className="text-xl font-serif font-bold text-white group-hover:text-[#C5A880] transition-colors">
                    {loc.name}
                  </h4>
                  <span className="text-xs text-stone-400 mt-1 inline-flex items-center gap-1">
                    {loc.propertyCount} Active Properties <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (THE 5-STEP JOURNEY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
            The Sandpiper Method
          </span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            A Transparent, Seamless Acquisition Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: '01', title: 'Explore & Filter', desc: 'Browse curated architectural residences using refined search filters.' },
            { step: '02', title: 'Shortlist Favourites', desc: 'Save your top choices and compare specifications side-by-side.' },
            { step: '03', title: 'Private Inspection', desc: 'Schedule private, chauffeured site visits directly on your schedule.' },
            { step: '04', title: 'Dedicated Advisor', desc: 'Receive private guidance, valuation comps, and zoning verification.' },
            { step: '05', title: 'Seamless Closing', desc: 'Execute contracts with trusted escrow, legal, and financial oversight.' },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-lg border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="text-3xl font-serif font-bold text-[#C5A880]/60 mb-2">{item.step}</div>
              <h4 className="font-serif font-bold text-stone-900 text-base mb-2">{item.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CLIENT TESTIMONIALS */}
      <section className="bg-stone-50 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
              Client Commendations
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Trusted by Private Collectors & Investors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_DEMO_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm text-stone-700 italic font-serif leading-relaxed mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <div className="font-bold text-stone-900 text-sm">{t.author}</div>
                  <div className="text-xs text-stone-500">{t.role}</div>
                  {t.propertyPurchased && (
                    <div className="text-[11px] text-[#C5A880] mt-1 font-medium">
                      Acquired: {t.propertyPurchased}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LEAD GENERATION SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B192C] text-white rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#1E3E62]/40 to-transparent pointer-events-none" />

          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-2">
              Private Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Looking for Off-Market or Bespoke Listings?
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              Our advisors maintain an exclusive catalog of discreet, unadvertised architectural estates. Share your acquisition parameters for a confidential briefing.
            </p>

            {leadSubmitted ? (
              <div className="p-4 bg-emerald-950/70 border border-emerald-500/50 rounded text-emerald-200 text-sm">
                Thank you. Your consultation request has been received. A senior partner will contact you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="px-3.5 py-2.5 text-xs bg-stone-900/80 border border-stone-700 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="px-3.5 py-2.5 text-xs bg-stone-900/80 border border-stone-700 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="px-3.5 py-2.5 text-xs bg-stone-900/80 border border-stone-700 rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span>Target Budget:</span>
                    <select
                      value={leadBudget}
                      onChange={(e) => setLeadBudget(e.target.value)}
                      className="bg-stone-900 border border-stone-700 text-stone-200 px-2.5 py-1 text-xs rounded"
                    >
                      <option value="$1M - $3M">$1M - $3M</option>
                      <option value="$3M - $7M">$3M - $7M</option>
                      <option value="$7M - $15M">$7M - $15M</option>
                      <option value="$15M+">$15M+ Ultra-Luxury</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#C5A880] text-[#0B192C] hover:bg-white rounded transition-colors shadow-md disabled:opacity-50"
                  >
                    {leadSubmitting ? 'Registering...' : 'Request Confidential Call'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
