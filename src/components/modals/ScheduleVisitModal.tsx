import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Property } from '../../types';
import { enquiryService } from '../../services/enquiryService';
import { useAuth } from '../../context/AuthContext';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  property,
}) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) {
      setErrorMessage('Please provide your name, email, and preferred inspection date.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);
      const appointmentId = await enquiryService.requestAppointment({
        propertyId: property.id,
        propertyTitleSnapshot: property.title,
        customerUid: currentUser?.uid,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        requestedDate: date,
        requestedTime: time,
        notes,
      });

      setSuccessReference(appointmentId);
    } catch (err: any) {
      console.error('Failed to schedule visit', err);
      setErrorMessage(err.message || 'Unable to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessReference(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif text-lg font-bold">Schedule Private Property Inspection</h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successReference ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Site Visit Request Received
              </h4>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                Your private viewing request for <strong className="text-stone-900">{property.title}</strong> has been logged in our secure system. An assigned Sandpiper advisor will reach out to confirm arrangements.
              </p>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded font-mono text-xs text-stone-700">
                Booking ID: {successReference}
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property summary */}
              <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-lg">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-14 h-14 object-cover rounded shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] text-stone-500 font-mono">{property.referenceNumber}</div>
                  <h5 className="text-sm font-bold font-serif text-stone-900 truncate">
                    {property.title}
                  </h5>
                  <div className="text-xs text-[#0B192C] font-semibold">
                    ${property.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sterling Hayes"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Preferred Time Window
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                >
                  <option value="10:00 AM">Morning (10:00 AM - 12:00 PM)</option>
                  <option value="02:00 PM">Early Afternoon (01:00 PM - 03:00 PM)</option>
                  <option value="04:30 PM">Late Afternoon / Golden Hour (04:00 PM - 06:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Specific Requests or Access Requirements
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in architecture, parking layout, or zoning documents"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Confidential & Private</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded disabled:opacity-50 transition-colors shadow-sm"
                >
                  {submitting ? 'Booking Tour...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
