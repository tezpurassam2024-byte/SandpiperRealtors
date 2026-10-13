import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Sandpiper Realtors verify property legitimacy and title deeds?',
      a: 'Prior to being accepted into our portfolio, each residence undergoes an exhaustive title audit conducted by accredited real estate legal counsel. We review encumbrance certificates, municipal zoning compliance, architectural certifications, and property boundary records.',
    },
    {
      q: 'Can I schedule private or discreet viewings for high-profile clients?',
      a: 'Yes. Discretion is a cornerstone of our firm. We regularly coordinate chauffeured, private after-hours inspections under non-disclosure agreements (NDAs) to protect buyer and seller privacy.',
    },
    {
      q: 'Does Sandpiper assist with cross-border international buyers?',
      a: 'Yes. Our advisors are thoroughly versed in Foreign Investment in Real Property Tax Act (FIRPTA) regulations, international currency wire escrows, and setting up domestic LLC or trust holding structures in collaboration with your private wealth managers.',
    },
    {
      q: 'How are commercial and office leases structured?',
      a: 'Our commercial division structures Full-Service Gross (FSG), Modified Gross, and Triple Net (NNN) leases tailored to institutional tenants, corporate headquarters, and family offices.',
    },
    {
      q: 'How do I submit an enquiry or request a site visit?',
      a: 'You can directly book a preferred inspection date and time slot using the "Schedule Private Visit" button on any property detail page, or contact our private brokerage desk via the contact form.',
    },
    {
      q: 'Are mortgage estimates on the website binding?',
      a: 'The mortgage calculator provides preliminary financial estimations based on prevailing benchmark interest rates and down-payment ratios. Final mortgage loan approval is issued by licensed financial lenders and underwriters.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
          Client Advisory
        </span>
        <h1 className="text-4xl font-serif font-bold text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-sm max-w-lg mx-auto">
          Insights into our acquisition process, security protocols, and client representation standards.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="font-serif font-bold text-stone-900 text-base">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#C5A880] transition-transform duration-200 shrink-0 ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-stone-100 p-8 rounded-xl border border-stone-200 text-center space-y-3">
        <h3 className="font-serif font-bold text-lg text-stone-900">Have a Specific Transaction Question?</h3>
        <p className="text-xs text-stone-600">
          Our senior partners are available for bespoke inquiries.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] rounded hover:bg-[#1E3E62] transition-colors"
        >
          <span>Connect with Advisory</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
