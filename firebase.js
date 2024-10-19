// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./hello-95300-firebase-adminsdk-zmndk-8a24f08345.json'); // Adjust this path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://<your-project-id>.firebaseio.com' // Replace with your project URL
});

module.exports = admin;
