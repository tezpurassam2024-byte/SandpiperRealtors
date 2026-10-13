import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  ListFilter,
  DollarSign,
  Building,
  RotateCcw,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { Property, ListingType, PropertyType } from '../types';

interface PropertiesPageProps {
  onOpenScheduleVisit: (property: Property) => void;
  presetListingType?: ListingType;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onOpenScheduleVisit,
  presetListingType,
}) => {
  const { properties, loading } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter states initialized from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [selectedListingType, setSelectedListingType] = useState<string>(
    presetListingType || searchParams.get('listingType') || 'all'
  );
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>(
    searchParams.get('type') || 'all'
  );
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('bedrooms') || 'all');
  const [bathrooms, setBathrooms] = useState<string>('all');
  const [furnishing, setFurnishing] = useState<string>('all');
  const [constructionStatus, setConstructionStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    if (presetListingType) {
      setSelectedListingType(presetListingType);
    } else if (searchParams.get('listingType')) {
      setSelectedListingType(searchParams.get('listingType')!);
    }
    if (searchParams.get('location')) {
      setSearchQuery(searchParams.get('location')!);
    }
    if (searchParams.get('type')) {
      setSelectedPropertyType(searchParams.get('type')!);
    }
    if (searchParams.get('maxPrice')) {
      setMaxPrice(searchParams.get('maxPrice')!);
    }
    if (searchParams.get('bedrooms')) {
      setBedrooms(searchParams.get('bedrooms')!);
    }
  }, [searchParams, presetListingType]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedListingType(presetListingType || 'all');
    setSelectedPropertyType('all');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('all');
    setBathrooms('all');
    setFurnishing('all');
    setConstructionStatus('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      // 1. Text Query (city, title, locality, reference number)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCity = item.location.city.toLowerCase().includes(q);
        const matchesLocality = item.location.locality.toLowerCase().includes(q);
        const matchesRef = item.referenceNumber.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCity && !matchesLocality && !matchesRef) return false;
      }

      // 2. Listing Type
      if (selectedListingType !== 'all') {
        if (item.listingType !== selectedListingType) return false;
      }

      // 3. Property Type
      if (selectedPropertyType !== 'all') {
        if (item.propertyType !== selectedPropertyType) return false;
      }

      // 4. Price range
      if (minPrice && item.price < Number(minPrice)) return false;
      if (maxPrice && item.price > Number(maxPrice)) return false;

      // 5. Bedrooms
      if (bedrooms !== 'all') {
        const minBeds = Number(bedrooms);
        if (item.bedrooms < minBeds) return false;
      }

      // 6. Bathrooms
      if (bathrooms !== 'all') {
        const minBaths = Number(bathrooms);
        if (item.bathrooms < minBaths) return false;
      }

      // 7. Furnishing
      if (furnishing !== 'all') {
        if (item.furnishingStatus !== furnishing) return false;
      }

      // 8. Construction Status
      if (constructionStatus !== 'all') {
        if (item.constructionStatus !== constructionStatus) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // default: featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [
    properties,
    searchQuery,
    selectedListingType,
    selectedPropertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    furnishing,
    constructionStatus,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Sandpiper Real Estate Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            {presetListingType === 'sale'
              ? 'Luxury Properties for Sale'
              : presetListingType === 'rent'
              ? 'Trophy Properties for Lease'
              : presetListingType === 'commercial'
              ? 'Premier Commercial Real Estate'
              : presetListingType === 'new-development'
              ? 'New Architectural Developments'
              : 'Discover Premium Properties'}
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Showing <strong className="text-stone-900">{filteredProperties.length}</strong> available listings matching your criteria.
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-white border border-stone-300 rounded shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-stone-300 rounded text-stone-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Recently Listed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Listings */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <span className="font-serif font-bold text-stone-900 text-base">Filter Properties</span>
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#C5A880] hover:text-[#0B192C] flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Location search */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Location / Keyword
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#C5A880] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="City, locality, ref..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#0B192C]"
              />
            </div>
          </div>

          {/* Listing Type */}
          {!presetListingType && (
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Listing Type
              </label>
              <select
                value={selectedListingType}
                onChange={(e) => setSelectedListingType(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded text-stone-900"
              >
                <option value="all">All Listing Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
                <option value="commercial">Commercial</option>
                <option value="new-development">New Developments</option>
              </select>
            </div>
          )}

          {/* Property Category */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Category
            </label>
            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded text-stone-900"
            >
              <option value="all">All Categories</option>
              <option value="villa">Villas</option>
              <option value="penthouse">Penthouses</option>
              <option value="apartment">Apartments & Flats</option>
              <option value="house">Independent Houses</option>
              <option value="commercial">Commercial Spaces</option>
              <option value="office">Executive Offices</option>
              <option value="plot">Land & Plots</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Price Range ($)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs border border-stone-300 rounded"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Bedrooms
            </label>
            <div className="grid grid-cols-4 gap-1">
              {['all', '2', '3', '4+'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBedrooms(opt === '4+' ? '4' : opt)}
                  className={`py-1.5 text-xs rounded border transition-colors ${
                    (bedrooms === opt || (opt === '4+' && bedrooms === '4'))
                      ? 'bg-[#0B192C] text-[#C5A880] border-[#0B192C] font-bold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {opt === 'all' ? 'Any' : opt}
                </button>
              ))}
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Furnishing
            </label>
            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded text-stone-900"
            >
              <option value="all">Any Furnishing</option>
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Construction Status */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Status
            </label>
            <select
              value={constructionStatus}
              onChange={(e) => setConstructionStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded text-stone-900"
            >
              <option value="all">Any Status</option>
              <option value="ready-to-move">Ready to Move</option>
              <option value="under-construction">Under Construction</option>
              <option value="new-launch">New Launch</option>
            </select>
          </div>
        </aside>

        {/* Listings Result Grid */}
        <main className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-stone-200 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
              <Building className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-stone-800">
                No Properties Found
              </h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto mt-1 mb-6">
                We could not find any active listings matching your exact combination of filters. Try adjusting price limits or clearing specific categories.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOpenScheduleVisit={onOpenScheduleVisit}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm md:hidden">
          <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="font-serif font-bold text-lg text-stone-900">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Location / Keyword
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="City, locality..."
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Category
                </label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                >
                  <option value="all">All Categories</option>
                  <option value="villa">Villas</option>
                  <option value="penthouse">Penthouses</option>
                  <option value="apartment">Apartments</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Max Price ($)
                </label>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex gap-3">
              <button
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 text-xs font-semibold uppercase border border-stone-300 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-bold uppercase bg-[#0B192C] text-[#C5A880] rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
