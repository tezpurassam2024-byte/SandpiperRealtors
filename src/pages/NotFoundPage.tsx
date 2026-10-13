import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-[#C5A880] mb-2 shadow-inner">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
        404 &middot; Property or Page Unavailable
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 max-w-lg">
        The Destination You Requested Cannot Be Located
      </h1>
      <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
        The architectural estate or page has moved, been archived following a private acquisition, or the link may have expired.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/properties"
          className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-stone-100 hover:bg-stone-200 text-stone-900 rounded transition-colors flex items-center gap-2"
        >
          <span>Browse Active Listings</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
