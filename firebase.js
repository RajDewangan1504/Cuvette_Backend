// firebase.js
const path = require('path');
const admin = require('firebase-admin');
require('dotenv').config(); // Make sure to load environment variables

// Resolve the relative path to an absolute path
const serviceAccountPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

