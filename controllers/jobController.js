const Job = require("../models/job");
const { sendEmail } = require("../utils/email");

// Post a job (Authenticated company)
exports.postJob = async (req, res) => {
  const { title, description, experienceLevel, candidates, endDate } = req.body;
  const companyId = req.company.id; // Extracted from JWT (Authenticated company)

  try {
    // Validate required fields
    if (!title || !description || !experienceLevel || !candidates || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save job to the database
    const job = await Job.create({
      title,
      description,
      experienceLevel,
      candidates, // Array of candidate emails
      endDate,
      companyId,
    });
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error("Error posting job:", error.message);
    // Differentiating between different types of errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation Error", details: error.errors });
    }
    res.status(500).json({ error: "Internal server error while posting job" });
  }
};

// Send job alerts to candidates via email (Authenticated company)
exports.sendJobAlert = async (req, res) => {
  const { jobId } = req.body; // Job ID passed in the request body

  try {
    // Check for missing jobId in the request body
    if (!jobId) return res.status(400).json({ error: "Job ID is required" });

    // Find the job and the associated company
    const job = await Job.findById(jobId).populate('companyId', 'name email');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    // Prepare the dynamic data for the email template
    const templateData = {
      title: job.title,
      description: job.description,
      experienceLevel: job.experienceLevel,
      companyName: job.companyId.name,
      endDate: job.endDate.toDateString(), // Format the date
    };

    // Send job alert to each candidate via email
    for (const candidate of job.candidates) {
      await sendEmail({
        to: candidate, // Email recipient
        subject: `Job Alert: ${job.title}`, // Email subject
        templateData, // Dynamic data for the email template
      });
    }

    res.status(200).json({ message: 'Job alerts sent successfully to candidates' });
  } catch (error) {
    console.error("Error sending job alert:", error.message);
    res.status(500).json({ error: 'Internal server error while sending job alert' });
  }
};

// Get all job posts (Public route)
exports.getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database and populate company info
    const jobs = await Job.find().populate('companyId', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: 'Internal server error while fetching jobs' });
  }
};

// Get a specific job post by ID (Public route)
exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) return res.status(400).json({ error: "Job ID is required" });

    const job = await Job.findById(jobId).populate('companyId', 'name email');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error.message);
    res.status(500).json({ error: 'Internal server error while fetching job' });
  }
};
