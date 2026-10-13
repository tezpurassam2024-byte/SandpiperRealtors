import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  Users,
  MessageSquare,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  Search,
  Database,
  Sparkles,
  Star,
  Eye,
  FileSpreadsheet,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { propertyService } from '../services/propertyService';
import { enquiryService } from '../services/enquiryService';
import { Property, Enquiry, Appointment, EnquiryStatus, PropertyType, ListingType } from '../types';
import { INITIAL_DEMO_AGENTS } from '../data/initialDemoData';

export const AdminPage: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const { properties, refreshProperties, seedDemoListings } = useProperties();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'enquiries' | 'visits' | 'agents' | 'settings'>('overview');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [enquirySearch, setEnquirySearch] = useState('');
  const [seedingSuccess, setSeedingSuccess] = useState(false);

  // Property modal state (Create / Edit)
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [propTitle, setPropTitle] = useState('');
  const [propSlug, setPropSlug] = useState('');
  const [propPrice, setPropPrice] = useState<number>(3500000);
  const [propType, setPropType] = useState<PropertyType>('villa');
  const [propListingType, setPropListingType] = useState<ListingType>('sale');
  const [propCity, setPropCity] = useState('Newport Beach');
  const [propLocality, setPropLocality] = useState('Pelican Hill');
  const [propAddress, setPropAddress] = useState('100 Pelican Crest Drive');
  const [propBedrooms, setPropBedrooms] = useState<number>(4);
  const [propBathrooms, setPropBathrooms] = useState<number>(5);
  const [propArea, setPropArea] = useState<number>(5500);
  const [propDescription, setPropDescription] = useState('');
  const [propImageUrl, setPropImageUrl] = useState('');
  const [propAmenities, setPropAmenities] = useState('Infinity Pool, Panoramic Ocean View, Wine Cellar');
  const [propFeatured, setPropFeatured] = useState(true);
  const [propStatus, setPropStatus] = useState<'published' | 'draft'>('published');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Internal note editing modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [internalNoteText, setInternalNoteText] = useState('');

  useEffect(() => {
    // If not signed in or not admin, we notify or route, but let's allow review if currentUser is admin or let user log in
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadAdminData = async () => {
      try {
        setLoading(true);
        const [enqList, apptList] = await Promise.all([
          enquiryService.getEnquiries(),
          enquiryService.getAppointments(),
        ]);
        setEnquiries(enqList);
        setAppointments(apptList);
      } catch (err) {
        console.warn('Failed to load admin leads:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [currentUser, navigate]);

  // Lead metrics
  const totalPublished = properties.filter((p) => p.publicationStatus === 'published').length;
  const totalDrafts = properties.filter((p) => p.publicationStatus !== 'published').length;
  const newLeadsCount = enquiries.filter((e) => e.status === 'New').length;
  const pendingVisitsCount = appointments.filter((a) => a.status === 'pending').length;

  const handleOpenCreateProperty = () => {
    setEditingPropertyId(null);
    setPropTitle('');
    setPropSlug('');
    setPropPrice(4500000);
    setPropType('villa');
    setPropListingType('sale');
    setPropCity('Newport Beach');
    setPropLocality('Pelican Crest');
    setPropAddress('88 Crystal Cove Blvd');
    setPropBedrooms(5);
    setPropBathrooms(6);
    setPropArea(6200);
    setPropDescription('An architectural sanctuary with refined stone masonry, floor-to-ceiling panoramic glass, and custom Italian finishes.');
    setPropImageUrl('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80');
    setPropAmenities('Infinity Pool, Ocean Panoramas, Spa Suite, Wine Cellar, Private Elevator');
    setPropFeatured(true);
    setPropStatus('published');
    setPropertyModalOpen(true);
  };

  const handleOpenEditProperty = (p: Property) => {
    setEditingPropertyId(p.id);
    setPropTitle(p.title);
    setPropSlug(p.slug);
    setPropPrice(p.price);
    setPropType(p.propertyType);
    setPropListingType(p.listingType);
    setPropCity(p.location.city);
    setPropLocality(p.location.locality);
    setPropAddress(p.location.address);
    setPropBedrooms(p.bedrooms);
    setPropBathrooms(p.bathrooms);
    setPropArea(p.area);
    setPropDescription(p.description);
    setPropImageUrl(p.images[0] || '');
    setPropAmenities(p.amenities.join(', '));
    setPropFeatured(p.featured);
    setPropStatus(p.publicationStatus === 'draft' ? 'draft' : 'published');
    setPropertyModalOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      const amenitiesArr = propAmenities.split(',').map((s) => s.trim()).filter(Boolean);
      const generatedSlug = propSlug.trim() || propTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const propertyData = {
        title: propTitle,
        slug: generatedSlug,
        referenceNumber: `SP-${propType.substring(0, 3).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`,
        description: propDescription,
        propertyType: propType,
        listingType: propListingType,
        price: Number(propPrice),
        currency: 'USD',
        location: {
          address: propAddress,
          locality: propLocality,
          city: propCity,
          country: 'United States',
        },
        bedrooms: Number(propBedrooms),
        bathrooms: Number(propBathrooms),
        area: Number(propArea),
        areaUnit: 'sq.ft',
        amenities: amenitiesArr,
        furnishingStatus: 'furnished' as const,
        constructionStatus: 'ready-to-move' as const,
        parkingSpaces: 3,
        images: [propImageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        featured: propFeatured,
        publicationStatus: propStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (editingPropertyId) {
        await propertyService.updateProperty(editingPropertyId, propertyData);
      } else {
        await propertyService.createProperty(propertyData);
      }

      await refreshProperties();
      setPropertyModalOpen(false);
    } catch (err) {
      console.error('Save property failed', err);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing from Firestore?');
    if (!confirmDelete) return;

    try {
      await propertyService.deleteProperty(id);
      await refreshProperties();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleToggleFeatured = async (p: Property) => {
    try {
      await propertyService.updateProperty(p.id, { featured: !p.featured });
      await refreshProperties();
    } catch (err) {
      console.error('Toggle featured failed', err);
    }
  };

  const handleTogglePublication = async (p: Property) => {
    try {
      const newStatus = p.publicationStatus === 'published' ? 'draft' : 'published';
      await propertyService.updateProperty(p.id, { publicationStatus: newStatus });
      await refreshProperties();
    } catch (err) {
      console.error('Toggle publication failed', err);
    }
  };

  const handleUpdateEnquiryStatus = async (enqId: string, status: EnquiryStatus) => {
    try {
      await enquiryService.updateEnquiry(enqId, { status });
      setEnquiries((prev) => prev.map((e) => (e.id === enqId ? { ...e, status } : e)));
    } catch (err) {
      console.error('Update status failed', err);
    }
  };

  const handleSaveInternalNote = async () => {
    if (!selectedEnquiry) return;
    try {
      await enquiryService.updateEnquiry(selectedEnquiry.id, { internalNotes: internalNoteText });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, internalNotes: internalNoteText } : e))
      );
      setSelectedEnquiry(null);
    } catch (err) {
      console.error('Save internal note failed', err);
    }
  };

  const handleUpdateAppointmentStatus = async (apptId: string, status: any) => {
    try {
      await enquiryService.updateAppointment(apptId, { status });
      setAppointments((prev) => prev.map((a) => (a.id === apptId ? { ...a, status } : a)));
    } catch (err) {
      console.error('Update visit status failed', err);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setLoading(true);
      await seedDemoListings();
      setSeedingSuccess(true);
      setTimeout(() => setSeedingSuccess(false), 4000);
    } catch (err) {
      console.error('Database seeding failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Reference', 'Name', 'Email', 'Phone', 'Type', 'Status', 'Property', 'Date'];
    const rows = enquiries.map((e) => [
      e.referenceNumber,
      `"${e.customerName}"`,
      e.customerEmail,
      e.customerPhone || '',
      e.enquiryType,
      e.status,
      `"${e.propertyTitleSnapshot || 'General'}"`,
      new Date(e.createdAt).toLocaleDateString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sandpiper_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (enquirySearch.trim()) {
      const q = enquirySearch.toLowerCase();
      return (
        e.customerName.toLowerCase().includes(q) ||
        e.customerEmail.toLowerCase().includes(q) ||
        e.referenceNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-[#0B192C] text-stone-100 p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1E3E62] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#C5A880] text-[#0B192C] rounded">
              Brokerage Executive Portal
            </span>
            <span className="text-xs text-stone-400 font-mono">Firestore Connected</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
            Sandpiper Realtors Administration
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Logged in as <strong>{currentUser?.email}</strong> &middot; Full Privileged Access
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSeedDatabase}
            disabled={loading}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-stone-800 hover:bg-stone-700 text-[#C5A880] border border-[#C5A880]/40 rounded transition-colors flex items-center gap-2 shadow"
            title="Populate Firestore with verified sample luxury properties"
          >
            <Database className="w-4 h-4" />
            <span>Seed Demo Listings</span>
          </button>

          <button
            onClick={handleOpenCreateProperty}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#C5A880] hover:bg-white text-[#0B192C] rounded transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Listing</span>
          </button>
        </div>
      </div>

      {seedingSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Curated architectural demo listings have been successfully seeded into Cloud Firestore!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2">
        {[
          { id: 'overview', label: 'Executive Overview', icon: ShieldCheck },
          { id: 'properties', label: `Properties (${properties.length})`, icon: Building },
          { id: 'enquiries', label: `Leads & Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'visits', label: `Site Visits (${appointments.length})`, icon: Calendar },
          { id: 'agents', label: `Advisors (${INITIAL_DEMO_AGENTS.length})`, icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
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

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Published Properties
              </span>
              <div className="text-3xl font-serif font-bold text-stone-900 mt-2">
                {totalPublished}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Active on public website</span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Draft Listings
              </span>
              <div className="text-3xl font-serif font-bold text-amber-700 mt-2">
                {totalDrafts}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Pending public release</span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                New Uncontacted Leads
              </span>
              <div className="text-3xl font-serif font-bold text-blue-600 mt-2">
                {newLeadsCount}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Require advisor response</span>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Pending Site Visits
              </span>
              <div className="text-3xl font-serif font-bold text-emerald-600 mt-2">
                {pendingVisitsCount}
              </div>
              <span className="text-xs text-stone-400 mt-1 block">Awaiting confirmation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Enquiries snippet */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Recent Inbound Leads
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-[#C5A880] font-semibold hover:underline"
                >
                  View All Leads
                </button>
              </div>

              {enquiries.length === 0 ? (
                <p className="text-xs text-stone-500 py-6 text-center">No leads recorded yet.</p>
              ) : (
                <div className="divide-y divide-stone-100 space-y-2">
                  {enquiries.slice(0, 4).map((e) => (
                    <div key={e.id} className="pt-2 text-xs flex justify-between items-center">
                      <div>
                        <strong className="block text-stone-900">{e.customerName}</strong>
                        <span className="text-stone-500">{e.customerEmail}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100">
                        {e.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 pb-3 border-b border-stone-100">
                Administrative Quick Tools
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={handleOpenCreateProperty}
                  className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#C5A880] mb-2" />
                  <strong className="block text-stone-900">Add New Property</strong>
                  <span className="text-stone-500">Publish architectural estate</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-colors"
                >
                  <Download className="w-5 h-5 text-[#C5A880] mb-2" />
                  <strong className="block text-stone-900">Export Leads to CSV</strong>
                  <span className="text-stone-500">Download formatted contacts</span>
                </button>

                <button
                  onClick={handleSeedDatabase}
                  className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-colors"
                >
                  <Database className="w-5 h-5 text-[#C5A880] mb-2" />
                  <strong className="block text-stone-900">Sync Demo Data</strong>
                  <span className="text-stone-500">Ensure catalog fullness</span>
                </button>

                <Link
                  to="/properties"
                  className="p-4 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left transition-colors"
                >
                  <Eye className="w-5 h-5 text-[#C5A880] mb-2" />
                  <strong className="block text-stone-900">Public Website View</strong>
                  <span className="text-stone-500">Audit client discovery UX</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTIES MANAGEMENT */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Property Portfolio Directory
              </h3>
              <p className="text-xs text-stone-500">Create, modify, toggle featured, and manage publication states</p>
            </div>
            <button
              onClick={handleOpenCreateProperty}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors flex items-center gap-1.5 self-start"
            >
              <Plus className="w-4 h-4" /> Add Property
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Type / Listing</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-12 h-12 rounded object-cover border border-stone-200"
                        />
                        <div>
                          <strong className="block font-serif text-sm text-stone-900 line-clamp-1">
                            {p.title}
                          </strong>
                          <span className="text-[11px] text-stone-500 font-mono">
                            {p.referenceNumber} &middot; {p.location.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 capitalize">
                      <span className="font-semibold block">{p.propertyType}</span>
                      <span className="text-[11px] text-stone-500">{p.listingType}</span>
                    </td>

                    <td className="p-4 font-bold text-stone-900">
                      ${p.price.toLocaleString()}
                    </td>

                    <td className="p-4 text-stone-600">
                      {p.bedrooms} Beds &middot; {p.bathrooms} Baths &middot; {p.area.toLocaleString()} sq.ft
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-full transition-colors ${
                          p.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-stone-300 hover:bg-stone-100'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublication(p)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                          p.publicationStatus === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {p.publicationStatus}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/properties/${p.slug}`}
                          className="p-1.5 text-stone-500 hover:text-stone-900 rounded hover:bg-stone-100"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditProperty(p)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(p.id)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LEADS & ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Lead & Client Enquiry Management
              </h3>
              <p className="text-xs text-stone-500">Track client status, add confidential internal notes, and export CSV</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search name, ref, email..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-stone-300 rounded"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Site Visit Requested">Site Visit Requested</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> CSV Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-4">Reference & Client</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Property / Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Internal Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/50">
                    <td className="p-4">
                      <strong className="block font-semibold text-stone-900">{e.customerName}</strong>
                      <span className="text-[11px] font-mono text-stone-500">{e.referenceNumber}</span>
                    </td>

                    <td className="p-4">
                      <div>{e.customerEmail}</div>
                      <div className="text-stone-500">{e.customerPhone || 'No phone'}</div>
                    </td>

                    <td className="p-4 font-medium text-stone-800 max-w-[150px] truncate">
                      {e.propertyTitleSnapshot || 'General Advisory'}
                    </td>

                    <td className="p-4 max-w-[200px] truncate text-stone-600" title={e.message}>
                      {e.message}
                    </td>

                    <td className="p-4">
                      <select
                        value={e.status}
                        onChange={(evt) => handleUpdateEnquiryStatus(e.id, evt.target.value as EnquiryStatus)}
                        className="px-2 py-1 text-xs border border-stone-300 rounded font-semibold bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Site Visit Requested">Site Visit Requested</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedEnquiry(e);
                          setInternalNoteText(e.internalNotes || '');
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#0B192C] bg-stone-100 hover:bg-stone-200 rounded"
                      >
                        {e.internalNotes ? 'View Note' : '+ Note'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SITE VISITS MANAGEMENT */}
      {activeTab === 'visits' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden space-y-4">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Site Visit Appointments
              </h3>
              <p className="text-xs text-stone-500">Manage private viewing requests and dates</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 uppercase font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-4">Client</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Inspection Date & Window</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-stone-50/50">
                    <td className="p-4">
                      <strong className="block font-semibold text-stone-900">{a.customerName}</strong>
                    </td>

                    <td className="p-4 font-serif font-bold text-[#0B192C]">
                      {a.propertyTitleSnapshot}
                    </td>

                    <td className="p-4">
                      <span className="font-semibold block">{a.requestedDate}</span>
                      <span className="text-stone-500">{a.requestedTime}</span>
                    </td>

                    <td className="p-4">
                      <div>{a.customerEmail}</div>
                      <div className="text-stone-500">{a.customerPhone}</div>
                    </td>

                    <td className="p-4">
                      <select
                        value={a.status}
                        onChange={(evt) => handleUpdateAppointmentStatus(a.id, evt.target.value)}
                        className="px-2 py-1 text-xs border border-stone-300 rounded font-semibold"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rescheduled">Rescheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      {a.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateAppointmentStatus(a.id, 'confirmed')}
                          className="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ADVISORS MANAGEMENT */}
      {activeTab === 'agents' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Accredited Real Estate Advisors
              </h3>
              <p className="text-xs text-stone-500">Partner roster, assigned listings, and contact routing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_DEMO_AGENTS.map((agent) => (
              <div key={agent.id} className="p-4 border border-stone-200 rounded-lg bg-stone-50 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={agent.photoUrl} alt={agent.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">{agent.name}</h4>
                    <span className="text-[11px] text-[#C5A880] block font-semibold">{agent.role}</span>
                  </div>
                </div>
                <div className="text-xs text-stone-600">
                  <div>Email: {agent.email}</div>
                  <div>Phone: {agent.phone}</div>
                  <div className="mt-1 font-semibold text-stone-800">
                    Active Estates: {agent.assignedListingsCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Create / Edit Modal */}
      {propertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-stone-200 overflow-hidden">
            <div className="bg-[#0B192C] px-6 py-4 text-stone-100 flex items-center justify-between shrink-0">
              <h3 className="font-serif text-lg font-bold">
                {editingPropertyId ? 'Edit Property Listing' : 'Create New Luxury Property'}
              </h3>
              <button
                onClick={() => setPropertyModalOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={propTitle}
                    onChange={(e) => setPropTitle(e.target.value)}
                    placeholder="The Azure Horizon Coastal Villa"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={propPrice}
                    onChange={(e) => setPropPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  >
                    <option value="villa">Villa</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="commercial">Commercial</option>
                    <option value="office">Office</option>
                    <option value="plot">Plot / Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Listing Type
                  </label>
                  <select
                    value={propListingType}
                    onChange={(e) => setPropListingType(e.target.value as ListingType)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="commercial">Commercial</option>
                    <option value="new-development">New Development</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={propStatus}
                    onChange={(e) => setPropStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={propCity}
                    onChange={(e) => setPropCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Locality / Suburb
                  </label>
                  <input
                    type="text"
                    value={propLocality}
                    onChange={(e) => setPropLocality(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={propAddress}
                    onChange={(e) => setPropAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={propBedrooms}
                    onChange={(e) => setPropBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={propBathrooms}
                    onChange={(e) => setPropBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                    Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    value={propArea}
                    onChange={(e) => setPropArea(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Main Photography Image URL
                </label>
                <input
                  type="url"
                  value={propImageUrl}
                  onChange={(e) => setPropImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Amenities (comma separated)
                </label>
                <input
                  type="text"
                  value={propAmenities}
                  onChange={(e) => setPropAmenities(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Property Description
                </label>
                <textarea
                  rows={3}
                  value={propDescription}
                  onChange={(e) => setPropDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={propFeatured}
                  onChange={(e) => setPropFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0B192C] rounded"
                />
                <label htmlFor="featuredCheck" className="text-xs font-semibold text-stone-800">
                  Feature prominently on Homepage carousel
                </label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPropertyModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase border border-stone-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors shadow disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving...' : editingPropertyId ? 'Update Listing' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Internal Note Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-stone-200">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="font-serif font-bold text-base text-stone-900">
                Confidential Note: {selectedEnquiry.customerName}
              </h4>
              <button onClick={() => setSelectedEnquiry(null)}>
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            <p className="text-xs text-stone-500">
              Internal notes are only visible to authorized administrators and assigned advisors.
            </p>

            <textarea
              rows={4}
              value={internalNoteText}
              onChange={(e) => setInternalNoteText(e.target.value)}
              placeholder="e.g. Pre-qualified up to $10M by J.P. Morgan Private Bank. Interested in closing before Q4."
              className="w-full p-3 text-xs border border-stone-300 rounded"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-3 py-1.5 text-xs font-semibold uppercase border border-stone-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveInternalNote}
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
