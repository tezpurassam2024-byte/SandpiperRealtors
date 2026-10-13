import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/config';
import { Enquiry, Appointment, EnquiryStatus, AppointmentStatus } from '../types';

const ENQUIRIES_PATH = 'enquiries';
const APPOINTMENTS_PATH = 'appointments';

function generateReference(prefix: string) {
  const random = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${random}`;
}

export const enquiryService = {
  // Submit new enquiry (works for guests and authenticated customers)
  async submitEnquiry(data: {
    propertyId?: string;
    propertyTitleSnapshot?: string;
    customerUid?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    enquiryType: Enquiry['enquiryType'];
    message: string;
    source?: string;
  }): Promise<string> {
    try {
      const colRef = collection(db, ENQUIRIES_PATH);
      const referenceNumber = generateReference('ENQ');
      const docRef = await addDoc(colRef, {
        ...data,
        referenceNumber,
        source: data.source || 'Website Form',
        status: 'New' as EnquiryStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, ENQUIRIES_PATH);
      throw error;
    }
  },

  // Get enquiries (all for admin, or filtered by customerUid)
  async getEnquiries(customerUid?: string): Promise<Enquiry[]> {
    try {
      const colRef = collection(db, ENQUIRIES_PATH);
      let q;
      if (customerUid) {
        q = query(colRef, where('customerUid', '==', customerUid));
      } else {
        q = query(colRef);
      }
      const snapshot = await getDocs(q);
      const list: Enquiry[] = [];
      snapshot.forEach((snap) => {
        list.push({ id: snap.id, ...(snap.data() as Omit<Enquiry, 'id'>) });
      });
      // Sort in-memory by newest to avoid needing complex composite index if not yet built
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, ENQUIRIES_PATH);
      return [];
    }
  },

  // Update enquiry status & notes
  async updateEnquiry(
    id: string,
    updates: { status?: EnquiryStatus; internalNotes?: string; assignedAgentId?: string }
  ): Promise<void> {
    try {
      const docRef = doc(db, ENQUIRIES_PATH, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${ENQUIRIES_PATH}/${id}`);
      throw error;
    }
  },

  // Appointments (Site Visits)
  async requestAppointment(data: {
    propertyId: string;
    propertyTitleSnapshot: string;
    customerUid?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    requestedDate: string;
    requestedTime: string;
    notes?: string;
  }): Promise<string> {
    try {
      const colRef = collection(db, APPOINTMENTS_PATH);
      const docRef = await addDoc(colRef, {
        ...data,
        status: 'pending' as AppointmentStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, APPOINTMENTS_PATH);
      throw error;
    }
  },

  async getAppointments(customerUid?: string): Promise<Appointment[]> {
    try {
      const colRef = collection(db, APPOINTMENTS_PATH);
      let q;
      if (customerUid) {
        q = query(colRef, where('customerUid', '==', customerUid));
      } else {
        q = query(colRef);
      }
      const snapshot = await getDocs(q);
      const list: Appointment[] = [];
      snapshot.forEach((snap) => {
        list.push({ id: snap.id, ...(snap.data() as Omit<Appointment, 'id'>) });
      });
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, APPOINTMENTS_PATH);
      return [];
    }
  },

  async updateAppointment(
    id: string,
    updates: { status?: AppointmentStatus; requestedDate?: string; requestedTime?: string; notes?: string }
  ): Promise<void> {
    try {
      const docRef = doc(db, APPOINTMENTS_PATH, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${APPOINTMENTS_PATH}/${id}`);
      throw error;
    }
  },
};
