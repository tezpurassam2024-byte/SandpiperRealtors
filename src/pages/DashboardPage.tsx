import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  MessageSquare,
  Calendar,
  User,
  LogOut,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { enquiryService } from '../services/enquiryService';
import { Enquiry, Appointment } from '../types';

export const DashboardPage: React.FC = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { savedProperties, properties, toggleSave } = useProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = searchParams.get('tab') || 'overview';

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingData(true);
        const [enqData, apptData] = await Promise.all([
          enquiryService.getEnquiries(currentUser.uid),
          enquiryService.getAppointments(currentUser.uid),
        ]);
        setEnquiries(enqData);
        setAppointments(apptData);
      } catch (err) {
        console.warn('Dashboard data fetch error:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleCancelAppointment = async (apptId: string) => {
    try {
      await enquiryService.updateAppointment(apptId, { status: 'cancelled' });
      setAppointments((prev) =>
        prev.map((a) => (a.id === apptId ? { ...a, status: 'cancelled' } : a))
      );
    } catch (err) {
      console.error('Failed to cancel appointment', err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
      case 'new':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'contacted':
      case 'qualified':
      case 'site visit scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
      case 'closed':
      case 'not interested':
        return 'bg-stone-100 text-stone-600 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Dashboard Top Header */}
      <div className="bg-[#0B192C] text-stone-100 p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1E3E62] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C5A880] to-[#997E59] text-[#0B192C] flex items-center justify-center font-bold text-2xl uppercase shadow-md">
            {currentUser?.email ? currentUser.email.charAt(0) : 'U'}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Sandpiper Private Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {currentUser?.displayName || currentUser?.email?.split('@')[0]}
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">{currentUser?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C5A880] text-[#0B192C] rounded hover:bg-white transition-colors flex items-center gap-1.5 shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          )}
          <button
            onClick={() => logout()}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-white bg-[#1E3E62]/40 hover:bg-[#1E3E62] border border-[#1E3E62] rounded transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2">
        {[
          { id: 'overview', label: 'Client Overview', icon: User },
          { id: 'saved', label: `Saved Properties (${savedProperties.length})`, icon: Heart },
          { id: 'enquiries', label: `My Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'visits', label: `My Site Visits (${appointments.length})`, icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSearchParams({ tab: tab.id })}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#0B192C] text-[#0B192C] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div
              onClick={() => setSearchParams({ tab: 'saved' })}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Bookmarked Listings
                </span>
                <Heart className="w-5 h-5 text-rose-500" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900 mt-2">
                {savedProperties.length}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Curated in your private catalog</span>
            </div>

            <div
              onClick={() => setSearchParams({ tab: 'enquiries' })}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Submitted Enquiries
                </span>
                <MessageSquare className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900 mt-2">
                {enquiries.length}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Dossiers & pricing requests</span>
            </div>

            <div
              onClick={() => setSearchParams({ tab: 'visits' })}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Site Visit Bookings
                </span>
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-serif font-bold text-stone-900 mt-2">
                {appointments.length}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Private property inspections</span>
            </div>
          </div>

          {/* Recent Activity summary */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Welcome to Your Private Advisory Hub
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
              As a registered client of Sandpiper Realtors, your private dashboard acts as a personal dossier for architectural discoveries. You can track status on requested property visits, review advisor communications, and retain private bookmarks across all mobile and desktop devices.
            </p>
            <div className="pt-2">
              <Link
                to="/properties"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
              >
                <span>Browse All Estates</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Properties */}
      {activeTab === 'saved' && (
        <div>
          {savedProperties.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-stone-200 shadow-sm">
              <Heart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-stone-800">
                No Bookmarked Properties Yet
              </h3>
              <p className="text-sm text-stone-500 max-w-md mx-auto mt-1 mb-6">
                Explore our curated listings and click the heart icon on any residence to save it to your private portfolio.
              </p>
              <Link
                to="/properties"
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded"
              >
                Discover Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((saved) => {
                // Find full property object if available
                const fullProp = properties.find((p) => p.id === saved.propertyId);
                return (
                  <div
                    key={saved.id}
                    className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10]">
                        <img
                          src={saved.propertyImage}
                          alt={saved.propertyTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#0B192C]/90 text-white text-xs font-bold rounded">
                          ${saved.propertyPrice.toLocaleString()}{' '}
                          {saved.listingType === 'rent' ? '/ mo' : ''}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-serif font-bold text-stone-900 text-base line-clamp-1">
                          {saved.propertyTitle}
                        </h4>
                        <div className="text-xs text-stone-500">{saved.propertyLocation}</div>
                        <div className="text-xs text-stone-600 pt-2 flex items-center justify-between border-t border-stone-100">
                          <span>{saved.bedrooms} Beds &middot; {saved.bathrooms} Baths</span>
                          <span>{saved.area.toLocaleString()} sq.ft</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center gap-2">
                      {fullProp ? (
                        <Link
                          to={`/properties/${fullProp.slug}`}
                          className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
                        >
                          View Details
                        </Link>
                      ) : (
                        <Link
                          to="/properties"
                          className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded"
                        >
                          View Listing
                        </Link>
                      )}
                      {fullProp && (
                        <button
                          onClick={() => toggleSave(fullProp)}
                          className="py-2 px-3 text-xs text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition-colors"
                          title="Remove from saved"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                My Enquiries & Advisory Requests
              </h3>
              <p className="text-xs text-stone-500">Live status tracking directly from Firestore</p>
            </div>
          </div>

          {enquiries.length === 0 ? (
            <div className="p-12 text-center text-stone-500 text-sm">
              You have not submitted any property enquiries or callback requests yet.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-stone-500 font-bold">
                        {enq.referenceNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${getStatusBadge(enq.status)}`}>
                        {enq.status}
                      </span>
                    </div>
                    <span className="text-xs text-stone-400">
                      Submitted: {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {enq.propertyTitleSnapshot && (
                    <div className="text-sm font-serif font-bold text-[#0B192C]">
                      Property: {enq.propertyTitleSnapshot}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-700 bg-stone-50 p-3 rounded border border-stone-100 italic">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: My Site Visits */}
      {activeTab === 'visits' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                My Scheduled Property Inspections
              </h3>
              <p className="text-xs text-stone-500">Chauffeured and private on-site viewings</p>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="p-12 text-center text-stone-500 text-sm">
              You have no active or historical property inspection appointments.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {appointments.map((appt) => (
                <div key={appt.id} className="p-6 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {appt.propertyTitleSnapshot}
                      </h4>
                      <div className="text-xs text-stone-500 flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Date: <strong>{appt.requestedDate}</strong></span>
                        <Clock className="w-3.5 h-3.5 text-[#C5A880] ml-2" />
                        <span>Window: <strong>{appt.requestedTime}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${getStatusBadge(appt.status)}`}>
                        {appt.status}
                      </span>
                      {appt.status === 'pending' && (
                        <button
                          onClick={() => handleCancelAppointment(appt.id)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Cancel Visit
                        </button>
                      )}
                    </div>
                  </div>

                  {appt.notes && (
                    <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-100">
                      <strong>Client Note:</strong> {appt.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
