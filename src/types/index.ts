export type PropertyType =
  | 'apartment'
  | 'house'
  | 'villa'
  | 'plot'
  | 'commercial'
  | 'office'
  | 'retail'
  | 'penthouse';

export type ListingType = 'sale' | 'rent' | 'commercial' | 'new-development';

export type FurnishingStatus = 'furnished' | 'semi-furnished' | 'unfurnished';

export type ConstructionStatus = 'ready-to-move' | 'under-construction' | 'new-launch';

export type PublicationStatus = 'published' | 'draft' | 'archived';

export interface PropertyLocation {
  address: string;
  locality: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  referenceNumber: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency: string;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string; // 'sq.ft' | 'sq.m'
  carpetArea?: number;
  amenities: string[];
  furnishingStatus: FurnishingStatus;
  constructionStatus: ConstructionStatus;
  parkingSpaces: number;
  yearBuilt?: number;
  images: string[];
  floorPlans?: string[];
  brochureUrl?: string;
  virtualTourUrl?: string;
  agentId?: string;
  agentName?: string;
  featured: boolean;
  publicationStatus: PublicationStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export type EnquiryType = 'general' | 'price_quote' | 'site_visit' | 'callback' | 'valuation';

export type EnquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Site Visit Requested'
  | 'Site Visit Scheduled'
  | 'Negotiation'
  | 'Converted'
  | 'Closed'
  | 'Not Interested';

export interface Enquiry {
  id: string;
  referenceNumber: string;
  propertyId?: string;
  propertyTitleSnapshot?: string;
  customerUid?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  enquiryType: EnquiryType;
  message: string;
  source: string;
  assignedAgentId?: string;
  status: EnquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitleSnapshot: string;
  customerUid?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requestedDate: string;
  requestedTime: string;
  assignedAgentId?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedProperty {
  id: string;
  customerUid: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: number;
  propertyImage: string;
  propertyLocation: string;
  propertyType: string;
  listingType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  createdAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  photoUrl: string;
  active: boolean;
  assignedListingsCount: number;
  specialization?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  approved: boolean;
  featured: boolean;
  propertyPurchased?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  officeAddress: string;
  currency: string;
  currencySymbol: string;
  businessHours: string;
}

export type UserRole = 'customer' | 'agent' | 'admin';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}
