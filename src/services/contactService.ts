import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: Timestamp;
  id?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Submit a contact form message to Firestore
 * @param formData - The contact form data
 * @returns Promise that resolves with the document ID
 */
export const submitContactMessage = async (formData: ContactFormData): Promise<string> => {
  try {
    console.log('🚀 Starting Firestore submission...', { formData });
    
    // Test if Firestore is accessible
    console.log('🔗 Database instance available:', !!db);
    
    const messageData: Omit<ContactMessage, 'id'> = {
      ...formData,
      timestamp: Timestamp.now()
    };

    console.log('📝 Message data prepared:', messageData);
    console.log('🔗 Database instance:', db.app.name);
    
    // Try to add the document
    const docRef = await addDoc(collection(db, 'contactMessages'), messageData);
    console.log('✅ Successfully submitted to Firestore with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Detailed Firebase error:', error);
    
    // Enhanced error handling
    if (error instanceof Error) {
      console.log('Error name:', error.name);
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      
      // Check for specific Firebase error codes
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('permission-denied') || errorMessage.includes('permission denied')) {
        throw new Error('Permission denied: Check Firebase security rules');
      } else if (errorMessage.includes('unavailable')) {
        throw new Error('Firebase service unavailable: Network or server issue');
      } else if (errorMessage.includes('invalid-argument')) {
        throw new Error('Invalid data format: Check form data structure');
      } else if (errorMessage.includes('not-found')) {
        throw new Error('Collection not found: Check project configuration');
      } else if (errorMessage.includes('unauthenticated')) {
        throw new Error('Authentication error: Check API key configuration');
      } else if (errorMessage.includes('failed-precondition')) {
        throw new Error('Failed precondition: Check Firestore indexes');
      } else if (errorMessage.includes('quota-exceeded')) {
        throw new Error('Quota exceeded: Firebase usage limits reached');
      } else if (errorMessage.includes('cancelled')) {
        throw new Error('Request cancelled: Operation timeout or network issue');
      }
    }
    
    // Generic error with full details for debugging
    const errorDetails = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`Database submission failed: ${errorDetails}`);
  }
};

/**
 * Validate contact form data
 * @param formData - The form data to validate
 * @returns Object with validation results
 */
export const validateContactForm = (formData: ContactFormData) => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};