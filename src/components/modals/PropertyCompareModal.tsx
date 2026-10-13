import React from 'react';
import { Link } from 'react-router-dom';
import { X, Scale, Trash2, ExternalLink, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

interface PropertyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyCompareModal: React.FC<PropertyCompareModalProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare } = useProperties();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 text-stone-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif text-lg font-bold">
              Property Comparison Matrix ({compareList.length} / 4)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-300 hover:text-rose-100 underline transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Matrix content */}
        <div className="p-6 overflow-y-auto flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-12">
              <Scale className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h4 className="text-base font-serif font-bold text-stone-800">
                No Properties Selected for Comparison
              </h4>
              <p className="text-sm text-stone-500 max-w-md mx-auto mt-1 mb-4">
                Click the balance icon on any property card across the website to compare specifications, pricing, and amenities side-by-side.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {compareList.map((property) => (
                <div
                  key={property.id}
                  className="border border-stone-200 rounded-lg p-4 bg-stone-50/50 flex flex-col justify-between"
                >
                  <div>
                    {/* Image & remove */}
                    <div className="relative aspect-[16/10] rounded overflow-hidden mb-3">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(property.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] uppercase font-mono tracking-wider text-stone-500">
                      {property.referenceNumber}
                    </div>
                    <h5 className="font-serif font-bold text-base text-stone-900 line-clamp-1 mb-1">
                      {property.title}
                    </h5>

                    <div className="text-lg font-bold font-serif text-[#0B192C] mb-3">
                      ${property.price.toLocaleString()}{' '}
                      {property.listingType === 'rent' ? '/ mo' : ''}
                    </div>

                    {/* Comparison rows */}
                    <div className="space-y-2 text-xs text-stone-700 divide-y divide-stone-200">
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Location:</span>
                        <span className="font-medium text-right truncate max-w-[130px]">
                          {property.location.city}
                        </span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Category:</span>
                        <span className="font-medium capitalize">{property.propertyType}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Listing:</span>
                        <span className="font-medium capitalize">{property.listingType}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Bedrooms:</span>
                        <span className="font-medium">{property.bedrooms} Beds</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Bathrooms:</span>
                        <span className="font-medium">{property.bathrooms} Baths</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Interior Area:</span>
                        <span className="font-medium">
                          {property.area.toLocaleString()} {property.areaUnit}
                        </span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Price / Unit:</span>
                        <span className="font-medium">
                          ${Math.round(property.price / (property.area || 1)).toLocaleString()} / sq.ft
                        </span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Status:</span>
                        <span className="font-medium capitalize">
                          {property.constructionStatus.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <span className="text-stone-500">Furnishing:</span>
                        <span className="font-medium capitalize">{property.furnishingStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-200">
                    <Link
                      to={`/properties/${property.slug}`}
                      onClick={onClose}
                      className="w-full py-2 px-3 text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 bg-[#0B192C] text-[#C5A880] hover:text-white rounded transition-colors"
                    >
                      <span>Full Specifications</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
