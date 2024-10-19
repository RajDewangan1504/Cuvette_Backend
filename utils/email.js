
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const config = require('../config');

// Function to send email using HTML template
exports.sendEmail = async ({ to, subject, templateData }) => {
    // Load the email template from the file system (using EJS)
    const templatePath = path.join(__dirname, '../templates/jobAlert.ejs');
    const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Render the HTML template with dynamic data using EJS
    const htmlContent = ejs.render(htmlTemplate, templateData);

    // Configure the email transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        }
    });

    // Send the email with the rendered HTML content
    await transporter.sendMail({
        from: config.EMAIL_USER,
        to,
        subject,
        html: htmlContent  // Use the rendered HTML as the email body
    });
};

