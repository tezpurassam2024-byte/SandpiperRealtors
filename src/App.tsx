import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MortgageCalculatorModal } from './components/modals/MortgageCalculatorModal';
import { PropertyCompareModal } from './components/modals/PropertyCompareModal';
import { ScheduleVisitModal } from './components/modals/ScheduleVisitModal';
import { EnquiryModal } from './components/modals/EnquiryModal';

import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AgentsPage } from './pages/AgentsPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { Property } from './types';

export default function App() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calcDefaultPrice, setCalcDefaultPrice] = useState<number>(5000000);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<Property | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedPropertyForEnquiry, setSelectedPropertyForEnquiry] = useState<Property | undefined>(undefined);

  const handleOpenScheduleVisit = (property: Property) => {
    setSelectedPropertyForVisit(property);
    setScheduleModalOpen(true);
  };

  const handleOpenEnquiry = (property?: Property) => {
    setSelectedPropertyForEnquiry(property);
    setEnquiryModalOpen(true);
  };

  const handleOpenCalculator = (price?: number) => {
    if (price) setCalcDefaultPrice(price);
    setCalculatorOpen(true);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
            {/* Global Sticky Luxury Navbar */}
            <Navbar
              onOpenCalculator={() => handleOpenCalculator()}
              onOpenCompare={() => setCompareModalOpen(true)}
            />

            {/* Main Application Body */}
            <main className="flex-1">
              <Routes>
                {/* 1. Public Homepage */}
                <Route
                  path="/"
                  element={
                    <HomePage
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                      onOpenEnquiry={handleOpenEnquiry}
                    />
                  }
                />

                {/* 2. Property Discovery Routes */}
                <Route
                  path="/properties"
                  element={<PropertiesPage onOpenScheduleVisit={handleOpenScheduleVisit} />}
                />
                <Route
                  path="/buy"
                  element={
                    <PropertiesPage
                      presetListingType="sale"
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                    />
                  }
                />
                <Route
                  path="/rent"
                  element={
                    <PropertiesPage
                      presetListingType="rent"
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                    />
                  }
                />
                <Route
                  path="/commercial"
                  element={
                    <PropertiesPage
                      presetListingType="commercial"
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                    />
                  }
                />
                <Route
                  path="/new-projects"
                  element={
                    <PropertiesPage
                      presetListingType="new-development"
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                    />
                  }
                />

                {/* 3. Individual Property Detail */}
                <Route
                  path="/properties/:slug"
                  element={
                    <PropertyDetailPage
                      onOpenScheduleVisit={handleOpenScheduleVisit}
                      onOpenEnquiry={handleOpenEnquiry}
                      onOpenCalculator={handleOpenCalculator}
                    />
                  }
                />

                {/* 4. Company & Advisory Routes */}
                <Route
                  path="/agents"
                  element={<AgentsPage onOpenEnquiry={handleOpenEnquiry} />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="/services"
                  element={<ServicesPage onOpenEnquiry={() => handleOpenEnquiry()} />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />

                {/* 5. Authentication */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<LoginPage />} />

                {/* 6. Dashboards */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />

                {/* 7. Legal */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* 8. 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Global Luxury Footer */}
            <Footer />

            {/* Global Modals */}
            <MortgageCalculatorModal
              isOpen={calculatorOpen}
              onClose={() => setCalculatorOpen(false)}
              defaultPrice={calcDefaultPrice}
            />

            <PropertyCompareModal
              isOpen={compareModalOpen}
              onClose={() => setCompareModalOpen(false)}
            />

            {selectedPropertyForVisit && (
              <ScheduleVisitModal
                isOpen={scheduleModalOpen}
                onClose={() => {
                  setScheduleModalOpen(false);
                  setSelectedPropertyForVisit(null);
                }}
                property={selectedPropertyForVisit}
              />
            )}

            <EnquiryModal
              isOpen={enquiryModalOpen}
              onClose={() => {
                setEnquiryModalOpen(false);
                setSelectedPropertyForEnquiry(undefined);
              }}
              property={selectedPropertyForEnquiry}
            />
          </div>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
