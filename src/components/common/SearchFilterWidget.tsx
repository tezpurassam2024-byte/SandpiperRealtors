import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, DollarSign, SlidersHorizontal, BedDouble } from 'lucide-react';
import { ListingType, PropertyType } from '../../types';

interface SearchFilterWidgetProps {
  initialListingType?: ListingType;
  initialQuery?: string;
  initialCategory?: string;
  onFilterChange?: (filters: any) => void;
  compact?: boolean;
}

export const SearchFilterWidget: React.FC<SearchFilterWidgetProps> = ({
  initialListingType = 'sale',
  compact = false,
}) => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<ListingType>(initialListingType);
  const [locationQuery, setLocationQuery] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<string>('');
  const [minBedrooms, setMinBedrooms] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.set('listingType', listingType);
    if (locationQuery.trim()) params.set('location', locationQuery.trim());
    if (propertyType && propertyType !== 'all') params.set('type', propertyType);
    if (priceMax) params.set('maxPrice', priceMax);
    if (minBedrooms && minBedrooms !== 'all') params.set('bedrooms', minBedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-stone-200/90 overflow-hidden">
      {/* Listing Type Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50/70 overflow-x-auto">
        <button
          type="button"
          onClick={() => setListingType('sale')}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
            listingType === 'sale'
              ? 'border-[#0B192C] text-[#0B192C] bg-white'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          Buy Properties
        </button>
        <button
          type="button"
          onClick={() => setListingType('rent')}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
            listingType === 'rent'
              ? 'border-[#0B192C] text-[#0B192C] bg-white'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          Rent Properties
        </button>
        <button
          type="button"
          onClick={() => setListingType('commercial')}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
            listingType === 'commercial'
              ? 'border-[#0B192C] text-[#0B192C] bg-white'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          Commercial
        </button>
        <button
          type="button"
          onClick={() => setListingType('new-development')}
          className={`px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${
            listingType === 'new-development'
              ? 'border-[#0B192C] text-[#0B192C] bg-white'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          New Developments
        </button>
      </div>

      {/* Main Search Controls */}
      <form onSubmit={handleSearch} className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
        {/* Location input */}
        <div className="lg:col-span-4 relative">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Location or City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="e.g. Newport Beach, Manhattan, Miami"
              className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0B192C] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="lg:col-span-3">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Property Category
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-[#C5A880] absolute left-3 top-3 pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0B192C] focus:bg-white transition-colors appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="villa">Villas & Luxury Homes</option>
              <option value="penthouse">Penthouses</option>
              <option value="apartment">Apartments & Flats</option>
              <option value="house">Independent Houses</option>
              <option value="commercial">Commercial Space</option>
              <option value="office">Executive Offices</option>
              <option value="plot">Land & Plots</option>
            </select>
          </div>
        </div>

        {/* Max Budget */}
        <div className="lg:col-span-3">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Max Budget
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-[#C5A880] absolute left-3 top-3 pointer-events-none" />
            <select
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0B192C] focus:bg-white transition-colors appearance-none"
            >
              <option value="">Any Budget</option>
              {listingType === 'rent' ? (
                <>
                  <option value="5000">Up to $5,000 / mo</option>
                  <option value="10000">Up to $10,000 / mo</option>
                  <option value="20000">Up to $20,000 / mo</option>
                  <option value="50000">Up to $50,000 / mo</option>
                </>
              ) : (
                <>
                  <option value="2000000">Up to $2,000,000</option>
                  <option value="5000000">Up to $5,000,000</option>
                  <option value="10000000">Up to $10,000,000</option>
                  <option value="20000000">Up to $20,000,000+</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="lg:col-span-2 flex items-end">
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#0B192C] hover:bg-[#1E3E62] text-[#C5A880] hover:text-white rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all h-[38px] mt-auto"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
