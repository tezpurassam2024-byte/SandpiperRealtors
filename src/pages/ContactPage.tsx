import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { enquiryService } from '../services/enquiryService';
import { useAuth } from '../context/AuthContext';

export const ContactPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Acquisition Advisory');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);
      const id = await enquiryService.submitEnquiry({
        customerUid: currentUser?.uid,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        enquiryType: 'general',
        message: `Subject: ${subject}\n\n${message}`,
        source: 'Contact Page Inquiry',
      });
      setReference(`CON-${Math.floor(100000 + Math.random() * 900000)}`);
      setMessage('');
    } catch (err: any) {
      console.error('Contact form error', err);
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
          Connect with Our Partners
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900">
          Contact Sandpiper Realtors
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Whether you are looking to acquire an iconic coastal estate or require strategic commercial leasing guidance, our private brokerage team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Offices */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900 pb-3 border-b border-stone-100">
              Corporate Headquarters
            </h3>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Newport Beach Flagship</strong>
                  <span className="text-stone-600">
                    450 Newport Center Drive, Suite 800<br />
                    Newport Beach, California 92660
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Manhattan Advisory Suite</strong>
                  <span className="text-stone-600">
                    767 Fifth Avenue, 32nd Floor<br />
                    New York, New York 10153
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-5 h-5 text-[#C5A880] shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Direct Telephone</strong>
                  <span className="text-stone-600">+1 (800) 540-SAND (7263)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A880] shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Confidential Dispatch</strong>
                  <span className="text-stone-600">concierge@sandpiperrealtors.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-semibold">Advisory Hours</strong>
                  <span className="text-stone-600">
                    Monday &ndash; Friday: 8:30 AM &ndash; 6:30 PM PST<br />
                    Saturday & Sunday: Private Viewings by Appointment
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B192C] text-stone-100 p-6 rounded-xl border border-[#1E3E62] flex items-center gap-4">
            <Shield className="w-8 h-8 text-[#C5A880] shrink-0" />
            <div className="text-xs">
              <strong className="block text-stone-200 text-sm font-serif">Discretion First</strong>
              All correspondences, phone consultations, and inspection notes are safeguarded by strict confidentiality standards.
            </div>
          </div>
        </div>

        {/* Live Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl border border-stone-200 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880] block mb-1">
              Direct Communication
            </span>
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              Transmit an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Complete the dispatch form below to connect directly with our brokerage advisory desk.
            </p>
          </div>

          {reference ? (
            <div className="p-8 text-center space-y-4 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Inquiry Logged in Database
              </h4>
              <p className="text-stone-600 text-sm max-w-sm mx-auto">
                Thank you for your message. An advisor will review your parameters and follow up shortly.
              </p>
              <div className="p-3 bg-white border border-stone-300 rounded font-mono text-xs text-stone-700">
                Inquiry Reference: {reference}
              </div>
              <button
                onClick={() => setReference(null)}
                className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-rose-50 border border-rose-200 text-rose-700 rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sterling Hayes"
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                  >
                    <option value="Acquisition Advisory">Property Acquisition Advisory</option>
                    <option value="Property Disposition">Listing & Selling a Luxury Property</option>
                    <option value="Commercial Leasing">Commercial Space / Office Leasing</option>
                    <option value="Valuation Request">Confidential Valuation Assessment</option>
                    <option value="General Question">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify any preferred locations, target budgets, architectural requirements, or timelines..."
                  className="w-full px-3.5 py-2 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  * Fields marked with asterisk are required.
                </span>

                <button
                  type="submit"
                  disabled={submitting}
                  className="py-3 px-8 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded disabled:opacity-50 transition-colors shadow-md"
                >
                  {submitting ? 'Transmitting...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
