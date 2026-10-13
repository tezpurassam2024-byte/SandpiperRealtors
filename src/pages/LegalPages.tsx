import React from 'react';
import { Shield, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">Legal Disclosures</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Privacy Policy</h1>
        <p className="text-xs text-stone-500">Effective Date: October 2026 &middot; Sandpiper Realtors Inc.</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <p>
          At <strong>Sandpiper Realtors</strong>, we treat the confidentiality of our clients, website visitors, and property owners with the highest level of fiduciary care. This Privacy Policy outlines how we collect, safeguard, and utilize information gathered through our digital platform.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">1. Information Collection</h3>
        <p>
          We only collect personal information that you voluntarily submit when requesting a site inspection, inquiring about a property, scheduling a private callback, or registering for a private account. Such details include your name, email address, telephone number, and property preference parameters.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">2. Utilization of Data</h3>
        <p>
          Your information is solely used to facilitate property viewings, communicate transaction documentation, and connect you with authorized Sandpiper advisors. We do not sell, rent, or trade client personal records to third-party commercial marketing entities under any circumstances.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">3. Security & Cloud Safeguards</h3>
        <p>
          Authentication and persistent database operations are handled by Google Firebase Firestore and Authentication, utilizing modern encryption at rest and in transit.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">4. Contacting Our Data Steward</h3>
        <p>
          For inquiries or requests regarding data retention, you may contact: <code>privacy@sandpiperrealtors.com</code>.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">Brokerage Terms</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">Terms & Legal Disclaimers</h1>
        <p className="text-xs text-stone-500">Effective Date: October 2026 &middot; Sandpiper Realtors Inc.</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <h3 className="font-serif font-bold text-lg text-stone-900">1. Equal Housing Opportunity</h3>
        <p>
          Sandpiper Realtors is fully committed to the letter and spirit of U.S. and international fair housing policies for the achievement of equal housing opportunity throughout the nation.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">2. Listing Information Disclaimer</h3>
        <p>
          All information regarding property specifications, interior square footage, lot dimensions, amenities, and prices is deemed reliable but is not guaranteed and should be independently verified through professional architectural inspection and escrow title review.
        </p>

        <h3 className="font-serif font-bold text-lg text-stone-900">3. Non-Binding Estimations</h3>
        <p>
          Financial calculators and payment approximations provided on this website are for general informational purposes only and do not constitute loan approvals or formal investment recommendations.
        </p>
      </div>
    </div>
  );
};
