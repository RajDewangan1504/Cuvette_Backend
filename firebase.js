// firebase.js
const path = require('path');
const admin = require('firebase-admin');
require('dotenv').config(); // Make sure to load environment variables

const serviceAccount = require('./hello.json');

admin.initializeApp({
    
  credential: admin.credential.cert(serviceAccount),
});

