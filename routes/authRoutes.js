const express = require('express');
const { registerCompany, loginCompany,logoutCompany, verifyEmail, verifyPhone } = require('../controllers/authController');

const router = express.Router();

// Register a new company
router.post('/register', registerCompany);

// Login a company
router.post('/login', loginCompany);

// Logout a company
router.post('/logout', logoutCompany);

// Verify email
router.post('/verify-email', verifyEmail);

// Verify phone
router.post('/verify-phone', verifyPhone);

module.exports = router;
