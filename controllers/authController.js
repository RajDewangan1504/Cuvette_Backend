const Company = require("../models/company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config");
const { sendEmail } = require("../utils/email");
const { sendSms } = require("../utils/sms");

// Register a new company
exports.registerCompany = async (req, res) => {
  const { name, email, mobile, password,companyName, employeeSize } = req.body;

  try {
    // Check if the email or mobile already exists
    const existingCompany = await Company.findOne({ $or: [{ email }, { mobile }] });
    if (existingCompany) {
      return res.status(400).json({ error: "Email or mobile already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token for email and code for phone
    const emailVerificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    const phoneVerificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code

    const company = await Company.create({
      name,
      companyName,
      employeeSize,
      email,
      mobile,
      password: hashedPassword,
      emailVerificationToken,
      phoneVerificationCode,
    });

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify your email",
      text: `Your OTP for email verification ${emailVerificationCode}`,
    });

    // Send SMS with verification code
    // await sendSms(mobile, `Your phone verification code is: ${phoneVerificationCode}`);

    res.status(201).json({
      message: "Company registered. Please verify your email and phone.",
    });
  } catch (error) {
    console.error("Error registering company:", error.message);
    res.status(500).json({ error: "Internal server error during registration" });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const company = await Company.findOne({ email, emailVerificationCode: code });
    if (!company) {
      return res.status(400).json({ message: "Invalid verification code or phone number" });
    }

    company.isEmailVerified = true;
    company.emailVerificationCode = null;
    await company.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ error: "Internal server error during email verification" });
  }
};



// Verify phone
exports.verifyPhone = async (req, res) => {
  const { mobile, code } = req.body;

  try {
    const company = await Company.findOne({ mobile, phoneVerificationCode: code });
    if (!company) {
      return res.status(400).json({ message: "Invalid verification code or phone number" });
    }

    company.isPhoneVerified = true;
    company.phoneVerificationCode = null;
    await company.save();

    res.status(200).json({ message: "Phone verified successfully" });
  } catch (error) {
    console.error("Error verifying phone:", error.message);
    res.status(500).json({ error: "Internal server error during phone verification" });
  }
};

// Login a company
exports.loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the company exists
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: "Company not found" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the email and phone are verified
    if (!company.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }
    if (!company.isPhoneVerified) {
      return res.status(403).json({ message: "Please verify your phone first" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: company._id }, config.JWT_SECRET, { expiresIn: "1h" });

    // Set token in a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevent JavaScript access
      sameSite: "Strict", // Prevent CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "Internal server error during login" });
  }
};

// Logout a company
exports.logoutCompany = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
