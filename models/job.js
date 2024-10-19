const mongoose = require('mongoose');

// Schema for Job Posting
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    endDate: { type: Date, required: true },
    candidates: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
