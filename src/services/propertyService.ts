import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
import { Property, SavedProperty } from '../types';
import { INITIAL_DEMO_PROPERTIES } from '../data/initialDemoData';

const PROPERTIES_PATH = 'properties';
const SAVED_PATH = 'savedProperties';

export const propertyService = {
  // Fetch all published properties (or all for admin view)
  async getProperties(includeDrafts = false): Promise<Property[]> {
    try {
      const colRef = collection(db, PROPERTIES_PATH);
      let q;
      if (includeDrafts) {
        q = query(colRef);
      } else {
        q = query(colRef, where('publicationStatus', '==', 'published'));
      }
      const snapshot = await getDocs(q);
      const items: Property[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...(docSnap.data() as Omit<Property, 'id'>) });
      });
      return items;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, PROPERTIES_PATH);
      return [];
    }
  },

  // Get single property by slug
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const colRef = collection(db, PROPERTIES_PATH);
      const q = query(colRef, where('slug', '==', slug), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...(docSnap.data() as Omit<Property, 'id'>) };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PROPERTIES_PATH}/by-slug/${slug}`);
      return null;
    }
  },

  // Get single property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const docRef = doc(db, PROPERTIES_PATH, id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) return null;
      return { id: snap.id, ...(snap.data() as Omit<Property, 'id'>) };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PROPERTIES_PATH}/${id}`);
      return null;
    }
  },

  // Create new property
  async createProperty(propertyData: Omit<Property, 'id'>): Promise<string> {
    try {
      const colRef = collection(db, PROPERTIES_PATH);
      const docRef = await addDoc(colRef, {
        ...propertyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PROPERTIES_PATH);
      throw error;
    }
  },

  // Update property
  async updateProperty(id: string, updates: Partial<Property>): Promise<void> {
    try {
      const docRef = doc(db, PROPERTIES_PATH, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${PROPERTIES_PATH}/${id}`);
      throw error;
    }
  },

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    try {
      const docRef = doc(db, PROPERTIES_PATH, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PROPERTIES_PATH}/${id}`);
      throw error;
    }
  },

  // Seed initial demo properties into Firestore
  async seedDemoProperties(): Promise<number> {
    try {
      let count = 0;
      for (const item of INITIAL_DEMO_PROPERTIES) {
        // check if slug exists
        const existing = await this.getPropertyBySlug(item.slug);
        if (!existing) {
          await this.createProperty(item);
          count++;
        }
      }
      return count;
    } catch (error) {
      console.warn('Seeding note:', error);
      return 0;
    }
  },

  // User Saved Properties
  async getSavedProperties(userUid: string): Promise<SavedProperty[]> {
    try {
      const colRef = collection(db, SAVED_PATH);
      const q = query(colRef, where('customerUid', '==', userUid));
      const snapshot = await getDocs(q);
      const saved: SavedProperty[] = [];
      snapshot.forEach((snap) => {
        saved.push({ id: snap.id, ...(snap.data() as Omit<SavedProperty, 'id'>) });
      });
      return saved;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, SAVED_PATH);
      return [];
    }
  },

  async saveProperty(userUid: string, property: Property): Promise<string> {
    try {
      const colRef = collection(db, SAVED_PATH);
      const docRef = await addDoc(colRef, {
        customerUid: userUid,
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
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, SAVED_PATH);
      throw error;
    }
  },

  async removeSavedProperty(savedDocId: string): Promise<void> {
    try {
      const docRef = doc(db, SAVED_PATH, savedDocId);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${SAVED_PATH}/${savedDocId}`);
      throw error;
    }
  },
};
