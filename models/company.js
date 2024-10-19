const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    employeeSize: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    isPhoneVerified: { type: Boolean, default: false },
    phoneVerificationCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
