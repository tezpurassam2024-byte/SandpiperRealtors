import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Calendar,
  Share2,
  Heart,
  Scale,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  FileText,
  Calculator,
  Car,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { INITIAL_DEMO_AGENTS } from '../data/initialDemoData';
import { Property } from '../types';

interface PropertyDetailPageProps {
  onOpenScheduleVisit: (property: Property) => void;
  onOpenEnquiry: (property?: Property) => void;
  onOpenCalculator: (price?: number) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  onOpenScheduleVisit,
  onOpenEnquiry,
  onOpenCalculator,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { properties, loading, toggleSave, isSaved, toggleCompare, compareList } = useProperties();
  const { currentUser } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const property = properties.find((p) => p.slug === slug);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="h-10 bg-stone-200 rounded w-1/2" />
        <div className="h-[500px] bg-stone-200 rounded-xl" />
        <div className="h-40 bg-stone-200 rounded" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-stone-900">
          Property Listing Not Found
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto">
          The requested listing could not be retrieved. It may have been archived, acquired off-market, or the URL might be invalid.
        </p>
        <div className="pt-4">
          <Link
            to="/properties"
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
          >
            Explore Active Properties
          </Link>
        </div>
      </div>
    );
  }

  const saved = isSaved(property.id);
  const compared = compareList.some((p) => p.id === property.id);
  const agent = INITIAL_DEMO_AGENTS.find((a) => a.id === property.agentId) || INITIAL_DEMO_AGENTS[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.listingType === property.listingType))
    .slice(0, 3);

  // Mortgage Quick Calculation Preview
  const loanPrincipal = property.price * 0.8;
  const estMonthlyRate = 0.065 / 12;
  const estMonthlyPayment =
    (loanPrincipal * (estMonthlyRate * Math.pow(1 + estMonthlyRate, 360))) /
    (Math.pow(1 + estMonthlyRate, 360) - 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-stone-900">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-stone-900">Properties</Link>
        <span>/</span>
        <span className="text-[#C5A880] font-medium truncate max-w-[250px]">{property.title}</span>
      </nav>

      {/* Property Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#0B192C] text-stone-100 rounded">
              {property.listingType === 'sale' ? 'For Sale' : property.listingType === 'rent' ? 'For Lease' : property.listingType}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#C5A880] text-[#0B192C] rounded">
              {property.propertyType}
            </span>
            <span className="text-xs text-stone-500 font-mono tracking-wider">
              REF: {property.referenceNumber}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-stone-600">
            <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>
              {property.location.address}, {property.location.locality}, {property.location.city}, {property.location.country}
            </span>
          </div>
        </div>

        {/* Pricing & Primary Action Buttons */}
        <div className="flex flex-col sm:items-end gap-3">
          <div className="text-3xl sm:text-4xl font-serif font-bold text-[#0B192C]">
            ${property.price.toLocaleString()}{' '}
            {property.listingType === 'rent' && <span className="text-sm font-sans font-normal text-stone-500">/ month</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 transition-colors relative"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -top-8 right-0 bg-[#0B192C] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={() => toggleCompare(property)}
              className={`p-2.5 rounded-lg border transition-colors ${
                compared
                  ? 'bg-[#0B192C] text-[#C5A880] border-[#0B192C]'
                  : 'border-stone-300 hover:bg-stone-50 text-stone-700'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleSave(property)}
              className={`p-2.5 rounded-lg border transition-colors ${
                saved
                  ? 'bg-rose-50 text-rose-600 border-rose-300'
                  : 'border-stone-300 hover:bg-stone-50 text-stone-700'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery with Lightbox Trigger */}
      <section className="space-y-3">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 group cursor-pointer"
             onClick={() => setLightboxOpen(true)}>
          <img
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-medium">
            Click to view gallery ({activeImageIndex + 1} / {property.images.length})
          </div>
        </div>

        {/* Thumbnails list */}
        {property.images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {property.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#0B192C] ring-2 ring-[#C5A880]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main Content: Left Details & Right Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Specs, Narrative, Amenities */}
        <div className="lg:col-span-8 space-y-10">
          {/* Key Specifications Grid */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 pb-2 border-b border-stone-100">
              Architectural Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-600">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Bedrooms</span>
                  <strong className="text-base text-stone-900 font-serif">{property.bedrooms}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-600">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Bathrooms</span>
                  <strong className="text-base text-stone-900 font-serif">{property.bathrooms}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-600">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Built-Up Area</span>
                  <strong className="text-base text-stone-900 font-serif">
                    {property.area.toLocaleString()} {property.areaUnit}
                  </strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-stone-100 flex items-center justify-center text-stone-600">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Parking</span>
                  <strong className="text-base text-stone-900 font-serif">{property.parkingSpaces} Vehicles</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-stone-600 pt-6 mt-6 border-t border-stone-100">
              <div>
                <span className="text-stone-400 block mb-0.5">Furnishing:</span>
                <span className="font-semibold text-stone-900 capitalize">{property.furnishingStatus}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Status:</span>
                <span className="font-semibold text-stone-900 capitalize">
                  {property.constructionStatus.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Year Built:</span>
                <span className="font-semibold text-stone-900">{property.yearBuilt || '2024'}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Carpet Area:</span>
                <span className="font-semibold text-stone-900">
                  {property.carpetArea ? `${property.carpetArea.toLocaleString()} sq.ft` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Description Narrative */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Property Narrative & Architecture
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-light whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Verified Amenities */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Curated Amenities & Estate Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-stone-700">
                  <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Neighborhood */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Location & Neighborhood
            </h3>
            <p className="text-sm text-stone-600">
              Situated in the prestigious enclave of {property.location.locality}, {property.location.city}. Private viewings include full neighborhood security access.
            </p>
            <div className="p-4 bg-stone-50 rounded border border-stone-200 text-xs font-mono text-stone-700 flex items-center justify-between">
              <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
              <span className="text-[#C5A880] font-semibold">Verified Address</span>
            </div>
          </div>

          {/* Floor Plans Download if available */}
          {property.floorPlans && property.floorPlans.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900">Architectural Floor Plans</h4>
                <p className="text-xs text-stone-500">Scaled schematic blueprints available for inspection.</p>
              </div>
              <button
                onClick={() => setLightboxOpen(true)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-stone-100 hover:bg-stone-200 text-stone-900 rounded"
              >
                Inspect Plans
              </button>
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar: Inspection CTA, Agent Profile, Loan Tool */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          {/* Schedule Viewing CTA Card */}
          <div className="bg-[#0B192C] text-stone-100 p-6 rounded-xl shadow-xl border border-[#1E3E62] space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-1">
                Private Viewing
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                Book a Confidential Tour
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Experience this residence firsthand with a senior Sandpiper partner.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onOpenScheduleVisit(property)}
                className="w-full py-3 px-4 bg-[#C5A880] hover:bg-white text-[#0B192C] rounded text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Visit</span>
              </button>

              <button
                onClick={() => onOpenEnquiry(property)}
                className="w-full py-3 px-4 bg-[#1E3E62]/80 hover:bg-[#1E3E62] text-stone-100 rounded text-xs font-bold uppercase tracking-widest transition-all border border-stone-400/30 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Request Acquisition Dossier</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-1.5 justify-center">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Full Non-Disclosure Protected</span>
            </div>
          </div>

          {/* Assigned Agent Profile Card */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={agent.photoUrl}
                alt={agent.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#C5A880]"
              />
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900">{agent.name}</h4>
                <div className="text-xs text-[#C5A880] font-medium">{agent.role}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">{agent.specialization}</div>
              </div>
            </div>

            <p className="text-xs text-stone-600 line-clamp-3 italic">
              &ldquo;{agent.bio}&rdquo;
            </p>

            <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded hover:bg-stone-50 text-stone-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>{agent.phone}</span>
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-2.5 py-1.5 px-3 rounded hover:bg-stone-50 text-stone-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span className="truncate">{agent.email}</span>
              </a>
              <a
                href={`https://wa.me/15552348901?text=Inquiry%20regarding%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 py-2 px-3 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Private Advisory</span>
              </a>
            </div>
          </div>

          {/* Quick Mortgage Card for this property */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#C5A880]" />
                <h4 className="font-serif font-bold text-sm text-stone-900">Estimated Financing</h4>
              </div>
              <button
                onClick={() => onOpenCalculator(property.price)}
                className="text-xs text-[#C5A880] font-semibold hover:underline"
              >
                Adjust Terms
              </button>
            </div>
            <div className="text-2xl font-serif font-bold text-[#0B192C]">
              ${Math.round(estMonthlyPayment).toLocaleString()}{' '}
              <span className="text-xs font-normal text-stone-500">/ mo</span>
            </div>
            <p className="text-[11px] text-stone-500">
              Based on 20% down payment, 30-year fixed rate at 6.5%.
            </p>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block">
                Related Architecture
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                Similar Premier Properties
              </h3>
            </div>
            <Link
              to="/properties"
              className="text-xs font-bold uppercase tracking-widest text-[#0B192C] hover:text-[#C5A880]"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onOpenScheduleVisit={onOpenScheduleVisit}
              />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-4 border-b border-stone-800">
            <span className="font-serif font-bold text-lg">{property.title}</span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center p-4">
            <img
              src={property.images[activeImageIndex]}
              alt={property.title}
              className="max-h-[80vh] max-w-full object-contain rounded-md shadow-2xl"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
                  }
                  className="absolute left-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="text-center text-xs text-stone-400 pt-3 border-t border-stone-800">
            Image {activeImageIndex + 1} of {property.images.length}
          </div>
        </div>
      )}
    </div>
  );
};
