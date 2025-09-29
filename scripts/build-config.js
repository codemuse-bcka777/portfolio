import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Read environment variables from .env.local
const envPath = resolve('.env.local');
let envVars = {};

try {
  const envContent = readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim().replace(/"/g, '');
    }
  });
  console.log('✅ Loaded environment variables from .env.local');
} catch (error) {
  console.log('⚠️  .env.local not found, using process.env');
}

// Create a temporary config file with environment variables
const firebaseConfig = {
  apiKey: envVars.VITE_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: envVars.VITE_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.VITE_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envVars.VITE_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.VITE_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID
};

// Validate that all required config is present
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing Firebase configuration:', missingFields);
  process.exit(1);
}

// Create the config file content
const configContent = `// Auto-generated Firebase config - DO NOT EDIT MANUALLY
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = ${JSON.stringify(firebaseConfig, null, 2)};

console.log('✅ Firebase config loaded for project:', firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
`;

// Write the config file
writeFileSync(resolve('src/config/firebase.js'), configContent);
console.log('✅ Generated Firebase config file');