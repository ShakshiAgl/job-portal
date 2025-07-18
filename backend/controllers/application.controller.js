import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyJob = async(req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      });
    }

    // Checking if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for the job",
        success: false
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // Ensure applicant is not applying for their own job (if needed)
    if (job.company.toString() === userId) {
      return res.status(400).json({
        message: "You cannot apply for your own job",
        success: false
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },
      }
    });

    if (!application || application.length === 0) {
      return res.status(404).json({
        message: "No Applications found",
        success: false
      });
    }

    return res.status(200).json({
      application,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant'
      }
    });

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false
      });
    }

    return res.status(200).json({
      job,
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false
      });
    }

    // Find the application by application ID
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      });
    }

    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const checkIfApplied = async (req, res) => {
  const { userId, jobId } = req.query;

  if (!userId || !jobId) {
    return res.status(400).json({
      message: "Missing userId or jobId",
      success: false
    });
  }

  try {
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    return res.status(200).json({
      applied: !!existingApplication,
      success: true,
    });

  } catch (error) {
    console.error("Error checking application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const checkIfApplied = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const userId = req.id;

//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });

//     return res.status(200).json({
//       hasApplied: !!existingApplication,
//       success: true,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };
