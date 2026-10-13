import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Property, SavedProperty } from '../types';
import { propertyService } from '../services/propertyService';
import { useAuth } from './AuthContext';
import { INITIAL_DEMO_PROPERTIES } from '../data/initialDemoData';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  savedProperties: SavedProperty[];
  compareList: Property[];
  toggleSave: (property: Property) => Promise<void>;
  isSaved: (propertyId: string) => boolean;
  toggleCompare: (property: Property) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  refreshProperties: () => Promise<void>;
  seedDemoListings: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [compareList, setCompareList] = useState<Property[]>([]);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await propertyService.getProperties(isAdmin);
      if (data.length === 0) {
        // Fallback to initial demo properties with mock IDs if firestore hasn't been populated yet
        const mappedDemo: Property[] = INITIAL_DEMO_PROPERTIES.map((p, idx) => ({
          ...p,
          id: `demo-${idx + 1}`,
        }));
        setProperties(mappedDemo);
      } else {
        setProperties(data);
      }
    } catch (err) {
      console.warn('Falling back to local demo properties:', err);
      const mappedDemo: Property[] = INITIAL_DEMO_PROPERTIES.map((p, idx) => ({
        ...p,
        id: `demo-${idx + 1}`,
      }));
      setProperties(mappedDemo);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const loadSaved = useCallback(async () => {
    if (!currentUser) {
      setSavedProperties([]);
      return;
    }
    try {
      const items = await propertyService.getSavedProperties(currentUser.uid);
      setSavedProperties(items);
    } catch (err) {
      console.warn('Could not load saved properties:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  const toggleSave = async (property: Property) => {
    if (!currentUser) {
      console.warn('Authentication required to save properties');
      return;
    }
    const existing = savedProperties.find((s) => s.propertyId === property.id);
    if (existing) {
      try {
        await propertyService.removeSavedProperty(existing.id);
        setSavedProperties((prev) => prev.filter((s) => s.id !== existing.id));
      } catch (err) {
        console.error('Failed to remove saved property', err);
      }
    } else {
      try {
        const newId = await propertyService.saveProperty(currentUser.uid, property);
        setSavedProperties((prev) => [
          ...prev,
          {
            id: newId,
            customerUid: currentUser.uid,
            propertyId: property.id,
            propertyTitle: property.title,
            propertyPrice: property.price,
            propertyImage: property.images[0] || '',
            propertyLocation: `${property.location.locality}, ${property.location.city}`,
            propertyType: property.propertyType,
            listingType: property.listingType,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error('Failed to save property', err);
      }
    }
  };

  const isSaved = (propertyId: string) => {
    return savedProperties.some((s) => s.propertyId === propertyId);
  };

  const toggleCompare = (property: Property) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const seedDemoListings = async () => {
    try {
      setLoading(true);
      await propertyService.seedDemoProperties();
      await loadProperties();
    } catch (err) {
      console.error('Error seeding properties', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        savedProperties,
        compareList,
        toggleSave,
        isSaved,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        refreshProperties: loadProperties,
        seedDemoListings,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};
