import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, Bed, Bath, Maximize2, MapPin, Eye, Car } from 'lucide-react';
import { Property } from '../../types';
import { useProperties } from '../../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
  onOpenScheduleVisit?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpenScheduleVisit }) => {
  const { toggleSave, isSaved, toggleCompare, compareList } = useProperties();
  const saved = isSaved(property.id);
  const compared = compareList.some((p) => p.id === property.id);

  const formatPrice = (price: number, listingType: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: property.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);

    if (listingType === 'rent') {
      return `${formatted} / mo`;
    }
    return formatted;
  };

  const getListingBadgeText = (type: string) => {
    switch (type) {
      case 'sale':
        return 'For Sale';
      case 'rent':
        return 'For Lease';
      case 'commercial':
        return 'Commercial';
      case 'new-development':
        return 'New Launch';
      default:
        return 'Listing';
    }
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#0B192C]/90 text-stone-100 rounded backdrop-blur-sm">
            {getListingBadgeText(property.listingType)}
          </span>
          {property.featured && (
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-[#C5A880] text-[#0B192C] rounded backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(property);
            }}
            title={compared ? 'Remove from compare' : 'Compare property'}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              compared
                ? 'bg-[#0B192C] text-[#C5A880] ring-2 ring-[#C5A880]'
                : 'bg-black/40 text-white hover:bg-black/70'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(property);
            }}
            title={saved ? 'Remove from favorites' : 'Save to favorites'}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              saved
                ? 'bg-rose-50 text-rose-500 ring-2 ring-rose-400'
                : 'bg-black/40 text-white hover:bg-black/70'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Price tag over media */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-xl sm:text-2xl font-bold font-serif text-white drop-shadow-md">
            {formatPrice(property.price, property.listingType)}
          </div>
        </div>

        {/* Reference tag */}
        <div className="absolute bottom-3 right-3 text-[10px] text-stone-300 font-mono tracking-wider">
          {property.referenceNumber}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs uppercase font-medium tracking-wider text-[#C5A880] mb-1">
            {property.propertyType} &middot; {property.constructionStatus.replace('-', ' ')}
          </div>
          <Link
            to={`/properties/${property.slug}`}
            className="block text-lg font-serif font-bold text-stone-900 group-hover:text-[#0B192C] hover:underline line-clamp-1 mb-2"
          >
            {property.title}
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-4 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>
              {property.location.locality}, {property.location.city}
              {property.location.state ? `, ${property.location.state}` : ''}
            </span>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-stone-700">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  <strong className="text-stone-900 font-semibold">{property.bedrooms}</strong> Beds
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  <strong className="text-stone-900 font-semibold">{property.parkingSpaces}</strong> Parking
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span>
                <strong className="text-stone-900 font-semibold">{property.bathrooms}</strong> Baths
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span>
                <strong className="text-stone-900 font-semibold">{property.area.toLocaleString()}</strong>{' '}
                {property.areaUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-2">
          <Link
            to={`/properties/${property.slug}`}
            className="flex-1 text-center py-2 px-3 text-xs font-semibold tracking-wider uppercase text-[#0B192C] bg-stone-100 hover:bg-[#0B192C] hover:text-white rounded transition-colors"
          >
            View Details
          </Link>
          {onOpenScheduleVisit && (
            <button
              onClick={() => onOpenScheduleVisit(property)}
              className="py-2 px-3 text-xs font-semibold tracking-wider uppercase text-[#0B192C] bg-[#C5A880]/20 hover:bg-[#C5A880] rounded transition-colors"
            >
              Tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
