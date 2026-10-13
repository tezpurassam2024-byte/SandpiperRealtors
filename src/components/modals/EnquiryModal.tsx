import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Property, EnquiryType } from '../../types';
import { enquiryService } from '../../services/enquiryService';
import { useAuth } from '../../context/AuthContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  defaultEnquiryType?: EnquiryType;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  defaultEnquiryType = 'general',
}) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultEnquiryType);
  const [message, setMessage] = useState(
    property
      ? `I am interested in learning more about ${property.title} (Ref: ${property.referenceNumber}). Please provide comprehensive details and brochure.`
      : 'I would like to speak with a Sandpiper real estate advisor regarding high-end acquisitions.'
  );
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please provide your name, email, and message inquiry.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);
      await enquiryService.submitEnquiry({
        propertyId: property?.id,
        propertyTitleSnapshot: property?.title,
        customerUid: currentUser?.uid,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        enquiryType,
        message,
        source: property ? `Listing: ${property.title}` : 'General Advisory Modal',
      });

      setReferenceNumber(`ENQ-${Math.floor(100000 + Math.random() * 900000)}`);
    } catch (err: any) {
      console.error('Failed to submit enquiry', err);
      setErrorMessage(err.message || 'Error processing request. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setReferenceNumber(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif text-lg font-bold">
              {property ? 'Inquire About Property' : 'Connect with Sandpiper Advisory'}
            </h3>
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
          {referenceNumber ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Inquiry Successfully Dispatched
              </h4>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                Thank you for contacting Sandpiper Realtors. Our private brokerage desk has received your request and an advisor will respond promptly.
              </p>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded font-mono text-xs text-stone-700">
                Tracking Reference: {referenceNumber}
              </div>
              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {property && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs flex justify-between items-center">
                  <div>
                    <span className="font-mono text-stone-400 block">{property.referenceNumber}</span>
                    <strong className="text-stone-800 font-serif">{property.title}</strong>
                  </div>
                  <span className="font-bold text-[#0B192C] text-sm">
                    ${property.price.toLocaleString()}
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sterling Hayes"
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Inquiry Nature
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  >
                    <option value="general">General Property Information</option>
                    <option value="price_quote">Pricing & Acquisition Terms</option>
                    <option value="callback">Request Private Callback</option>
                    <option value="valuation">Property Valuation Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Strict Confidentiality Guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded disabled:opacity-50 transition-colors shadow-sm"
                >
                  {submitting ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
