// firebase.js
const admin = require('firebase-admin');
require('dotenv').config(); // Make sure to load environment variables

// Resolve the relative path to an absolute path
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

