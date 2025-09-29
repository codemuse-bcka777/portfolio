# Firebase Setup Instructions

This guide will help you set up Firebase to store contact form messages from your portfolio.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "portfolio-contact-form")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) and select "Project settings"
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web app icon (`</>`)
4. Enter an app nickname (e.g., "Portfolio Website")
5. Click "Register app"
6. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDn5rDBWtkJ6HGaRH6LkteHKkoiyRBTMr8",
  authDomain: "portfolio-bisika.firebaseapp.com",
  projectId: "portfolio-bisika",
  storageBucket: "portfolio-bisika.firebasestorage.app",
  messagingSenderId: "600294997385",
  appId: "1:600294997385:web:feb079d7946ae17781b558",
  measurementId: "G-SGRF1ER0XR"
};

```

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder values with your actual Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-actual-app-id
```

## Step 5: Set Up Firestore Security Rules (Important!)

1. Go to "Firestore Database" > "Rules" in your Firebase console
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only creating new contact messages, no reading/updating/deleting
    match /contactMessages/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

3. Click "Publish" to save the rules

## Step 6: Test Your Setup

1. Run your development server: `npm run dev`
2. Navigate to the contact form
3. Fill out and submit a test message
4. Check your Firestore console to see if the message was stored

## Step 7: Production Deployment

When deploying to GitHub Pages, you'll need to add the environment variables to your deployment process. Since GitHub Pages is static hosting, the environment variables will be baked into the build.

### For GitHub Actions deployment:

Add your Firebase config as repository secrets:
1. Go to your GitHub repo > Settings > Secrets and variables > Actions
2. Add each environment variable as a secret:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### Update your GitHub Actions workflow to use these secrets during build.

## Viewing Stored Messages

To view the messages stored in your database:

1. Go to Firebase Console > Firestore Database
2. Click on the "contactMessages" collection
3. You'll see all submitted messages with timestamps

## Security Notes

- The current setup allows anyone to submit messages but prevents reading/updating/deleting
- Consider adding rate limiting for production use
- Firebase has generous free tier limits that should cover personal portfolio usage
- Monitor your usage in the Firebase console

## Troubleshooting

**Error: "Firebase not configured"**
- Make sure your `.env.local` file exists and has the correct values
- Restart your development server after adding environment variables

**Error: "Permission denied"**
- Check your Firestore security rules
- Make sure you're only trying to create documents, not read/update/delete

**Messages not appearing in database**
- Check the browser console for errors
- Verify your Firebase project ID matches your environment variables
- Ensure Firestore is enabled in your Firebase project