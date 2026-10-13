import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Compass,
  Heart,
  Scale,
  Calculator,
  User,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Building2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../context/PropertyContext';

interface NavbarProps {
  onOpenCalculator?: () => void;
  onOpenCompare?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, onOpenCompare }) => {
  const { currentUser, isAdmin, logout } = useAuth();
  const { savedProperties, compareList } = useProperties();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#0B192C]/95 backdrop-blur-md text-stone-100 border-b border-[#1E3E62]/40 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#C5A880] to-[#997E59] flex items-center justify-center text-[#0B192C] shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="font-brand tracking-widest text-lg sm:text-xl font-bold uppercase text-stone-100 group-hover:text-[#C5A880] transition-colors">
                Sandpiper
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-medium">
                Realtors &middot; Luxury Estates
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
            <Link
              to="/properties"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/properties') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              All Properties
            </Link>
            <Link
              to="/buy"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/buy') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              Buy
            </Link>
            <Link
              to="/rent"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/rent') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              Rent
            </Link>
            <Link
              to="/commercial"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/commercial') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              Commercial
            </Link>
            <Link
              to="/new-projects"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/new-projects') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              New Developments
            </Link>
            <Link
              to="/agents"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/agents') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              Advisors
            </Link>
            <Link
              to="/about"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/about') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors hover:text-[#C5A880] ${
                isActive('/contact') ? 'text-[#C5A880] font-semibold' : 'text-stone-300'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Quick Tools & Account */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              title="Compare Properties"
              className="relative p-2 text-stone-300 hover:text-[#C5A880] transition-colors rounded hover:bg-[#1E3E62]/30"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-[#0B192C] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Mortgage Calculator */}
            <button
              onClick={onOpenCalculator}
              title="Mortgage Calculator"
              className="p-2 text-stone-300 hover:text-[#C5A880] transition-colors rounded hover:bg-[#1E3E62]/30"
            >
              <Calculator className="w-5 h-5" />
            </button>

            {/* Saved properties */}
            <Link
              to="/dashboard?tab=saved"
              title="Saved Properties"
              className="relative p-2 text-stone-300 hover:text-[#C5A880] transition-colors rounded hover:bg-[#1E3E62]/30"
            >
              <Heart className="w-5 h-5" />
              {savedProperties.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-stone-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedProperties.length}
                </span>
              )}
            </Link>

            {/* Admin shortcut badge if admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0B192C] bg-[#C5A880] rounded hover:bg-[#d8bd94] transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Suite</span>
              </Link>
            )}

            {/* Auth Dropdown / Login */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1E3E62]/40 hover:bg-[#1E3E62]/70 text-stone-200 text-sm transition-colors border border-[#1E3E62]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C5A880] text-[#0B192C] flex items-center justify-center font-bold text-xs uppercase">
                    {currentUser.email ? currentUser.email.charAt(0) : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate text-xs font-medium">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md bg-[#0B192C] border border-[#1E3E62] shadow-xl py-2 z-50 text-stone-200 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#1E3E62]/50 text-xs text-stone-400">
                      Signed in as
                      <div className="font-semibold text-stone-200 truncate">{currentUser.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#1E3E62]/40 hover:text-[#C5A880] transition-colors"
                    >
                      <User className="w-4 h-4" /> Client Dashboard
                    </Link>
                    <Link
                      to="/dashboard?tab=saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#1E3E62]/40 hover:text-[#C5A880] transition-colors"
                    >
                      <Heart className="w-4 h-4" /> Saved Properties ({savedProperties.length})
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-[#C5A880] hover:bg-[#1E3E62]/40 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" /> Administration Portal
                      </Link>
                    )}
                    <button
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-[#1E3E62]/40 transition-colors text-left border-t border-[#1E3E62]/40 mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#C5A880] hover:bg-[#d8bd94] rounded transition-all shadow-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Client Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B192C] border-b border-[#1E3E62] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/properties"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            All Properties
          </Link>
          <Link
            to="/buy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            Buy Properties
          </Link>
          <Link
            to="/rent"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            Rent Properties
          </Link>
          <Link
            to="/commercial"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            Commercial Spaces
          </Link>
          <Link
            to="/new-projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            New Developments
          </Link>
          <Link
            to="/agents"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            Real Estate Advisors
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            About Sandpiper
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-300 hover:text-[#C5A880]"
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-[#1E3E62] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator?.();
              }}
              className="flex items-center gap-1.5 text-xs text-[#C5A880]"
            >
              <Calculator className="w-4 h-4" /> Mortgage Tool
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCompare?.();
              }}
              className="flex items-center gap-1.5 text-xs text-[#C5A880]"
            >
              <Scale className="w-4 h-4" /> Compare ({compareList.length})
            </button>
            {currentUser ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-stone-300 underline"
              >
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold bg-[#C5A880] text-[#0B192C] rounded"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
