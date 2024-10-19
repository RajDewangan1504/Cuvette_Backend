const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Create reusable email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

// Function to send job alert emails using HTML template
exports.sendJobAlertEmail = async ({ to, subject, templateData }) => {
  try {
    // Load the job alert email template from the file system
    const templatePath = path.join(__dirname, '../templates/jobAlert.ejs');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Render the HTML template with dynamic data using EJS
    const htmlContent = ejs.render(htmlTemplate, templateData);

    // Send the email with the rendered HTML content
    await transporter.sendMail({
      from: config.EMAIL_USER,
      to,
      subject,
      html: htmlContent, // Use the rendered HTML as the email body
    });

    console.log(`Job alert email sent to ${to}`);
  } catch (error) {
    console.error('Error sending job alert email:', error.message);
  }
};

// Function to send email verification OTP
exports.sendVerificationEmail = async ({ to, subject, templateData }) => {
  try {
    // Load the email verification template from the file system
    const templatePath = path.join(__dirname, '../templates/emailVerification.ejs');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Render the HTML template with dynamic data using EJS
    const htmlContent = ejs.render(htmlTemplate, templateData);

    // Send the email with the rendered HTML content
    await transporter.sendMail({
      from: config.EMAIL_USER,
      to,
      subject,
      html: htmlContent, // Use the rendered HTML as the email body
    });

    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error('Error sending verification email:', error.message);
  }
};
