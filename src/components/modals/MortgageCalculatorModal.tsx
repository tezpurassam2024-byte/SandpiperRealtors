import React, { useState } from 'react';
import { X, Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrice?: number;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose,
  defaultPrice = 5000000,
}) => {
  const [homePrice, setHomePrice] = useState<number>(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  if (!isOpen) return null;

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPaymentAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  // Monthly Principal & Interest calculation
  const monthlyPrincipalAndInterest =
    monthlyRate > 0
      ? (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  // Estimated Property Tax (1.1% annual) & Home Insurance ($250/mo)
  const monthlyTax = (homePrice * 0.011) / 12;
  const monthlyInsurance = Math.max(150, homePrice * 0.0006);
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyTax + monthlyInsurance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B192C] px-6 py-4 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#C5A880]" />
            <h3 className="font-serif text-lg font-bold">Mortgage & Financing Estimator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Property Valuation ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="50000"
                  step="25000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-stone-300 rounded font-medium focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Down Payment: {downPaymentPercent}% (${downPaymentAmount.toLocaleString()})
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#0B192C] cursor-pointer mt-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Interest Rate (% Annual)
              </label>
              <div className="relative">
                <Percent className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="1"
                  max="15"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-stone-300 rounded font-medium focus:ring-1 focus:ring-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Amortization Term
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded font-medium focus:ring-1 focus:ring-[#0B192C]"
              >
                <option value={15}>15 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={30}>30 Years Fixed</option>
              </select>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-5">
            <div className="text-center pb-3 border-b border-stone-200">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
                Estimated Monthly Obligation
              </span>
              <div className="text-3xl font-serif font-bold text-[#0B192C] mt-1">
                ${Math.round(totalMonthlyPayment).toLocaleString()}{' '}
                <span className="text-xs font-normal text-stone-500">/ month</span>
              </div>
            </div>

            <div className="pt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-stone-500 block">Principal & Int.</span>
                <strong className="text-stone-800 block text-sm font-semibold">
                  ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                </strong>
              </div>
              <div>
                <span className="text-stone-500 block">Est. Property Tax</span>
                <strong className="text-stone-800 block text-sm font-semibold">
                  ${Math.round(monthlyTax).toLocaleString()}
                </strong>
              </div>
              <div>
                <span className="text-stone-500 block">Est. Hazard Ins.</span>
                <strong className="text-stone-800 block text-sm font-semibold">
                  ${Math.round(monthlyInsurance).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 italic text-center">
            * Estimates for general advisory reference only. Does not constitute a formal loan commitment or rate lock. Taxes, insurance, and lender requirements will vary.
          </p>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#0B192C] text-[#C5A880] hover:text-white rounded transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
